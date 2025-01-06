---
layout: post
title:  "Gem Warrior: Part 1 (of Who Knows)"
tags: game gaming ruby text-adventure gemwarrior rubygems
excerpt: "I've embarked on a game development project called **Gem Warrior**, a roguelite text adventure, (eventually) replete with a juicy command list, glorious monsters, and a hyperkeen randomized world that challenges you to discover its seemingly boundless majesties, and defeat an Evil Guy to Win the Day!"
published: true
---

A game where you're typing words on a command line is not exactly "modern gaming", but it has a certain charm that tugs at a (hopefully) shared computing nostalgia. Also, it's a lot easier to program something where the output is text, rather than graphics.

Thus, I've embarked on a game development project called **Gem Warrior**, a roguelite text adventure, (eventually) replete with a juicy command list, glorious monsters, and a hyperkeen randomized world that challenges you to discover its seemingly boundless majesties, and defeat an Evil Guy to Win the Day!

<!--more-->

### The Genesis

Since the first code I ever wrote, making a game seemed like a fun idea. I like playing them, so why not try making one? Well, games can be tougher than web pages or system scripts. They take a good deal of planning and ambition, and making one that's actually fun and not just a novelty is even harder. Until now, I guess I just never had a good idea or the wherewithal to make one. The time to make a game has come.

I'm writing this in Ruby as a RubyGem, mainly because I've used it a bunch lately, so the name **Gem Warrior** was kind of predestined. It also gives me a framework for naming of entities in the game, and makes it stand out just slightly above the countless other text adventures I'm sure exist out there.

Choosing to do a text adventure was the result of both wanting to make something doable, yet non-trivial and my love for the lineage of such games. They can easily be played on any system that can render text and are speedy and don't need beefy systems. Not having to make graphics is nice, as I'm not a visual artist, and learning how a custom system prompt is built seemed like a goal that was worthy and attainable.

### The Progress

As of this blog post, I have a working application, but not a game. What that means is that there is an engine of sorts, a simple, non-random world that is interactable, some monsters you can fight, and the ability to enter and exit this world. There is no "win" state, but there is a "lose" state (monster beating you in combat).

Essentially, you begin the game, randomized name in hand, empty inventory, zero experience, but healthy and ready for action. The system prompt lists some character attributes and your current location. You can travel to new "rooms", look around, pick up and equip certain objects, and enter combat with monsters if they exist in a room. If you are victorious, you win *rox* (money) and *xp* (xp). That does nothing for your character in terms of status yet, but it will. Certain items that are equippable raise your attack stat, and your dexterity is pitted against other monsters' dexterity to determine initiative in a fight.

### The Future

Plans for the future of this game are many, but the big ones are as follows:

* Randomized world that is still interesting (this is a biggie)
* Character leveling
* Balancing monster stats (too many of them are too difficult to beat right now)
* Win state (killing big bad boss, etc.)
* More locations, items, weapons

I'm having a lot of fun working out the basics of how a game like this works, using as much help as I can get from similar projects on the web, and my programming friends. You can structure something like this any way you can, but I'm trying to get better at my coding style and follow best practices as much as possible.

In *Gem Warrior: Part 2 (of Who Knows)*, I will talk about the way I've structured the game, show some actual code, and hopefully expound on how I have now made a working, super-cool method of creating randomized worlds so each game is fresh.
