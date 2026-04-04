---
layout: post
title: 'Making SoundLister Work Offline'
date: 2026-04-04 00:01:00
description: 'SoundLister lets you listen to arbitrary audio using a web-based player and playlist, but if you lose network then it fails to be useful. That is, until now.'
tags: offline service-worker soundlister webdev
published: true
---

{{ page.description }}

<!--more-->

## INTRO: Easing You Into the Topic

While [Deckdle](https://deckdle.neb.host) is probably my most successful and continuously used web app, I think my most useful one is [SoundLister](https://soundlister.neb.host), mainly because whenever I'm working on new music it gets used heavily. Adding temp tracks to something like iTunes or even iCloud Files is just not as simple or efficient, and have drawbacks I don't want (they are not finished so they don't yet belong in my music collection, but I still need a playlist of them to listen and scrub and loop over while I'm doing listening tests). Thus, many years ago I decided to make a web app so I could drop audio files in a directory on a server and listen to them on any Internet-enabled device. It works like a charm and more details can be found at [my initial unveiling blog post](/blog/2023/01/09/soundlister-is-live/) (note: despite what it says then, iOS eventually fixed the 'screen off, so next track does not play bug'!).

## VERSE: Telling You a Story

The only real problem with SoundLister is a problem any web app that is delivered over a network has: if the network disappears, you can't get to the web app. This could happen if you were on a flight or driving through a low signal area or because all wireless towers and satellites blew up instantaneously. I don't know, man, crazy stuff happens sometimes!

However, there is a way to somewhat get around this: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

<aside class="right">
  I'd lightly used <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Workers</a> on my other project <a href="https://neb.host/apps/gemwarrior">Gem Warrior</a>, mainly to see if I could. The site <a href="https://github.com/michaelchadwick/gemwarrior-web/blob/master/assets/js/app/worker.js">caches some text files</a> representing your avatar's status (sitting, standing, etc.) and uses the Web Worker to do the grunt work. Of course, loading text files is <strong>not</strong> CPU-intensive at all, so a Web Worker was overkill, but it got my mind in the door.
</aside>

Service Workers act as a proxy, essentially doing a full cache of whatever you tell it to cache, and so in the future if your app requests files, like CSS or image or MP3, then it checks the cache first before going to the network. Thus, if you install and register one, you go from the initial "Web App Live From the Network" to a subsequent "Web App From the Cache", negating the need to re-download anything, and making your "web app" a "local app" for all intents and purposes. It's kind of magical!

The basic code needed is the `sw.js` file itself, which handles the event life cycle of the Service Worker itself, and a `navigator.serviceWorker.register` method that registers the Service Worker to do its thing.

```javascript
// app.js
const SL_SERVICE_WORKER_PATH = '/sw.js'

SoundLister.registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        SL_SERVICE_WORKER_PATH, {
          scope: '/',
        }
      )

      SoundLister._logStatus('Service Worker registered', registration)

      if (registration.installing) {
        SoundLister._logStatus('Service worker installing')
      } else if (registration.waiting) {
        SoundLister._logStatus('Service worker installed')
      } else if (registration.active) {
        SoundLister._logStatus('Service worker active')
      }
    } catch (error) {
      console.error('Service Worker failed to register', error)
    }
  }
}

// sw.js
const SL_CACHE_STATIC_KEY = 'soundlist-cache-static-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SL_CACHE_STATIC_KEY)
      .then((cache) => {
        const staticAssets = ['/', '/index.html', '/assets/css/app.css']
        return cache.addAll(staticAssets)
      })

      // ...we will come back to this part...

  )
})
```

What it is _not_ is necessarily intuitive to set up when you have both known static files **AND** a dynamic list of audio files that can change depending on the instance or day.

## CHORUS: The Part You Will Remember

PHP to the rescue!

That is to say that I was already using a PHP script to scan a directory and build a nice array of all the subdirs and their files so that I could use it build the playlist interface.

```php
<?php
// to echo out and return to JS for further processing
$files = array();

$iterator = new RecursiveIteratorIterator(
  new RecursiveDirectoryIterator(
    '../audio/',
    FilesystemIterator::SKIP_DOTS
  )
);

$curDir = '';

foreach ($iterator as $file) {
  if (in_array(strtolower($file->getExtension()), $exts)) {
    $path['basename'] = $file->getBasename();
    $path['filename'] = $file->pathname;

    // etc.

    $files[$dirIndex][] = $path;
  }
}

echo json_encode($files);
?>
```

Once it was returned to Javascript, one is left with a `const response = fetch(SL_PHP_SCRIPT)` call that then feeds into a `const data = response.json()` call that is then processed into the UI.

However, the Service Worker `install` method cannot have any arguments, so in order to load things dynamically into its cache when it is installed you need to have a manifest of sorts to tell it what to cache once you know. This, I had to do an extra step in my PHP script like so:

```php
<?php
// to echo out and return to JS for further processing
$files = array();
// to save to JSON for service worker manifest
// [
//   '/audio/subdir1/song1.mp3',
//   '/audio/subdir1/song2.mp3',
//   '/audio/subdir2/song1.mp3'
// ]
$filePaths = array();

$iterator = new RecursiveIteratorIterator(
  new RecursiveDirectoryIterator(
    '../audio',
    FilesystemIterator::SKIP_DOTS
  )
);

$curDir = '';

foreach ($iterator as $file) {
  if (in_array(strtolower($file->getExtension()), $exts)) {
    $path['basename'] = $file->getBasename();
    $path['filename'] = $file->pathname;

    // etc.

    $files[$dirIndex][] = $path;
    $filePaths[] = '../audio' . '/' . $path['subdirPath'] . '/' . $path['basename'];
  }
}

// for Service Worker
$jsonString = json_encode(
  $filePaths,
  JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
);
// make sure web server user has write access to the directory this is in!
$fp = fopen('../json/audio_manifest.json', 'w');
fwrite($fp, $jsonString);
fclose($fp);

// for immediate return to JS
echo json_encode($files);
?>
```

Two notes:

1. The `JSON_UNESCAPED_SLASHES` flag was necessary so PHP wouldn't write `\/audio\/subdir1\/song1.mp3` in its output, and the `JSON_PRETTY_PRINT` flag makes its output more human-readable (not necessary, but nice).
2. The comment about web server user access was important because I was just getting 500 errors from my script until I realized the group that owned it did not have the ability to create the `json` file I was asking it to create.

## BRIDGE: Slight Tangent for Variety

As much as I want anyone reading this to listen to _my_ music and fall in love with all of it and listen to it all the time and reach out to me about it, there are other people making music that is equally good (but really probably way more good), and you should check it out.

While writing this post I've been jamming out to Angine de Poitrine [Vol. 1](https://anginedepoitrine.bandcamp.com/album/vol-1) and [Vol. II](https://anginedepoitrine.bandcamp.com/album/vol-ii) and this stuff RULES SO HARD.

## CHORUS: The Part You Remembered

PHP to the rescue!

Not that saying 'PHP is cool' has ever been, well, _cool_, I'd still like to shout it out because when I need to drop to the _backend_ in order to do things frontend Javascript won't do I still default to PHP. Python is really popular, too, and it seems to be getting more popular as LLM and AI agent programming becomes the norm, but it's not in my gut like PHP.

My first ever real web app was your typical *AMP (Mac/Win/Linux, Apache, MySQL, PHP) type of project, and it really laid the groundwork for how I think to make a web application to this day. They released **8.5** back in November 2025 and 8.6 is already in development, so support remains strong even if it's not hip to use.

## OUTRO: Transition Out of Here

As a real test of this new Service Worker, I took a drive and loaded up SoundLister on my phone (with network on, obvs). Once it was done, I turned on Airplane Mode and refreshed the site. Lo and behold, it loaded and played audio like it was a local app with no need for network activity! It felt like real magic, honestly. There was a hiccup at one point where a track stopped playing out of nowhere, but a refresh of the site fixed things.

Since this blog post is so musically-themed, I will leave you with the outro of an actual song in the works:
<audio controls>
  <source src="/assets/audio/posts/undu-outro.mp3" type="audio/mpeg">
No &lt;audio&gt; support in your browser found.
</audio>
