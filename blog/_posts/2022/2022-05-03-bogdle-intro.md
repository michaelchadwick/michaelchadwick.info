---
layout: post
title: 'Bogdle, a Wordle-inspired Boggle Clone'
date: 2022-05-03 08:43:00
tags: bogdle boggle game javascript web-game word-game wordle
headerImage: posts/2022/bogdle-2022-05-03.png
---

You remember [Boggle](https://en.wikipedia.org/wiki/Boggle), right? Grid of letters, find words, etc. You also are probably aware of [Wordle](https://nytimes.com/games/wordle), as it’s arguably the most popular English-langage word guessing game existing right now.

As you can see by the header image, I've made some progress on such a thing! However, bugs still need to be squashed, a "new puzzle each day" mechanic needs to be sussed out, and rough edges need to be sanded down. However, how did I even get here?

I present a short introductory post for now...

<!--more-->

My journey began with [Wordle](https://nytimes.com/games/wordle), the mega-popular word game that took the pandemic-stricken world by storm. It then veered off into several tributaries, like [Worldle](https://worldle.teuteuf.fr), [AntiWordle](https://www.antiwordle.com), [Heardle](https://heardle.app), and [many, many more](https://nerdschalk.com/wordle-variants-27-different-types-of-wordle-games-you-can-play).

Once I had my fill of daily-guess-the-thing variants, I kind of went the other way and stopped playing most of them...except a related word game: Boggle. It's a game that I've never been _super_ into, but I've always liked word searches of all sorts.

I tried to find a Boggle in the Wordle webapp world, but was unsuccessful, so I went to the iOS App Store and found [Wordsmyth](https://apps.apple.com/us/app/wordsmyth-a-daily-word-game/id1534959553). Two American dollars and ninety-nine American cents later, I was in it and searching through 3x3 grids of scrambled letters to find 3-to-9-letter-long words inside each day. This app is really well-designed, has no IAP or ads, and is just relaxing, interesting, and fun.

Wordsmyth is great, but it's not on the web. While I've attempted to make an iOS app in the past (and, yes, I still need to get back to my macOS app, [AudioHash-Mac](/blog/2022/02/11/audio-hash-for-mac)), I never got beyond a toy project, and certainly never made it into the App Store. I have nothing against iOS apps, but I wanted my game to be cross-platform and social like Wordle.

Thus, while I keep hacking away at Wordsmyth each day, my goal now is to make something like it on the web, with the framework of Wordle as either just a look-and-feel thing, or maybe even a hybrid functionality (that I'm still working on).
