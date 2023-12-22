---

layout: post
title:  "Some Fun New Web Projects to Kick Off 2015"
tags: webdev html html5 javascript jquery localstorage json

---

2015 is apparently the year that I get inspired to work on web projects again, and rediscover the joys of the change-refresh cycle, JavaScript/jQuery, and HTML5. I just finished (is that really possible, though?) a couple new web apps and I'd like to drop some knowledge about them.

<!--more-->

## Sketchage

A friend is starting to get into development, and she posted about a [web application](https://mixophrygian.github.io) that's like a simplified etch-a-sketch tool. For some reason, reading through the code inspired me to fork it and go a little crazy updating it and adding features.

In the end, it became a more powerful app, with a color picker, two drawing modes, better resizing tools, and the ability to save your work as a BMP. I renamed it [Sketchage](https://codname.neb.host/sketchage) and you can have at [the code](https://github.com/michaelchadwick/Etcha-sketch), if desired.

## Just Pick One

My coworker and I go out to lunch together a lot, and I never know where to go. I've mentioned that it would be a lot easier if we just had a list of places we went all the time, and a big button to choose one at random.

Well, I [finally did it](http://jpo.codana.me).

The foundation of "picks", as I call them, is a JSON file that gets loaded into an array and picked from when you hit the big button. Since I never played around with HTML5 Local Storage before, I decided to try giving the user the ability to add their own picks (since I couldn't be sure I got all the lunch places, and we'd add more later), but still stick around even if you close the window/tab/browser (Session Storage would be good if you just wanted it while the site was open). A good explanation can be found [here](https://blog.safaribooksonline.com/2013/10/10/how-to-use-html5-local-storage/). It was pretty easy to implement once I got used to the JSON parsing, and now it's pretty functional.

I spent a lot of time making sure it looked good on mobile (many thanks to [Initializr](https://initializr.com)), and even created a custom `favicon.png` and `startup.png` image so that Apple devices could save a link to the site on the home screen, essentially "appifying" it in a crude manner.

We'll see how often it gets used, as my coworker often just goes with their gut, but at least it was a fun exercise. [Grab the code](https://github.com/michaelchadwick/just-pick-one) and use it for any multiple choice quandary!
