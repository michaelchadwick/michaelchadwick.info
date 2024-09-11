---
layout: post
title: 'Deckdle is Live'
description: "Announcing Deckdle, yet another web game in my portfolio. Play a daily solitaire card game and try to get the highest score possible."
tags: cards daily deckdle game nebapp solitaire web webdev wordle-like
headerImage: posts/2024/deckdle-is-live.png
headerImageCaption: 'Deckdle web game logo'
image: posts/2024/deckdle-is-live.png
published: true
---

{{ page.description }}

<!--more-->

## Solo Solitaire Sport

Before computers and TV and video games and the Internet, there were seemingly far fewer things a person could do to while the time away. Despite all the technology we now often take for granted there was still the simple deck of playing cards, waiting to be shuffled and riffled and dealt and stacked in various ways either with others or by yourself.

The main act of using a deck of playing cards in some structured manner by one person is called solitaire (or "[patience](https://en.wikipedia.org/wiki/Patience_(game))"). You deal out some of the cards in a certain grid, or _tableau_, and then your job is to take them from the tableau via a series of rules and put them on top of one or more foundations (or maybe just discard them entirely, right into ~~the trash~~discard pile), so that they are all nicely put away and you win.

## Distinct Daily Diversion

Despite making [Bogdle](https://bogdle.neb.host) and [Nebyoodle](https://guess.nebyoolae.com), the itch to make a daily web game remained. I didn't want to make something that used audio, because it requires turning on speakers or using headphones, and while I love audio, even I like to use my devices in silence most of the time. I didn't want to do something with words, because that market is oversaturated and I'd already done something like that.

However, somehow there was no daily card game I could find. Playing cards are ubiquitous in society and popular culture, so it seemed common enough, and yet I could find nothing existing to satiate my desire to play a unique round of solitaire each day...so I made one.

## Deckdle Debut Declaration

[Deckdle](https://deckdle.neb.host) is a daily solitaire card game. While there are many different kinds of solitaire, I decided to use [Golf](https://en.wikipedia.org/wiki/Golf_(patience)) as the initial (and currently only) type, as it was a version I'd been playing IRL recently. You click on cards in the tableau to remove them to a foundation/base. If there is no valid tableau move, then you take a random card from the stock and try again. If you exhaust the tableau, then you technically "win", and in the realm of Golf, your score is par (or under par by the number of cards left in the stock). If you run out of stock cards and are left with no valid tableau moves, you "lose", and your score is the number of tableau cards left over.

Deckdle is built using the same custom HTML/CSS/JS framework I've been using since Bogdle, just heavily modified to use cards instead of letter tiles. It's my special flavor of JS OOP-ish programming, where there is a mix of actual JS classes and more-or-less namespaced code. I'm better at breaking out specific code to its own file, instead of cramming literally everything into `app.js`, but it's still not amazing. While it results in a working game, I can't honestly recommend doing it this way. It's just how my mind works, for better or worse.

Whenever I use this framework, I end up improving it in ways that I try to backport to older projects. At one point, I thought about making the whole thing into a mini-framework I could then use to create new apps with a CLI command like `nebapp new popular-app`, but...not yet.

## Delightful Deckdle Dependencies

* [chance.js](https://github.com/chancejs/chancejs): for daily games, I needed a way to create a "random" shuffle, but also have that shuffle be consistent for everyone who plays the game on a specific day, and `chance.js` does that just right
* [animate.css](https://animate.style): while I could write a bunch of animations from scratch, it would take forever and not be optimized, so I LOVE using `animate.css` to make easy CSS-based animations (e.g. card deal, card movement, combo counter) for a web project
* [webaudio-tinysynth](https://github.com/g200kg/webaudio-tinysynth): also used in the web version of [Gem Warrior](https://gw.neb.host), `webaudio-tinysynth` is a fantastic way to make MIDI music on the web, as it allows me to _program_ audio, instead of having to record it to a file and play it back
  * For example, the "valid tableau move has occurred" sound, which is a C, D, and F arpeggio, looks like this:

    ```js
    Deckdle.config.synthSFX.send([0x90, 60, 100])
    setTimeout(() => {
      Deckdle.config.synthSFX.send([0x90, 62, 100])
    }, 40)
    setTimeout(() => {
      Deckdle.config.synthSFX.send([0x90, 65, 100])
    }, 70)
    setTimeout(() => {
      Deckdle.config.synthSFX.send([0x80, 60, 0])
      Deckdle.config.synthSFX.send([0x80, 62, 0])
      Deckdle.config.synthSFX.send([0x80, 65, 0])
    }, 300)
    ```

## Decisive Deckdle Denouement

My plans for Deckdle are threefold: fix bugs, add tests, and eventually add more types of solitaire (klondike, pyramid, and spider are on the roadmap). Until then, it's fully playable in both daily and free play modes. [Go play](https://deckdle.neb.host)!
