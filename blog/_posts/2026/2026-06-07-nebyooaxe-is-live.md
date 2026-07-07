---
layout: post
title: 'NebyooAxe is Live'
date: 2026-06-07 17:12
description: 'Occasionally I like to look up guitar chords and their proper names. Why? Cuz it is edifying. The web has many tools that can help with this, but none of them are mine. And now one is.'
headerImage: posts/2026/nebyooaxe-2026-06-07.png
headerImageCaption: 'A terrible logo for NebyooAxe, but it needed a visual, and I made one.'
image: posts/2026/nebyooaxe-2026-06-07.png
tags: astro audio chords cypress emberjs guitar music nebapp playwright qunit testing tool typescript vitest vuejs web web-app web-audio-api web-storage-api
published: true
---

{{ page.description }}

<!--more-->

## WHAT IS THIS?

It is [NebyooAxe](https://axe.neb.host) (or just Axe). And it is a guitar chord identifier and strummer that potentially improves your gitbox knowlege.

As I [mentioned](/blog/2026/05/09/online-guitar-tool-brainstorming) not long ago, I wanted to make some kind of online web app that could help me, musically. While I've made [Keebord](https://keebord.neb.host) and [SoundLister](https://soundlister.neb.host), they are not **guitar**-centric (which is a little wild since that's my main instrument). Since there are plenty of musicians out there who also happen to be programmers, you can easily find web apps that help guitarists with various things, but most of them are either too bloated or full of ads or *both*. All of them aren't made by me, too. Thus, I decided then to make a guitar chord lookup tool...and I have done so.

## TECH STACK

Besides the usual soup of HTML, JS, and CSS that all my (and most others') web apps tend to have, I decided to once again use [Vue](https://vuejs.org), since I enjoyed using it for Keebord. I like the idea of having these single file components that have all the template, style, and logic, and my work in [EmberJS](https://emberjs.com) and [GlimmerJS](https://glimmerjs.com) has only cemented that. In order to make it even gooder-er, I opted to use [TypeScript](https://www.typescriptlang.org) so that I can have explicit variable types and frustrate myself when my terrible untyped JavaScript skills are constantly tested (but get better about the logic therein!).

Remembering settings is once again done in `localStorage` using the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), because I've used it many times before and it works great. I opted for [VueUse](https://vueuse.org)'s specific `useStorage` method to help things along, though.

```javascript
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

type FretArray = string[]

export const useSettingsStore = defineStore('nebyooaxe-settings', {
  state: () => ({
    enableFretSound: useStorage('axe-enable-fretSound', true),
    currentFrets: useStorage('axe-current-frets', <string[]>[]),
  }),
  actions: {
    toggleEnableFretSound() {
      this.enableFretSound = !this.enableFretSound
    },
    updateCurrentFrets(currentFrets: FretArray) {
      this.currentFrets = currentFrets
    },
  },
})
```

Playing the notes when pressed and strumming the chords are all done manually through the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), creating oscillators and fading the volume in and out.

```javascript
function playNote(fretId: string): void {
  const masterGainNode = ctx.createGain()
  const startGain = 0.0001
  const endGain = 0.1
  masterGainNode.gain.value = startGain

  // main osc note
  const osc = ctx.createOscillator()
  osc.type = 'square'
  const noteFreq = MUSICAL_NOTES.filter(
    (n) => n.fretIds.includes(fretId)
  )[0]?.frequency
  if (noteFreq) {
    osc.frequency.value = noteFreq
  }

  // vibrato lfo
  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.value = 8

  // gain that sets the depth of the freq mod
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 0.35
  const lfoDetune = ctx.createGain()
  lfoDetune.gain.value = 50

  // connect lfo to its gain and its detune and then start it
  lfo.connect(lfoGain)
  lfoGain.connect(osc.detune)
  lfo.start()

  // connect main osc to main gain and then to destination
  osc.connect(masterGainNode)
  masterGainNode.connect(ctx.destination)

  // start the main osc, fade in volume, fade out volume, stop main osc
  osc.start(ctx.currentTime)
  masterGainNode.gain.exponentialRampToValueAtTime(
    endGain,
    ctx.currentTime + 0.2
  )
  masterGainNode.gain.exponentialRampToValueAtTime(
    startGain,
    ctx.currentTime + 2.1
  )
  osc.stop(ctx.currentTime + 2.1)
  lfo.stop(ctx.currentTime + 2.1)
}
```

Speaking of which: I should really write some more tests. I'm using [Playwright](https://playwright.dev/) for E2E tests and [Vitest](https://vitest.dev) for unit tests...because that's what Vue defaults to. I've had some minor experience with both of them due to using [Astro](https://astro.build) recently, but I'm still mainly used to either [QUnit](https://qunitjs.com) or [Cypress](https://www.cypress.io), so it'll take a little getting used to.

## FINAL NOTE

Of course, as a web app, NebyooAxe is not **done** *done* just yet. The algorithm to figure out chords could be improved with more intelligence. It only works for standard tuning and six strings, despite variations existing. It also only works for right-handedly strung guitars. I know, I know. It is not yet as featureful or accessible as it could be. My mantra, however, is that the web is art, and art is never done. However, it is currently **useful** to me, and possibly others, so it's up and ready to strum.

## FOR THE ROAD

I never took formal lessons to learn to play the guitar. I was inspired by someone in high school playing to finally pick one up and start plucking. Then I turned to tablature on the Internet to learn to play my favorite songs. Somewhere along the way I just got curious about what all the theory behind it was and that became a lifelong interest. Knowing the chord names (and how they're derived) has been fascinating to me for a long time. Now that I have my very own configurable way to look them up, I feel like a bucket list item got checked off. Hopefully [NebyooAxe](https://axe.neb.host) is helpful to someone else, too!
