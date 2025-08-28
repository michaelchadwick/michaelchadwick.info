---
layout: post
title: 'Event Listener Ephiphany'
date: 2025-08-27
description: "Being able to use Javascript event listeners to check when certain things happen, and then trigger useful tasks when they do, is not always as straightforward as I'd think."
tags: audio event-listeners keyboard javascript js webdev
headerImage: posts/2025/event-listener-epiphany.jpg
headerImageCaption: 'Screenshot from Sound Lister, my web app for displaying a playlist of audio'
image: posts/2025/event-listener-epiphany.jpg
published: true
---

{{ page.description }}

<!--more-->

Basically, I wanted [SoundLister](https://soundlister.neb.host) to honor a keyboard function key (like the one I have on my Mac) that toggles play/pause, while also honoring the UI play/pause button. Since SL uses a regular `<audio>` element, pressing that key would play/pause the audio like expected, but the UI would NOT toggle like you'd expect, since the existing event listener was only checking for clicking on the main player's icon.

At first I thought I needed to find an EventListener for `keypress`, as the event in question was a 'key' being pressed. Seems intuitive, right? That's how I added some simple keyboard shortcuts for play/pause and skip forward/back:

```js
document.addEventListener('keydown', (event) => {
  if (event.code == 'Space') {
    // fix issue with double-triggering
    // if space bar is activeElement
    document.activeElement.blur();
    SoundLister._updatePlayState('key');
  } else {
    // Next Track: Shift+Cmd/Win+Right
    // Prev Track: Shift+Cmd/Win+Left
    if (event.metaKey && event.shiftKey && event.code == 'ArrowRight') {
      SoundLister.goForward();
    } else if (event.metaKey && event.shiftKey && event.code == 'ArrowLeft') {
      SoundLister.goBack();
    }
  }
});
```

However, despite being aided by this wonderful [JavaScript Key Codes](https://www.toptal.com/developers/keycode) site, JS doesn't seem to _hear_ function keys (F1-F19). Why? Probably some OS-specific low-level reason. I dunno. Regardless, I was looking in the wrong place: I needed to listen for when audio began to play or was paused. I was already doing this, but I needed to augment it and figure out the proper logic to keep from accidentally getting stuck in loops. This was achieved by properly seperating the various entrypoints into toggling the play/pause state of the `<audio>` element:

* Clicking on the playlist itself
* Clicking on the collection dropdown and choosing a new subset of tracks
* Clicking on the UI play/pause icon (or using keyboard shortcuts)
* `<audio>` events that the other methods would trigger

I ended up with the following:

```js
// excerpt from events.js
// ...
// audio player UI play/pause icon
SoundLister.dom.playButton.addEventListener('click', () => {
  SoundLister._updatePlayState('click');
});
// <audio> element has started playing
SoundLister.dom.audio.addEventListener('play', () => {
  SoundLister._updatePlayState();
  SoundLister._setTitle(); // set <title> with current track name
});
// <audio> element has been paused
SoundLister.dom.audio.addEventListener('pause', () => {
  SoundLister._updatePlayState();
});
```

```js
// excerpt from main.js
// ...
// change play/pause icon and audio element depending on context
SoundLister._updatePlayState = (source = null) => {
  switch (source) {
    // clicking in the audio playlist auto-starts track
    // and sets play/pause icon to 'pause'
    case 'playlist':
      // start the audio scrubbing bar updating so refreshes every second
      requestAnimationFrame(SoundLister._whilePlaying);

      // change play/pause icon to 'pause'
      SoundLister.dom.playButtonIcon.classList.remove('fa-play');
      SoundLister.dom.playButtonIcon.classList.add('fa-pause');

      break;

    // clicking on the collection dropdown auto-stops track
    // and sets play/pause icon to 'play'
    case 'collection':
      // stop updating the audio scrubber bar refresh
      cancelAnimationFrame(SoundLister.raf);

      // load first track in collection
      SoundLister.dom.audio.src = SoundLister.tracks()[0].href;

      // change play/pause icon to 'play'
      SoundLister.dom.playButtonIcon.classList.remove('fa-pause');
      SoundLister.dom.playButtonIcon.classList.add('fa-play');

      break;

    // clicking directly on the play/pause icon
    // or using the space or next/prev keys
    case 'click':
    case 'key':
      if (SoundLister.dom.audio.paused) {
        SoundLister.dom.audio.play();

        // start the audio scrubbing bar updating so refreshes every second
        requestAnimationFrame(SoundLister._whilePlaying);

        // change play/pause icon to 'play'
        SoundLister.dom.playButtonIcon.classList.remove('fa-pause');
        SoundLister.dom.playButtonIcon.classList.add('fa-play');
      } else {
        SoundLister.dom.audio.pause();

        // stop updating the audio scrubber bar refresh
        cancelAnimationFrame(SoundLister.raf);

        // change play/pause icon to 'pause'
        SoundLister.dom.playButtonIcon.classList.remove('fa-play');
        SoundLister.dom.playButtonIcon.classList.add('fa-pause');
      }

      break;

    // audio play/pause events
    default:
      if (SoundLister.dom.audio.paused) {
        // change play/pause icon to 'play'
        SoundLister.dom.playButtonIcon.classList.remove('fa-pause');
        SoundLister.dom.playButtonIcon.classList.add('fa-play');
      } else {
        // change play/pause icon to 'pause'
        SoundLister.dom.playButtonIcon.classList.remove('fa-play');
        SoundLister.dom.playButtonIcon.classList.add('fa-pause');
      }

      break;
  }
};
```

The real key was making sure that activating the play/pause UI icon didn't create an infinite loop of audio start/stop events, causing the icon to toggle endlessly and the audio to take on a nice glitchy tremelo feature.

Trial and error, complication followed by simplification, and lots of refreshing of the browser finally got me to the finished, working state. Now I can hit the function key on my Mac and the status of everything syncs up nicely.
