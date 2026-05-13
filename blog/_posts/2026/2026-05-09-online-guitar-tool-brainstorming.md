---
layout: post
title: 'Online Guitar Tools Brainstorming'
date: 2026-05-09 19:00:00
description: 'As a guitarist, I sometimes need to reach for tools to facilitate the proper plucking of strings on my axe. While plenty of existing options exist, they never seem to perfectly fit what I want, and I start thinking about making my own versions. But what and how?'
headerImage: posts/2026/guitar-playing.jpg
headerImageCaption: 'Me, playing guitar'
image: posts/2026/guitar-playing.jpg
tags: chords guitar keebord tabdiv tablature tone tuner vexflow vextab vuejs webdev
published: true

---

{{ page.description }}

<!--more-->

## PRE-AMBLE

I've been a guitar player since the mid-1990s, so...it's been a minute. I grew up when the Internet was becoming popular, and one of the best things about it was the easy access to *tablature*. If you're not familiar, imagine standard sheet music, with the bars and lines and notes, but instead of a 6-line, 5-space area, with circles denoting pitch AND duration, each note was a number, denoting the specific fret on a string instrument. Obviously, this meant non-string players did not use it, which limited its use. And each note had no intrinsic duration, so only careful spacing of text would infer that information.

<div class="vextab-auto" title="The C major scale" width="570">
tabstave<br />
notes 3-5/6 2-3-5/5 2-4-5/4
</div>
<div class="vex-tabdiv-caption">The C major scale</div>

Regardless of its failings, guitar tablature was easier to write and read, being closer to the metal, mimicking the 6-string fretboard of your average guitar, so I was able to grok it immediately, unlike standard sheet music. That, and all my favorite pop and rock songs were often in tablature format and accessible from OLGA (rip) or Ultimate Guitar, so I devoured that in my first few years of learning the guitbox. I even printed out a massive book of them at one point!

While tablature is amazing, if you can't tune your guitar it's not going to be much help. Also, some of the "tablature" you find may just be chord charts, and if you don't know how to play a <a class="musical-tone musical-chord" href="#" title="click for a C#sus4" data-notes="69.296,103.83,138.59,155.56,207.65">C#sus2</a>, then you'd be out of luck. Thus, that's kind of the three tools I first think of when I ponder a new web app to help guitarists (myself and anyone else).

* Tablature
* Tuner
* Chord lookup

## AMBLE

There are plenty of web apps available that do one or multiple of these things. Some of them are very good! Some of them are less good. A lot of them are full of ads. I've never made a web app and put ads on it. I live a privileged life where I don't need to make money off of the random things I make for the web. Thus, I will continue to do that as long as I can.

Of the three tools that I identified, I think that a chord lookup app appeals to me the most. Tablature (and the editing of it) is a big job, with lots of decisions to make and edge cases to handle. A tuner would be even easier than a chord lookup tool, but I use it less, in general, since I have an app on my phone and even a couple hardware tuners (or I can just hit a note on a piano).

Chord lookup appeals not only to my intrinsic interest in cataloguing and identifying and theorizing about music, but it also sounds like a fun challenge. My online keyboard app, <a href="https://keebord.neb.host">Keebord</a>, already does some decent chord identification on a piano, but this would allow me to expand that, and center it around my main instrument. In fact, maybe I could even intermingle the tuning thing to potentially identify a strummed chord. I'm sure that's a lot harder than using an algorithm with manual notes or intervals, but...it is also intriguing.

## POST-AMBLE

Decision made! A chord lookup tool it is going to be, with a potential audio input identification thingy maybe later.

Now...what to call it?
