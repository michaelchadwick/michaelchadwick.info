---
layout: post
title: 'Raffler is Live...Again'
date: 2023-04-18 09:51:00
tags: choice css jquery list nebapp raffle raffler random renovation sass tool web web-app web-storage-api
headerImage: posts/2023/raffler-2023-04-18.png
published: true
---

Way back in <a href="/blog/2017/08/14/raffler-ftw">2017</a>, I created a web app called <a href="https://raffler.neb.host">Raffler</a> that let you take a bunch of choices, put them in a digital hat, and pick one out at random. It was one of my first projects to really experiment with things like the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">Web Storage API</a>, <a href="https://sass-lang.com">SASS</a>, <a href="https://createjs.com">CreateJS</a>, <a href="https://gulpjs.com">GulpJS</a>, and actually having my code be used in a <a href="https://uccsc.ucsd.edu">public forum</a>.

Since then, both JS and CSS have improved significantly, and I've found myself wishing to use fewer dependencies, if possible. Thus, a renovation was in order.

<!--more-->

There are a slew of apps I've dubbed NebApps, because they're made by me, Nebyoolae, and they are apps. It started with <a href="https://bogdle.neb.host">Bogdle</a>, which was heavily influenced by <a href="https://nytimes.com/games/wordle.html">Wordle</a>, both in UI/UX and in underlying structure, and its vibe has spread throughout a bunch of webapps I think are cool and potentially useful to the public at large.

All NebApps tend to share a common framework of HTML, CSS, and JS (so much so that I thought about actually making a custom framework with it all), and Raffler, while _working_ just fine, more or less, needed to get overhauled just like the other NebApps to be consistent.

## THE ACTUAL NITTY GRITTY

To renovate Raffler, I had to take what I already had going in the other NebApps and transform its existing structure to that. This lead me to removing SASS entirely, which meant compiling it to CSS, removing the source SASS files, and just updating the CSS files from here on out. This change meant I didn't need GulpJS anymore, so it could go, too. I also removed jQuery and switched all jQuery functions to VanillaJS functions. Once I had all the JS files in the typical NebApp pattern, I didn't need CreateJS anymore.

As far as UI changes, I added a placeholder "Click to begin raffle!" link in the main raffling section after some user feedback about not knowing how to get the whole thing going. I centered the header and added the usual icons that toggle modals, except unlike other NebApps, the settings icon (gear) slides open a settings _panel_, since there are many things to observe and change, and they're very useful to be accessible while Raffler is running.

Raffler has the ability to use a server-side JSON config file for the actual data being raffled and some of its options. I added a query string flag to allow for an alternate user config file with its own potential JSON config file, but there is also a settings panel feature that allows for a user to put in items on-the-fly (helpful if you don't control the server that Raffler is running on) and sync them to the existing pool of choices. All of this configuration can be done in various ways, and I struggled a bit to get it all working again in a way that I was happy about.

Final touches were mainly updating the Debug Settings section of the settings panel for maximum flexibility whilst running the darn thing, and making sure the README actually reflected all these changes I made.

## FOR THE ROAD

After all that, I think Raffler is even better than before, and could be used by anyone to run their own raffle. Check out the source <a href="https://github.com/michaelchadwick/raffler">here</a>, and put it on your own server to make it your own!
