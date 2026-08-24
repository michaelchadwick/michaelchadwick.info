---
layout: post
title: 'Dance Dance Evolution'
date: 2026-08-21 17:45
description: 'In my youth I picked up the skill of moving my feet to hit arrows on the ground in time to music, both for fun and for exercise. It has been many years since I did so, but guess what? You are never too old to show your ultimate dance.'
headerImage: posts/2026/dance_dance_evolution.png
headerImageCaption: 'Maximizer, the best song from the 8th Mix (Extreme 2).'
image: posts/2026/dance_dance_evolution.png
tags: ddr exercise mini-pc raspberry-pi
published: true
---

{{ page.description }}

<!--more-->

## Are You Ready?

[Dance Dance Revolution](https://en.wikipedia.org/wiki/Dance_Dance_Revolution) has had a very positive place in my life. I probably first learned about it back in an arcade somewhere (remember going to arcades to play video games?), watching someone absolutely wreck some really hard song that I still couldn't beat today. The pulsing beats, the flashing lights...it stood out in a room full of distractions. At first, you're a noob, and you do easy songs because the whole thing is novel and you're getting the hang of it. Then, if you keep at it, you start to build muscle memory about how to move, and you can anticipate steps better because you've played songs many times. You bump up the difficulty and learn new patterns and techniques. Your stamina increases. You sweat, because it's not just a game, it's a workout. It's actually legitimate exercise.

This "performing" in public as I started doing harder songs more often resulted in more unpleasant physical feelings more of the time, and so I began to want to play not at an arcade, but at home. By that point, the game was so popular that home consoles had versions, and so I spent most of my DDR time on PlayStation instead. Some friends of mine shared my DDR interest, and so we'd sometimes play together, which was super fun. I even accompanied one friend to a legitimate DDR competition once, watching true experts play extremely hard songs (or even freestyle their own dance steps that also satisfied the song's chart), which was pretty sick.

For the majority of my life now, however, DDR has been a game to play at home, alone, and it's great that it *also* counts as exercise. In fact, at one point I was doing it so much that I actually shed considerable pounds. I'm definitely not the only person to use DDR in this way, and I'm not going to be the last to do it again.

Most forms of exercise I've tried in the past just never have the staying power of DDR. Racquetball, indoor rock climbing, tennis, walking, running, gym circuit training, even biking...while they all have their pros, none of them match the marriage of music, gaming, and movement that DDR brings to the table, nor can they be easily done in the privacy of one's residence.

## Crying Buckets of Tears

