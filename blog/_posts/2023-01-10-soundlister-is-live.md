---
title: 'Soundlister is Live'
layout: post
headerImage: posts/2023/soundlister-2023-01-10.png
tags: audio list music playlist tool web
---

Are you a musician or sound designer or any sort? Ever just need to listen to a bunch of sketches or samples you've made, one after the other, but don't feel ready to put them into a "real" audio application like iTunes? Want to be able to listen to them from any device with an Internet connection and a web browser?

If any of that made sense to you, then <a href="https://soundlister.neb.host">Soundlister</a> may be of interest.

<!--more-->

Typing as a musician, I make music a lot. My brain just kind of synthesizes sound into some kind of *idea* quite often, and it bounces around in my head until I either forget it or record it somehow for future usage. The Voice Memos app is very useful in this regard. An *idea* might even become a *sketch* if I re-record it further, maybe adding some additional layers or tracks to it. That *sketch* may then get into my iCloud documents in a folder named after the potential album said *sketch* could be included within. Thankfully, iCloud is also available on my phone to listen to while I'm, say, walking my dog.

While all of this so far is fantastic, there is still no way within the aforementioned system to LISTEN TO A PLAYLIST OF AUDIO IN ORDER WITHOUT THE AUDIO STOPPING AFTER EACH FILE.

_Ahem_.

Thus, as a musician who is also a web developer, I decided to make something that fixes this as best as I could.

Soundlister is a web application that takes a directory (or multiple directories) of audio, creates an old-school Winamp-ish audio player with a playlist, and slaps it on a one-page web app. You click/tap play and it plays all the audio files in order, and then (by default) plays them again. And again. And again and again and again until you either stop it, you toggle the Repeat option off, your device runs out of juice, or the heat death of the universe ends everything. That's it!

Well, there's a bit more, but that's essentially _*it*_.

## DESIGN

I grew up playing most of my music on a Windows computer using Winamp, and then later on a Mac using iTunes. The latter is a bit too much UI for this purpose, so I chose the former for the player and playlist inspiration.

There's a <a href="https://css-tricks.com/lets-create-a-custom-audio-player">great article</a> on CSS Tricks that walks you through the design of a custom audio player, so I went through that and then modified it for my purposes.

Most of my time was probably spent on trying to figure out the best way to present the player and playlist across all viewports in a web browser, from small mobile screens to large desktop screens.

## TECH

There's nothing too exciting about the web technology used to make Soundlister, but it still took some work to get all the pieces to work together.

The audio files are read in by a custom PHP script, analyzed for ID3 information if they're mp3s by <a href="https://github.com/eidoriantan/mp3tag.js">mp3tag.js</a>, and then the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">Web Audio API</a> is used to play them. I've built other web apps that use the Web Audio API, so I had a head start on this project, but the official documentation for such things is still an amazing resource.

## DRAWBACKS

Due to how iOS _still_ treats web applications, if you lock your screen while Soundlister is doing its thing, and an audio file finishes, it will *not* automatically start the next one in the playlist. This, of course, defeats a HUGE percentage of the functionality for me, but I have yet to find a workaround despite trying several Javascript hacks.

Android phones seem to process the whole shebang _just fine_, and I'm not jealous AT ALL.

## FOR THE ROAD

You can see Soundlister in action <a href="https://soundlister.neb.host">here</a> (replete with some sample silly songs from moi), and <a href="https://github.com/michaelchadwick/soundlister">grab the source</a> to host on your own server, which I hope you do. Let me know if you do, and submit bugs on Github.

Now go start listening to your recorded sketches, one after the other, in a playlist manner on any device that has Internet access and a web browser!
