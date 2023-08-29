---
layout: post
title: "AWStats Hacking, or How I Inserted HTML into a 20K+ LOC Perl Script"
tags: awstats hacking html open-source perl self-hosting
published: true
---

Besides some half-hearted Google Analytics embeds on a couple of my sites set up years ago, I've never really kept track of who (or what) visits my websites.

THAT ENDS NOW!

Ahem.

<!--more-->

Since I've been a on self-hosted kick, slowly replacing external services with internal services that I set up and administer, I decided I would finally get some kind of analytics going on my web places.

There are many options for this kind of thing nowadays, but I remembered an old friend from my past work experiences, and figured I could look them up again to see how they're doing.

Enter [AWStats](http://www.awstats.org).

AWStats, which stands for <strong>A</strong>dvanced <strong>W</strong>eb <strong>Stat</strong>istic<strong>S</strong>, is pretty simple: you give it a configuration file that points to a server log file, it parses a [HUMONGOUS Perl script](https://github.com/eldy/AWStats/blob/develop/wwwroot/cgi-bin/awstats.pl) (this software was first released over 20 years ago, but hasn't changed much in its basic structure), and spits out a web page (using `<frameset>`!) that gives you a bunch of stats about your website and its visitors. It's not exactly pretty, and it isn't what you'd expect in a modern web application, but it works, more or less.

Of course, as a web developer, it's near-impossible for me to not want to tweak it. Just a little bit.

After looking at the AWStats interface for about 5 seconds, I realized I wanted two (2) things:

1. A `<select>` to choose from my multiple domains, as an easy switch, instead of having multiple bookmarks or manually changing the part after `config=` in the URL
2. A favicon.

Now, most web applications these days have templates you can customize, as they've been built with this kind of hackery in mind. AWStats, though? NOPE.

## FRAME TIME

First things first, how is the web page that the GINORMOUS Perl script spits out structured? It still uses that darling of the early 2000s, `<frameset>`. There's one of them, with two `<frame>` elements inside (I'm using pseudocode below, so it's not 100% accurate, but you get the idea):

```html
<html lang="en">
<head>
  ...
</head>
<frameset cols="240, *">
  <frame name="left" src="nav">
  <frame name="right" src="stats">
</frameset>
</html>
```

It's easy to see that this is how the _rendered_ website looks, but how is the HTML created? Buried inside somewhere, an intrepid coder finds the following:

```perl
...
print "<frameset cols=\"$FRAMEWIDTH,*\">\n";
print "<frame name=\"mainleft\" src=\""
  . XMLEncode("$AWScript${NewLinkParams}framename=mainleft")
  . "\" frameborder=\"0\" />\n";
print "<frame name=\"mainright\" src=\""
  . XMLEncode("$AWScript${NewLinkParams}framename=mainright")
  . "\" scrolling=\"yes\" frameborder=\"0\" />\n";
print "<noframes><body>";
...
print "</body></noframes>\n";
print "</frameset>\n";
print "</frameset>\n";
...
```

It took me some time on MDN to remember how to use HTML frames again, as I hadn't used them in decades, but I finally came up with this little hack:

```perl
...
# mikehack start
print "<frameset rows=\"50,*\">\n";
print "<frame name=\"domainselector\" src=\""
  . XMLEncode("./domainselector.html?framename=maintop")
  . "\" frameborder=\"0\" />\n";
# mikehack end
print "<frameset cols=\"$FRAMEWIDTH,*\">\n";
print "<frame name=\"mainleft\" src=\""
  . XMLEncode("$AWScript${NewLinkParams}framename=mainleft")
  . "\" frameborder=\"0\" />\n";
print "<frame name=\"mainright\" src=\""
  . XMLEncode("$AWScript${NewLinkParams}framename=mainright")
  . "\" scrolling=\"yes\" frameborder=\"0\" />\n";
print "<noframes><body>";
...
print "</body></noframes>\n";
print "</frameset>\n";
print "</frameset>\n";
...

```

This essentially puts the whole page into another `<frameset>` so I can insert a new `<frame>` that pulls in another HTML file with a domain selector chunk:

```html
<form id="domain-selector">
  <select id="domain">
    <option value="">- Choose Domain -</option>
    <option value="michaelchadwick.info">michaelchadwick.info</option>
    <!-- add other <option>s here for more domains -->
  </select>
  <button type="button" onclick="changeDomain()">Change Domain</button>
</form>

<script type="text/javascript">
  function changeDomain(e) {
    const dropdown = document.querySelector('#domain-selector select')
    const domain = dropdown.value

    if (domain != '') {
      // top.location to reload whole frameset
      // self.location and document.location did not work
      top.location.href = `/cgi-bin/awstats.pl?config=${domain}`
    }
  }

  window.onload = function loadDomainSelector() {
    const searchParams = new URLSearchParams(new URL(top.location.href).search)

    const dropdown = document.getElementById('domain')
    const domain = searchParams.get('config')

    dropdown.value = domain
  }
</script>
```

This bit of HTML and JS makes a `<select>` with all my domains, and when the button is clicked the site reloads with the new config value, giving me sweet, luscious statistics.

## FAVICON

Inserting a favicon into AWStats was a lot easier, but still necesitated trawling through the code until I found where the `</head>` tag was inserted. I put a simple `<link rel="icon" href="/path/to/favicon.ico">` right before it, and now I have a custom image on the pinned tab for AWStats for easy scanning amongst other pinned tabs that are not AWStats.

## FOR THE ROAD

The takeaway from all this is thus: AWStats is ancient by Internet standards, and not at all how I, or probably most people, would write an app like this anymore. That being said, it's kind of impressive how much this software has not changed, and yet is still useful. Clean, beautiful code is certainly an aim when developing, but in the end, the end user either concludes it works or not, so even something like a 20K line script can still do the trick.
