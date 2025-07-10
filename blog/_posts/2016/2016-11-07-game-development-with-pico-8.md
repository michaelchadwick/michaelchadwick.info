---
layout: post
title:  "Game Development with Pico-8"
tags: game gaming lua pico8 learning github
headerImage: posts/2016/11/pico8_startup.gif
excerpt: "Spurred on by Github's Game Off game jam, I've decided to use Pico-8 as my game engine workplace, as writing everything from scratch can be a bit of an ordeal."
published: true
---

Spurred on by [Github's Game Off](https://github.com/github/game-off-2016) game jam, and inspired by [Hook, Line, and Thinker](https://itch.io/jam/fishing-jam-2/topic/44829/fishing-puzzle-game-in-pico-8-hook-line-and-thinker), I've decided to use [Pico-8](https://lexaloffle.com/pico-8.php) as my game engine workplace, as writing everything from scratch can be a [bit of an ordeal]({{ site.blogurl }}/2015/06/08/gem-warrior-part-1-of-who-knows/). An all-in-one minimalist design shop, Pico-8 has the ability to do the cart, sprites, and audio all in one neat little package.

<!--more-->

It's been over a year since I worked on a game, so my game design abilities are a bit rusty. Thus, as with all disciplines, it's good to go back and renew the basics before actually making something worthwhile.

### Getting Started

My first task to learn the Pico-8 system is to familiarize myself with the tool, and look through the API. This largely comes in the form of a text file accompanying the main software package (although there's also [this](https://neko250.github.io/pico8-api/) for a quick reference). Pico-8 uses a subset of the [Lua](https://www.lua.org) scripting language (which is a popular scripting language in a lot of games). I remember first hearing about it when I played World of Warcraft, as it was the way people made mods. Never touched it at the time, but now I'm fully ensconced.

Pico-8 comes with a lot of helpful demo *carts* (the software's term for programs, as the whole thing is like a throwback console from the 80s) that go over many techniques one would need to design a game. Despite the limitations of a 128x128 screen, 16 colors, and only 4 channels of audio, the expressiveness people have created is inspiring.

### Current Status

As of right now, all I've done is create two things:

* A sun that sits in space, with a controllable blue planet that can fly around at different speeds, booping back to its origin if it gets too close to the sun
* A 1-player pong clone (you against 3 walls)

However, I've learned how to draw simple shapes, utilize sprites, make some music, handle screen boundaries, implement (very simple) object collision, and make both a title and game over screen. Not sure if either of these two concepts will go beyond their current state, but they were necessary to get my feet wet.

I'm over a week in on the Game Off, so I really need to decide on a game type to do soon. Regardless, this has ignited my creative engine and I can't wait to see what I can come up with over the next month.

More blog posts to come!
