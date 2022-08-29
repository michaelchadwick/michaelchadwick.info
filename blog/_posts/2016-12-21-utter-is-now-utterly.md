---

layout: post
title:  "Utter is now Utterly"
tags: utter utterly mac macos apple objective-c swift github cow
headerImage: posts/utterly.png
excerpt: "Presenting: Utterly, a macOS app that puts a GUI on top of Apple's built-in speech synthesis technology."

---

Presenting: [Utterly](https://github.com/michaelchadwick/utterly), a macOS app that puts a GUI on top of Apple's built-in speech synthesis technology.

[Download version 1.0](https://github.com/michaelchadwick/utterly/releases/tag/1.0)!

My previous attempt, [Utter](https://github.com/michaelchadwick/utter), has been rewritten with state-of-the-art tools and the newest of operating system version. Also, I added a picture of a cow to the app itself (instead of just the icon).

<!--more-->

### Backstory

I once wrote a little Mac utility called [Utter](https://github.com/michaelchadwick/utter). I had been using this command line utility to get my Mac to speak to me (the `say` command, essentially, but enhanced), but wanted a GUI. There was no source I could find, so I delved into the world of NSSpeechSynthesizer and made Utter.

It was fun and I learned a lot, but it had some issues and quirks I could never quite figure out. It's written in [Objective-C](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html), but the newest hotness on Apple platforms is [Swift](https://developer.apple.com/swift). I actually really like Swift, and returning to my old Objective-C code felt _even more_ arcane than it already did when I first tried using it, so I figured it was time to get serious and rewrite the thing (plus finally add a picture of a cow).

### Swift Rules

The whole rewrite, except for a few details that _finally_ got implemented recently, probably happened in a day. Swift just makes more sense to me after using things like Ruby and Golang, and its syntax is a lot less verbose. Maintenance should be a lot easier to do now that it's built with today's tools and tech. And now I have a final Swift project I can use to make more from!
