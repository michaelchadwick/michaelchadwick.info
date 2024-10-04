---
layout: post
title: "Omni Sees All My Webs"
date: 2024-04-20 10:17:00
tags: omni nebapps
headerImage: posts/2024/omni-sees-all-my-webs.jpg
headerImageCaption: 'omni sees all my webs - NightCafe (model: Dreamshaper XL Lightning, preset: NightCafe)'
image: posts/2024/omni-sees-all-my-webs.jpg
published: true
---

I make web apps. Those web apps can be displayed as their individual URLs in a series of browser tabs. That **same** browser can _also_ display **ALL OF THEM** in **_ONE_** web site.

While it's been up for a while, I've never blogged about **Omni**, so here we go.

<!--more-->

## ORIGIN STORY

When you start as a web developer, you're happy to just get **one** project done. The heady euphoria of hitting save that one last time and then typing something like `rake deploy`, browser at the ready to view `https://`-something. Whoa! There is a thing on the Internet, and you made it!

Back in the 90s, I did something like that. Although it was more like:

1. Connect modem to dial-up ISP
2. Listen to modem sounds
3. Open up [WS_FTP](https://en.wikipedia.org/wiki/WS_FTP)
4. Connect to web server via FTP (no SFTP! (heck, maybe it was anonymous?!?))
5. Drag files from client to server
6. Refresh browser to see web site at `http://`-something!

Regardless of how it happens, I still really enjoy making something, updating a remote server, and seeing the result.

However, over the last nearly 30 years of doing that kind of thing, you might smart to amass a _few_ web projects, and want a way to be able to see them all at the same place.

Enter: [Omni](https://omni.neb.host).

## TECH STACK

Omni's tech stack is not impressive by modern web standards. First commit is from 2015, so cut me some slack, please. The web moves fast, and 8 years ago is essentially multiple lifetimes in tech.

That being said, Omni follows a pretty standard NebApp SPA structure: `index.html` for the single page you visit, an `assets/` directory for all the `css/`, `js/`, and other things the site needs.

The main feature of this web app is to dynamically create a bunch of `<iframe>`s that load other websites. This is done via one file, `main.js`, that reads `assets/json/sites.json` and constructs blocks of html with an `<iframe>` in the middle of it.

At one point, I attempted to use an external service called [Screeenly](https://github.com/stefanzweifel/screeenly) to take screenshots of all the web projects, mainly to lower the network bandwidth of loading a bunch of sites all at once. This meant I had a `composer.json` to pull in two PHP dependencies: `dotenv` (for the API key) and `guzzlehttp` (for the HTTP, uh, guzzling).

Recently, however, I've tried to lower the number of dependencies my web projects use, and using `<iframe>`s also had a secondary mechanism: checking if my sites are actually up!

The downside of doing a web app like this is that all the web projects that are loaded ALSO load all their dependencies and `XHR` requests, so the dev console gets positively **jammed** with messages. Loading a site from its home domain is one thing, but shoving it into an `<iframe>` is its own beast entirely. `CORS` rears its ugly head, and you have to deal with it, man.

## RECENT UPDATES

Because Omni was started in 2015, and the state of the web was quite different, it still uses `jQuery`. There's nothing inherently wrong with that, but Javascript has improved a lot in the intervening years, and so it's not really needed like it once was. I'm in the process of removing it, but that's really just for dependency minimizing, as it still works just fine.

Over the years I've added more sites as I've created them, so the list keeps getting longer. Some sites that once _were_ are, uh, _not_ now, so I created an "Archived" section at the bottom; relocated, but not forgotten.

In order to facilitate [lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) for all the `<iframe>`s that a site like this entails, I used a library called [recliner](https://github.com/sourcey/recliner) for a long time. ModernWeb<super>TM</super> now allows for the attribute `loading="lazy"` on tags, so I've removed it and started using that instead.

## FOR THE ROAD

The [source for Omni](https://github.com/michaelchadwick/omni-all-my-webs) is available to all. Use it to showcase your own gallery of web projects!
