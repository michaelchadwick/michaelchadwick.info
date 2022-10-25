---
title: 'Bogdle is Live'
layout: post
headerImage: posts/2022/bogdle-2022-10-25.png
tags: bogdle boggle daily game nebapp puzzle vuejs wordle wordsmyth
---

It's finally time to reveal my finished web game: <a href="https://bogdle.fun">Bogdle</a>.

I <a href="/blog/2022/05/bogdle-intro">blogged about it before</a> and it's finally ready for prime time.

<!--more-->

<a href="https://bogdle.fun">Bogdle</a> is a Wordle-inspired game of Boggle, the popular grid word-search. The look and feel is definitely Wordle, but the actual gameplay is [Wordsmyth](https://apps.apple.com/us/app/wordsmyth-a-daily-word-game/id1534959553), a Boggle-like game for iOS that I got addicted to at one point.

## BASICS

Each day, there will be a unique puzzle using a 9-letter seed word. The app takes that seed word and finds all the 8-and-below-letter words that exist inside that word, and then makes a list of words to find to "win" the day. Unlike Boggle, you don't have to trace a path between letters, but can instead jump around, which is a lot easier.

As with all the other daily puzzle games, there is a new one each day so people can share experiences. If you want to just play randomized seeds, you can click over to Free and do as many as you like.

## TECH

The technology stack is all custom HTML, CSS, and <a href="http://vanilla-js.com">Vanilla JS</a> for the most part. Wordle uses <a href="https://vuejs.org">VueJS</a>, I believe, and I definitely cribbed a lot from its general document structure, but there's no framework generating Bogdle's template.

PHP is used to pick the daily seed word and make sure each 24 hour period serves a unique seed. I found a lot of sites use client-side time to pick their daily puzzles, which means that you can change your local system clock to "hack" the game to any day you want, but Bogdle uses server time so it always gives you the "correct" puzzle based on its clock.

Wordlists come from a few public English word lists, somewhat massaged. Removing words that don't play well (and adding baffling omissions) is a tedious job, and one I have not really done much of yet, so Bogdle's list of words don't feel _right_ yet.

## DESIGN

Graphics are simple shapes, colors, and icons (thanks Fontawesome, again), which is my general design sense these days. In addition, I spent a lot of time trying to make the app UX work like Wordle, which spurred on a whole sea change for my other NebApps (blog posts for each to come). At some point I even played with the idea of making my own open-source mini-framework that could be generalized for any SPA like this. All the NebApp redesigns kept sharing from each other, so it seemed worth it in the beginning, but I figure it's enough to just use it for my own stuff as the work involved in making it work for _any_ idea would take a **lot** longer.

No music to be found on Bogdle as of yet, which is surprising coming from me, I know. Instead, sound is just a few sound effects, but they were all created by my daughter (and edited a bit by me). It makes me gleeful to know she had a hand in making this project possible.

### FOR THE ROAD

Bogdle, being based on Boggle, doesn't have that immediate viral spark that makes other daily puzzles so imminently shareable, but I added a share button when you win, anyway. Hopefully, Bogdle will find a few fans of the puzzle style and garner some repeat visits. In the end, I will mainly use this project as a framework for future ideas in the same vein.

Oh! Source code (minus some server scripty stuff) is on <a href="https://github.com/michaelchadwick/bogdle">Github</a> if you want to see the gooey insides.

Now go find some words!
