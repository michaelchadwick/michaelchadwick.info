---
layout: post
title: 'Nebyoodle is Live'
tags: audio bogdle game music nebapp nebyoolae nebyoomusic web wordle-like
headerImage: posts/2023/nebyoodle-2023-07-05.png
---

First of all, RIP [Heardle](https://heardle.app) :(

Second of all, I have a big enough ego to attempt my own Heardle, but using only my music. And so, I did.

<!--more-->

Using the same codebase as my [Bogdle](https://bogdle.neb.host) game, which is also itself a play on the popular Wordle game, I was able to get a PoC of [Nebyoodle](https://guess.nebyoolae.com) done fairly quickly.

## FUN NEW CHALLENGES

As with all new web applications, there's usually at least one or two challenges that are new to me.

### DRUPAL JSON API

The logical data source for all my music is [NebyooMusic](https://music.nebyoolae.com), a Drupal-based web app that has all the music I've ever done, organized, and filled with metadata.

I enabled the core module [JSON:API](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module), and some of its submodules, and began configuring it to work with views of tracks. Then I could query an API endpoint and get a, for example, random track.

For a random-track-guessing web game, that's pretty useful!

### WEB AUDIO API

[This](https://ah.neb.host) [is](https://keebord.neb.host) [something](https://soundlister.neb.host) I've dealt with plenty of times before, so I'm not neophyte to making audio occur on a website, but the Web Audio API is still something that is non-trivial to deal with beyond the following:

<audio controls>
  <source src="/assets/audio/posts/sound.mp3" type="audio/mpeg">
No &lt;audio&gt; support in your browser found.
</audio>

The main issue was handling skips vs incorrect guesses vs correct guesses and how they affect the UI and the overall game status. When it's just text or images, it's one thing, but when it's audio, it's a bit different.

## FOR THE ROAD

I learn and organize as I go, which means a lot of backtracking on code and redoing things I've already done to make them more sense. I also jump between projects a fair amount, usually due to being stuck or burnt out, and any progress I make in one project often influences others. I should really use a framework or something (or make my own...?), but instead I stubbornly keep making my own each time, and consistency across projects takes a hit.

That being said, the meat of this project was done in Bogdle, so it didn't take nearly as long to get done. Now I have a fun way to go through my catalog, which is nearly 600(!) tracks large. No one else would have the domain knowledge to play this game, and yet it was still fun to build, which is my bar of success.
