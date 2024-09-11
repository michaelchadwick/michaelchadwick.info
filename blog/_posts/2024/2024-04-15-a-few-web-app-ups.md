---
layout: post
title: "A Few Web App Ups"
description: "Over the last few months I've made some updates to some of my web apps. Here's a short overview of those changes, using my very own git commit messages as headers!"
tags: bogdle games gem-warrior keebord nebapps nebyoodle puzzles raffler speech-synthesis wordle
headerImage: posts/2024/a-few-web-app-ups.jpg
headerImageCaption: 'large desert landscape, small spiderweb in the middle, spiderweb being welded by a single robot engineer - NightCafe (model: Dreamshaper XL Lightning, preset: Striking)'
image: posts/2024/a-few-web-app-ups.jpg
published: true
---

{{ page.description}}

<!--more-->

## BOGDLE

```shell
Date: Wed Mar 27
- removed some inappropriate words
- added sounds for incorrect guess, and repeated guess
```

Building a [word game](https://bogdle.neb.host) that uses a corpus as large as the ENGLISH LANGUAGE can be difficult. Why? Because there are plenty of legitimate words that are not appropriate for a general audience. There are also lots of legitimate words that are just too uncommon to be fun to guess, but that's another story. I have no mechanic set up for users to flag words either way, so I spent some time manually pruning.

Also, to liven things up, I made some more sound effects, courtesy of my daughter :D

```shell
Date: Mon Mar 18
- bogdle now keeps track of daily pangrams found, and allows sharing of accomplishment
```

A friend of mine said that they don't play Bogdle (or words games in this vein) as a daily because it takes too long (some days can take a long time!). I agree with their assessment; it's why I don't regularly play Bogdle, and I *made* it! Thus, I figured a *mini*-goal (besides finding ALL the words) could be to find the *pangram* (thanks for the term, [Spelling Bee](https://nytimes.com/puzzles/spelling-bee)). It's gotten me to do the puzzle each day ever since.

## NEBYOODLE

```shell
Date: Wed Mar 13
- skipped and wrong guess now have a matching background color
- skipped and wrong guess now have a matching border color
```

My "[guess the song](https://guess.nebyoolae.com)" game using only music I've made (verrrrry niche audience) hasn't changed much, but I did make the main view of guesses have a bit more color. Spotify's daily game, now discontinued, was the initial inspiration, and its design was very minimal. As time went on, I felt like Nebyoodle's UI could use a *smidge* more color, especially when making guesses, so that you could see how well you're doing at a glance. Color and iconography go a long way.

## RAFFLER

```shell
Date: Fri Apr 12
- only play countdown sound once
```

A looooooong-lasting bug of [Raffler](https://raffler.fun) was the "countdown" sound: this is the audio file that plays the "beep-bo-bo-beep" thing (modeled after The Daily Show's "Week in God" segment) while the raffle slooooows down and makes a choice. For an excruciatingly long time it would play multiple times, causing a weird echo effect that just sounded bad.

Unfortunately, I just couldn't figure out why it did this. My best guess was that it had something to do with the Javascript timer causing havoc with the audio file playing at the same time. To debug that, I spent a lot of time adding console logs and variable flags to figure when the browser thought audio was playing and stop it from playing a second (or third or fourth or...) copy of the audio file.

Regardless of all that work, the fix was far less elegant: I have a variable that keeps track of the interval between cycles of each item in the raffler. This variable gets bigger and bigger as the raffler goes from beginning to end, making a "slowdown" effect. Once the raffle has chosen an item, it resets back to a default value. I just made sure the audio file can only be triggered when the interval variable is equal to the default value. Bam, done, fixed. Why didn't I do this eons ago?!

```shell
Date: Fri Apr 12
- removed talkify; implemented SpeechSynthesis API
```

One feature Raffler has is to read the item chosen out loud, for better accessibility. When I first created this web app many years ago, I found some external service called [Talkify](https://talkify.net/text-to-speech) that would do just that. Unfortunately, it meant that I had to set it up in the config, use their API, and keep track of usage.

Recently, I found that Javascript has its own built-in [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) interface (part of the Web Speech API), and is dead simple to use. The fewer dependencies, the better.

```shell
Date: Thu Apr 11
- moved some functions into their own files in a lib/ subdir
```

Refactoring code is never glamorous, but trying to be more OOP about my code is always worth it. Going through a big file of spaghetti code is never as yummy as it sounds like.

## FOR THE ROAD

My next updates on the list will probably be for [Keebord](https://keebord.neb.host) and [Gem Warrior](https://gw.neb.host).
