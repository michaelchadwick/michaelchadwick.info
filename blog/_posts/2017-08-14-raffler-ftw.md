---

layout: post
title:  "Raffler FTW"
tags: js javascript standard node nodejs framework systemjs raffler uccsc ucsd gulp task-runners
headerImage: posts/screenshot_raffler.png
excerpt: "Since my last post, I've worked on Raffler quite a bit (it got its own domain, for one), making it **warmer**, _juicier_, and with a nice glaze around the edges. In sum, it's approximately 476% better."

---

Since my [last post](/blog/2017/04/20/fun-with-javascript-frameworks/), I've worked on [Raffler](https://raffler.codana.me) quite a bit (it got its own domain, for one), making it **warmer**, _juicier_, and with a nice <span style='color: #8b8458; font-weight: 700;'>glaze</span> around the edges. In sum, it's approximately <span id='random-percent'>476</span>% better.

It's now ready to unveil publicly, after a beta test at [UCCSC](https://uccsc.ucsd.edu), a rad tech conference recently held at [UC San Diego](https://ucsd.edu), so let's dig into it and discuss some things that changed since last we raffled items in a random fashion.

<!--more-->

### Overall Architecture

Raffler is largely built with HTML, CSS, and JQuery, meaning it does not use a framework or architecture of any sort beyond building a `Raffler` object with properties and methods. However, to avoid one long `app.js` spaghetti code mess, I employed [SystemJS](https://github.com/systemjs/systemjs) to properly load all of my JS files.

Raffler uses three kinds of data storage: JSON, in-memory Array, and Local Storage:

* Raffle items are initialized using a flat `JSON` file
* Those items are then put into a Javascript array, i.e. `itemsArr`
* When items are chosen, they get **removed** from `itemsArr` and sent to Local Storage, which allows Raffler to remember what was chosen, even if the browser is refreshed or closed
  * _Optional_: this in-memory `itemsArr` also possibly gets synced with another data source: user items. If any have been created, they are _added_ to `itemsArr`

### Javascript Standard Style

One _really_ new thing I started doing this time was to write my Javascript code to some kind of standard...namely [Standard Style](https://standardjs.com/). I stumbled upon this while installing some Atom linter module, and it lead me to a blog post called [Never Use Semicolons](https://feross.org/never-use-semicolons/) (and one of its [detractors](https://hackernoon.com/an-open-letter-to-javascript-leaders-regarding-no-semicolons-82cec422d67d)).

Initially aghast, I've come around to this idea, at least _for now_. This is remarkable, since I'm coming from a PHP/C# background, where ending coding statements with a semicolon is practically unconscious. However, I've also done plenty of Ruby where semicolons are not needed, so I was open to this new way of thinking. Hey, if NPM does it, I figure it's good enough for me.

### Modularity

Raffler was born for a specific purpose: to pick random winners of a raffle at a tech conference. However, ever since I started putting most, if not all, of my code onto [Github](https://github.com/michaelchadwick) I've tried to make sure my projects are as modular as possible.

This means making the core project as generic as possible so as to work for the largest number of applications. Anything that customizes it, such as a specific logo or set of data, should be optional and not loaded by default, requiring a user to supply it.

Raffler does this by showing no logo beyond its own, and using characters from the movie Willow as its test raffle items. You have to turn on a flag in the code to load an optional `{{ site.baseurl }}/assets/json/raffler_user_options.json` file that changes the initial data, and adds a custom logo (and link to somewhere).

### Gulp

Once I started playing around with Angular for another project, I started becoming more familiar with task-runners, little apps that automate all the boring, yet often necessary, parts of running a modern web application. [Gulp](https://gulpjs.com) is one of the more popular flavors-of-the-now, so it seemed worth it to experiment.

Raffler's application JS isn't very big (~48k), but if anything can be done to make it more compact and take up less space, it's worth it. So, I wrote a `gulp.js` file that both lints (checks code for errors and stylistic infractions) and minifies (concatenates all files into one massive one and then changes variable names to as few characters as possible, as well as removes any unnecessary spacing and comments) my Javascript. It can even set up a process to watch for changes and redo its stuff so it's always running the latest version.

### For the Road

Once a web application gets sufficiently large, you might start wishing you had made it using a framework. My web app ideas always seem to start small, and often stay there, so it's not a big deal. Other times, they balloon rapidly, like Raffler, as I get ideas or suggestions, and I start adding on things to make the whole process easier that probably should've been there from the start.

For that reason alone, I think I may start using something like Angular or React more seriously. However, my current webhost doesn't support such things because they require their own server architecture (i.e. NodeJS) to run, and since it's a shared host, that is not allowed. I _could_ use Heroku, but it has its own limitations. I could also use a non-shared hosting platform, but that would require moving a bunch of existing stuff.

Thus, I'll most likely keep doing what I've been doing, since it works, and only change once I'm forced to by some other directive. Weeee!

<script async type="text/javascript" src="{{ site.baseurl }}/assets/js/rand_perc.js"></script>
