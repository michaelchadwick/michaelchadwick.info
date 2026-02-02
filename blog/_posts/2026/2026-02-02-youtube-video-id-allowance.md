---
layout: post
title: 'YouTube Video ID Allowance'
date: 2026-02-02 09:22:00
description: 'All current existing YouTube videos can be filtered by a single 11-character id. Does that really seem like enough?'
tags: numbers thought youtube
published: true
---

{{ page.description }}

<!--more-->

Have you ever wondered how the many, many, MANY YouTube videos that apparently exist can really be filtered by such a small id? It doesnt seem nearly enough, especially when we live in a world with systems that use alphanumeric ids of 16, 20, 24, and more. Of course, my grasp of big numbers is limited and deplorable, so I did a little more digging.

According to some brief research it seems like YouTube (as of sometime last year) has about ~15 _billion_ videos, with upload rates each day in the _millions_. The `id` that each video uses is an 11-character combination of three character sets: `A-Z (26)`, `a-z (26)`, and `[0-9] (10)`, which makes the number of choices for each character `62`. Remembering my high school math lead me to a permutation to figure out:

<sub>n</sub>P<sub>r</sub> = n! / (n - r)! -> <sub>62</sub>P<sub>11</sub> = 62! / (62 - 11)!

This results in about _20 quintillion_ (i.e. 20 with 18 zeroes) possibilities for a YouTube video ID. The current data set is nowhere near hitting that number. Thus, an 11-character ID really can easily filter all those videos.

This thought experiment has now concluded, but go read this [BBC article](https://www.bbc.com/future/article/20250213-youtube-at-20-a-computer-that-drunk-dials-online-videos-reveals-statistics-that-google-doesnt-want-you-to-know) which gets into it more.