In order to play DDR at home, you need software (originally PlayStation, then open-source wonder [Stepmania](https://www.stepmania.com/), and now open-source wonder [Project OutFox](https://projectoutfox.com/)), the songs themselves (an exercise left up to the reader), an audio/visual output (i.e. TV/monitor and speakers), and, most importantly, the *dance pad*.

When I was first playing DDR at home, I went through several iterations of my setup. First was the era of cheap, **soft** dance pads. They were superior only in price, because otherwise they sucked. They were barely better than hitting the ground, didn't always register your steps, and they slid around a bunch, especially on harder songs.

The next step up from a soft pad is the **foam** pad. This is like the soft one, but more expensive, and filled with a small layer of plastic foam. They are definitely an improvement: sliding is minimized, feet get some cushioning, and steps are registered more accurately. However, it's like going from 70% good to 80% good. It's still not like the arcade, and as you get better and move faster, it just can't keep up.

![Cobalt Flux hard metal pad]({{ site.baseurl }}/assets/images/posts/2026/cobalt_flux.png "Cobalt Flux hard metal pad")

The final step, save from buying an actual DDR arcade machine, is the **hard** pad, made of metal and plastic. I went through several soft and foam pads over the years, and dealt with a lot of frustration due to their inaccuracies and drawbacks. I thought that if I just kept buying them as they deteriorated, it was enough. Once you get good at the game and want to do Hard difficulty-level songs all the time, however, you realize they just won't ever fit the bill. Enter [Cobalt Flux](https://cobaltflux.org/collections/cobalt-flux-pads/products/cobalt-flux-dance-dance-revolution-ddr). It's sold out now, and there are alternatives I've never tried, but the one I got for my birthday in my 20s is *still* the one I have today and am using in my most recent setup. You can stomp and stomp and stomp on this thing, and it just takes the abuse. It turned my DDR at-home soft and/or foam fragile ecosystem into a solid dance station.

## I'm No Ordinary Fella

In my previous place of residence, there was a downstairs "extra" living room of sorts, and plenty of space to keep a heavy metal dance pad out for stomping. I remember doing DDR often there. In my current place of residence, such a space does not exist, and so I put the DDR stuff away, my skills atrophied, and the whole thing moved to the "archival space" of my brain. But the idea that I would play again never quite left me.

Recently, my usual form of exercise, biking, was temporarily disabled due to (yet another) flat tire. Changing the tire is tedious and unfun, and so I started thinking about an alternative. For some reason, DDR came full-fledged back into my head and I decided that there *had* to be a way to bring back this favorite form of interactive gaming which had been so beneficial to my life and health.

Through help from my wife (who has also done DDR with me in the past!), we were able to clean up the garage and make some space, and I could finally rebuild my DDR setup! I had an old Windows PC lying around (like you do), and I figured I could use that as a single-purpose DDR machine, but reality hit me quickly: it would not show anything on the new monitor I just got, no matter which video port I used. Rebooting did not help. Trying different cables did not help. The machine turned on, fans fanned, lights went on, but the monitor never got a signal.

**Strike 1**.

Wracking my brain for some other old, unused device I could use, I remembered I bought a Raspberry Pi 3b many years ago, hoping to start on a programming adventure with my kid which never materialized (alas!). Would it run OutFox? It only has 1GB memory and graphics hardware that is nothing to write home about, but posts on the Internet from people saying it could be done inspired me. I popped it open, ordered a new Micro-SD card with the Debian 13-flavored RPi operating system, plugged it in, and got some video output!

I excitedly downloaded OutFox and double-clicked the icon. A brief glimpse of a window pops up and then...it crashes. OpenGL has run out of memory. I tinker with config files and try again. Same thing. I tinker some more. I get a different OpenGL error. Tinker. Fail. Tinker. Fail. Maybe I don't need to be in a windowing system? I try again from the command line. Fail. I try different approaches, using X11 and EGL, but fail. This all occurs over multiple days for multiple hours each time. It's exhausing and demoralizing. Google and an LLM as my guide both ultimately failed. I finally give up on this path. I almost give up on the project entirely.

**Strike 2**.

Despite really initially liking the hacking aspect of a RPi-powered DDR machine, the hacking was not going anywhere, and I had reached my limit. Ordering a newer RPi was an option, but I feared I'd run into similar issues, and so decided to order a mini-PC running Windows 11. I got it up and running, installed OutFox, and...

**~~Strike 3~~WINNER!**

It's not especially fast (setup took seemingly forever just to get to a desktop), nor does it have any whiz-bang like my actual gaming PC, but what it does is take up very little space, not make much noise, and runs DDR. My trusty 20 year-old Cobalt Flux, despite lots of use and some rusting, was plugged in via a PlayStation->USB converter, and was detected by the OS. I didn't even have to mess with audio/video sync stuff, which is another bane of rhythm gaming, as it somehow magically Just Worked(tm) and I was A-i-a-i-ai-ing like in the olden days. DDR was, yet again, in my life and let's hope it stays for a while.

![Current DDR setup in the garage]({{ site.baseurl }}/assets/images/posts/2026/ddr_new_setup.jpg "Current DDR setup in the garage")

## Dancin' Mastery

And that brings us to the present. I started on my at-home DDR journey in my 20s. I was lighter, more agile, and had more stamina. I'm in my 40s now and I'm...not as much any of that. However, once my new setup was complete, the nascent skills came back and the muscle memory kicked in all the same. I just gotta work on getting back the ability to play for 1-2 hours regularly without completely dying.

I'm thinking of re-adding the two custom DDR songs I made for two of my original songs, but maybe cleaning them up so they are more danceable (I created them using a computer and tested them with a keyboard, and they've never been quite idiomatic when it comes to actually dancing). I have so many more original songs I could turn into DDR songs now, too, so maybe I'll get back into the custom thing. It's exciting to re-open this chapter of my life, and I really hope it helps me drop some weight, because that's the most important thing to me right now, besides just having fun and enjoying "working out" again.
