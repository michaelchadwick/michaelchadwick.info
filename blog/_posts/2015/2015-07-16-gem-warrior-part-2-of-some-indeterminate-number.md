---
layout: post
title:  "Gem Warrior: Part 2 (of Some Indeterminate Number)"
tags: game gaming ruby text-adventure gemwarrior rubygems
excerpt: "Much progress has been made on Gem Warrior since last I posted, and I've learned a bunch about Ruby and how to properly structure a game."
published: true
---

Much progress has been made on [Gem Warrior](https://github.com/michaelchadwick/gemwarrior) since last I posted, and I've learned a bunch about Ruby and how to properly structure a game. I've also come to a fairly good stopping point where people can start to actually beta test the game and I can get much needed feedback outside of the echo chamber of my own head.

<!--more-->

### The Overview

Here's a bird's-eye view of the major changes over the last month or so, straight out of my git log:

* [Game Logo](https://github.com/michaelchadwick/gemwarrior/commit/2892a25f7e8cd6b9516b66ab137ddf98c78ecd94)
  * It may not change gameplay, but every game needs a neat logo, right?
* [End Boss](https://github.com/michaelchadwick/gemwarrior/commit/9bdb50ed9de98a31b4ea1389ec1ac927592b4f50)
  * This update was huge! It meant Gem Warrior had become a real game with an objective and a *win state*.
* [Special Abilities](https://github.com/michaelchadwick/gemwarrior/commit/fb356ca37ff9bfda4b2ed84554f9b95d4d3424e1)
  * Not as huge as the last one, but still a nice addition: special abilities. RPGs usually have levels you gain through experience, but they also need abilities you learn besides just stat increases. "Rocking vision" was my first stab at it.
* [Wordnik API for Randomness](https://github.com/michaelchadwick/gemwarrior/commit/16a58e414f177df716f2724e8e9b76834d06e396)
  * There is a lot of text in this text adventure, and it'd be great if there was some variety here and there that I didn't need to write. Enter [Wordnik](https://developer.wordnik.com/). It's optional, because it takes up network bandwidth and can slow the game down a bit, but I want to expand it eventually.
* [YAML](https://github.com/michaelchadwick/gemwarrior/commit/a2c41624fcf4f599235f24a111a94e7c046fe6cb)
  * Another major structural change to the game was moving all of the data for locations from code to data files. I saw it done in another Ruby text adventure online, and it seemed to make sense to separate the two things.
* [Z Axis](https://github.com/michaelchadwick/gemwarrior/commit/8e210c24dd2249bcf88cd9395460d1923c431ff6)
  * The map now has more than one level!
* [Arena](https://github.com/michaelchadwick/gemwarrior/commit/ae526e8112acf34a956a598dbfd18df5c3b995ad)
  * Need to beat up a bunch of monsters for money and experience? You can now.
* [Sound](https://github.com/michaelchadwick/gemwarrior/commit/9c93ad69711fd0e201726e189a7bc4cecb64785a)
  * Using my other RubyGem [feep](https://rubygems.org/gem/feep), I added some basic sound in the game. I'm not sure I'll keep using it, because the threading of it into the game causes pauses, but it's nice to have for fun.
* [Player Name Generation](https://github.com/michaelchadwick/gemwarrior/commit/100116e61e5878bfad1f4d10cbb30eedb2c8eed6)
  * I spent a fair amount of time porting a public domain JavaScript implementation of a name-generating Markov Chain algorithm to Ruby so I could use it to make random names.
* [Stats](https://github.com/michaelchadwick/gemwarrior/commit/4dfaf443e4c3d4b1f309de4428c0ef35769b2e50)
  * How long did you play the game? More statistics on various aspects of your play session were [added soon after](https://github.com/michaelchadwick/gemwarrior/commit/775bdc38e2f968e07c5e299cca52615a596a7723).
* [Merchant](https://github.com/michaelchadwick/gemwarrior/commit/0bd38440a2ad36513200c9a97c0eb736a20e8d92)
  * Rats in holes can sell items, right?
* [Puzzle](https://github.com/michaelchadwick/gemwarrior/commit/9ccbd5fa3af208be010eae522887f8853113fccc)
  * Adventure games have gotta have at least one puzzle, right?
* [Main Menu](https://github.com/michaelchadwick/gemwarrior/commit/40fa766680f41e126383703c579358330b5eee9a)
  * Proper games have main menus, so I had to add one.
* [Intro Letter](https://github.com/michaelchadwick/gemwarrior/commit/09963a17fead956d96118583b6071de616956f49)
  * A bit of world-building to get you going.

All of this has been equal parts exciting and frustrating to figure out, but that's programming for you. Unfortunately, I learned recently that installing the gem and running it on a system has a loading bug, so you can't play it unless you download the source and run it directly. As soon as I can figure *that* out, I can open this up to others in a more official capacity. Early attempts at making portable binaries for Mac/Win/Linux, so you don't even have to have Ruby or RubyGems installed, have proved unsuccessful, but it may have something to do with the gem installation bug.

Overall, I'm pleased with how much I've been able to figure out. I can't wait for others to try it out!
