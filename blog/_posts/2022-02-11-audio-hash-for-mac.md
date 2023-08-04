---
layout: post
title: 'Audio Hash Mac'
tags: audio-hash development macdev objective-c swift swiftui utterly xcode
---

Once upon a time I created a web app called [Audio Hash](https://neb.host/audiohash). It involved low-level audio manipulation in order to take multiple audio files, grab random chunks of them, and then combine them into a sampler of sorts, or a "hash".

The only problem is...it still doesn't work (_as of 2022-02-11_).

<!--more-->

## A VERY SHORT STORY

Despite the web version not actually working, I _was_ successful in getting JavaScript to make a long, _silent_ audio file as a product of this "hash", so if that's your use case, I've got you covered. Regardless, it was really fun learning about [what actually makes up a WAV file](https://github.com/michaelchadwick/audiohash-web/blob/master/assets/js/app/audiohash.js#L95-L129), and despite it ultimately being a failure, AudioHash-Web was a catalyst. Unperturbed, I changed platform to [Windows Forms](https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2010/ms229601(v=vs.100)) and was actually able to [make something that worked](https://github.com/michaelchadwick/audiohash-win) using the awesome [NAudio](https://github.com/naudio/NAudio) library.

## BACK TO THE CURRENT DAY

Recently, I was finishing up an as-of-yet-unreleased EP of music and wanted to create a sampler of it. Something short that showcased 30 seconds of what it sounded like to share on social media and the like. The idea to use AudioHash came to mind, naturally, but AudioHash-Web (as you now know) is unhelpful, and I no longer am able to run AudioHash-Win since my platform of choice has not been Windows in a long time. Sadness.

Since I didn't really feel like creating AudioHash _again_ for yet another platform, I initially tried to find a way to port AudioHash-Win to macOS. This strategy did not work, however, as Windows Forms are apparently **very** Windows-specific, and there's no MakeWindowsFormsApplicationIntoMacOSApp program I can run to magically be done with it. Thus, I dusted off Xcode, found a [tutorial](https://developer.apple.com/tutorials/swiftui/), and got to work creating something from scratch..._again_.

I'm rusty at writing any kind of application in anything but HTML/CSS/JS, so AudioHash-Mac has been a bit of a challenge so far. The last time I did anything in Xcode was when I worked on [Utterly](https://github.com/michaelchadwick/utterly) (which still works in macOS 12!), translating Objective-C to Swift 3. Xcode was only version 8, but now it is **13**, and Swift is now on **5**. Thankfully, the Apple Developer docs have improved considerably since I last used them, and Swift now has a banger library called SwiftUI to make creating interfaces a lot easier. I also found this [iOS audio player tutorial](https://www.raywenderlich.com/21672160-avaudioengine-tutorial-for-ios-getting-started) from [Ray Wenderlich](https://raywenderlich.com) which handled so much of this project right off the bat, so progress is being made!

I'm excited to be excited about a new personal development project, and I hope it actually comes to fruition so I can share it out for anyone else needing this kind of functionality :D
