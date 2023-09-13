---
layout: post
title: "Back to BASICs with NebyooSkate"
tags: basic gamedev lowresnx nebyooskate pico9 tic80
headerImage: posts/2023/nebyooskate-title-2023-09-13.jpg
published: true
---

Inspiration has hit me again, and so I've dove back into BASIC programming via LowRes NX to make a new game. This time, I'm making an ice skating game somewhat inspired by Tony Hawk's Pro Skater.

<!--more-->

## SOME BACKSTORY

My daughter started ice skating at the beginning of 2023. She was a bit shaky at first, like we all were, but she has progressed impressively and quickly. She's taken many public and private lessons, practiced for many hours, and is even on a synchronized skating team!

All this is to say that ice skating was not really in my mind grapes pre-2023, but is now in full force. As someone who dabbles in game development from time to time, the idea to make an ice skating game was not that farfetched.

## GAME IDE

There are a lot of ways to make a game these days. My preference is to use a retro console app like [PICO-8](https://www.lexaloffle.com/pico-8.php) or [TIC-80](https://tic80.com), mainly because they have all the tools in them to make the code, graphics, and sound. The integrated package makes all the parts talk to each other easily, and is just the right level of quality for my "programmer art" mindset.

Unfortunately, there is no iOS version of either, so if I want to work on the game I have to be at a computer. I'm not _always_ at a computer, and it's super useful to use my iPhone to do game development as well, if possible.

Thus, I went back to [LowRes NX](https://lowresnx.inutilis.com), a retro console app I used for a bit earlier in the year. It works on macOS, iOS, and Windows. I can edit the code, graphics, and sound on my phone, but also on my Mac, with the helpful niceties that a desk (large monitor, full keyboard/mouse) and VS Code provides (syntax highlighting, code folding, and auto-indentation via [this plugin](https://marketplace.visualstudio.com/items?itemName=schraf.lowres-nx&ssr=false#overview), etc.).

One unfortunate result of using LowRes NX is that it uses the BASIC programming language (but without line numbers, thankfully). Obviously, one _can_ make a game with it, but BASIC was originally created in the 60s and does not do OOP, nor does it feature the modern creature features programmers have come to know and love since then (like, I dunno, functions that return a value). It's best to set your expectations to "someone making a game in 1980 for the Atari" or something.

Regardless, for the kind of simple stuff I'm making, BASIC is fine, even if it means I have to kind of de-program my brain from what I normally work in to make headway. The low-resolution graphics and audio are fine, too, as I love chiptune and retro games.

## PROGRESS SO FAR

The initial seed of an idea was to create an ice rink with some walls, and a skater that you control. Move the skater around the rink and then...uh, I'll figure that out later. This involved making a bunch of sprites for the four cardinal directions, as well as alternate versions for when you're moving. I also had to add a simple acceleration/deceleration model so it actually looks like the avatar is _skating_ and not simply _moving_.

The most significant thing I have figured out so far is creating a little Tony Hawk-esque "hold button to crouch and then release to jump" move.

<video src="/assets/video/posts/nebyooskate_jump-2023-09-13.mp4" controls="controls" width="480" height="320"></video>

```basic
GLOBAL B_PRESSED
B_PRESSED=0

IF BUTTON TAP(0,1) THEN
  B_PRESSED=1
END IF

IF BUTTON(0,1) AND B_PRESSED=1 THEN
  'CHANGE SPRITE, ETC.
ELSE
  IF B_PRESSED=1 THEN
    B_PRESSED=0
    CALL JUMP
  END IF
END IF
```

The way I handle jumping is hacky (it uses <code>WAIT</code>) and needs to be updated to an upward velocity thing, but I'll get to that next.

## CHALLENGES AHEAD

I want this game to involve doing tricks to get a high score, so I'm going to continue with the THPS idea, and figure out how best to map all the moves I want to be able to perform onto two buttons and a D-pad. I think trying to figure out the notion of "combos" is going to be rough.

Since I'm a musician, I gotta think of a cool soundtrack and some sound effects, too, but that's the real fun part.

## FOR THE ROAD

Stay slick!
