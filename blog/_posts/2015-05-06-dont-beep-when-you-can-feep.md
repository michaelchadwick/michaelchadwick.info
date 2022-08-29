---

layout: post
title:  "Don't Beep When You Can Feep"
tags: audio cli beep feep ruby wav wavfile
excerpt: "Spending time at the command line, coding away at various things, sometimes I just want to make some noise. Of course, most of us turn to our MP3 collection or Spotify, but that wouldn't be nerdy enough nor would it involve programming, so I borne 'feep' into the world."

---

I've been interested in sound and audio for a long time now. Probably from the time I heard my first beep or click from a child's toy (can't be sure), my mind got hooked on these air fluctuations and how to make more of them. Once I got into playing guitar and messing around on computers and *patterned* air movements (i.e. music), this became a fully-realized obsession. Even with all of the complexity inherent in my musical endeavors, the simple things still feel good, and if I can make a simple Ruby gem that can beep at you, then by Thor's hammer I will!

**Ahem**.

<!--more-->

### Feeping Around

Spending time at the command line, coding away at various things, sometimes I just want to make some noise. Of course, most of us turn to our MP3 collection or Spotify, but that wouldn't be nerdy enough nor would it involve programming, so I borne [feep](https://rubygems.org/gems/feep) into the world.

Just to quickly explain the name, a "feep" is an archaic name given to the ["soft, electronic 'bell' sound"](https://dictionary.reference.com/browse/feep) of some old display terminals. I don't personally remember anyone calling the *ding/bing/boop/beep/ping/etc* sound of old pre-DOS computers a "feep", but 1) it's adorkably fun, and 2) the obvious "beep" is [already taken](https://github.com/johnath/beep).

### Wait, I've Heard This One Already

In today's day and age, the question "Is there something that already exists that does what my application sets out to do?" is almost 100% sure to be answered with "YES, MANY THINGS". And those many, many things are often open-source and on Github, rife for the rifling through and building from.

Searches across the Internet found several application that make sound, even in Ruby (the language I wanted to make **feep** in), but nothing I found (at the time) did *all* of the things I wanted, and that's when a programmer decides to make their own.

### How Make Sound

Name chosen and purpose decided upon, I set out to make a command line tool that could make sound with the following requirements (which increased as I went along):

1) Synthesize a sound from a simple waveform
2) Control the note/frequency, amplitude/volume, and duration
3) Play multiple notes at once in a chord
4) Play multiple notes in a row as a scale

One thing I quickly found was that to make a computer utter a simple "FEEP!" sound via CLI is not exactly intuitive, nor is it consistent across all operating systems. Here are just some of the examples I tried, but there are more:

* **Windows**: CTRL-G in a command line prompt to get a `^G` system code, then hit enter
  * Not intuitive and more of an unintended beep than anything.
* **Mac/OSX**: `osascript -e beep`
  * A little better, but still a bit wordy and unintuitive.
  * Macs can also use the `say "beep"` command, but that uses a synth voice and actually *says* the word "beep" and does not make a *beep* sound.
* ***nix**: `echo -e "\a"`
  * Basically the same as Mac.
* **Python**: `python -c "print '\7'"`
  * Similar to the Mac way, and just as unintuitive. Why would you think to "print" something when you want to *hear* something?
* **Ruby**: `puts 7.chr`
  * See the python explanation.

Despite most systems' insistence on *printing sounds*, I still felt like Ruby was the best way to approach the issue due to my recent interest in making fun little system applications, so I continued down that path.

My first big break was finding a nice Rubygem library called [`win32-sound`](https://rubyonwindows.blogspot.com/2007/05/adding-sound-to-your-ruby-apps.html) that lets you type something like `Sound.beep(100, 1000)` and get a tone at 100 Hz for 1000 milliseconds. Now we're getting somewhere! Alas, it does not work on non-Windows, so I had to dig deeper.

The biggest break came when I stumbled upon a nice person named Joel Strait. He does a lot of open-source applications with audio. The most useful to me were the [WavFile Rubygem library](https://wavefilegem.com) and his adaptation of it in [NanoSynth](https://www.joelstrait.com/blog/2014/6/14/nanosynth_create_sound_with_ruby). Honestly, it kind of changed my mind about the whole project. I now had a way to solve all the arcane command madness: use WAV files. Instantly cross-platform, consistent in quality, and (eventually) allowing for all kinds of interesting manipulation of the sound itself. Performance-wise and overhead-wise it's probably not the best, but so far it's worked fine.

My on-the-fly sound creation engine was ready to be started.

### Let There Be Feep

Finding NanoSynth was a boon to productivity, because it gave me a way to make a sound from a specific waveform, at a specific frequency, at a specific volume, for a specific duration. It was just a Ruby script, however, and not a Rubygem, so my initial idea to fork and improve it turned into my own project, which became **feep**. Once it was gem'd, which was an interesting experience in and of itself, I started to improve it all the ways that my requirements suggested.

NanoSynth created WAV files and, through an optional, additional application (like `afplay` or `sounder.exe`), played them, as a completely different step. I wanted to make it all happen in one fellow swoop, without leaving anything behind (by default). So, I have **feep** auto-play the WAV file (which still requires that additional application) once it's created, and then delete it, effectively making it a "sound producing" app, not a "sound file creating" app. This all hides the fact that an actual WAV file is being created as neatly as I can manage, since the WavFile Rubygem can't (yet) play its product without writing to the file system.

After getting the basic functionality working, I later had the idea of being able to play multiple notes in a scale. This was initially a separate gem, pulling in the original **feep** as a library (wanted to learn how that worked), but it was too much of a hassle and it just got absorbed as a feature. I'm sure there's a better way to access all possible musical notes besides a static list, but I can't think of what it would be (if you know, let me know!):

{% highlight ruby linenos %}
NOTES = Array[
  'C0','C#0','D0','D#0','E0','F0','F#0','G0','G#0','A0','A#0','B0',
  'C1','C#1','D1','D#1','E1','F1','F#1','G1','G#1','A1','A#1','B1',
  'C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2',
  'C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3',
  'C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4',
  'C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5',
  'C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6',
  'C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7','A7','A#7','B7',
  'C8','C#8','D8','D#8','E8','F8','F#8','G8','G#8','A8','A#8','B8',
  'C9','C#9','D9','D#9','E9','F9','F#9','G9','G#9','A9','A#9','B9'
]
NOTES_ALT = Array[
  'C0','Db0','D0','Eb0','E0','F0','Gb0','G0','Ab0','A0','Bb0','B0',
  'C1','Db1','D1','Eb1','E1','F1','Gb1','G1','Ab1','A1','Bb1','B1',
  'C2','Db2','D2','Eb2','E2','F2','Gb2','G2','Ab2','A2','Bb2','B2',
  'C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3',
  'C4','Db4','D4','Eb4','E4','F4','Gb4','G4','Ab4','A4','Bb4','B4',
  'C5','Db5','D5','Eb5','E5','F5','Gb5','G5','Ab5','A5','Bb5','B5',
  'C6','Db6','D6','Eb6','E6','F6','Gb6','G6','Ab6','A6','Bb6','B6',
  'C7','Db7','D7','Eb7','E7','F7','Gb7','G7','Ab7','A7','Bb7','B7',
  'C8','Db8','D8','Eb8','E8','F8','Gb8','G8','Ab8','A8','Bb8','B8',
  'C9','Db9','D9','Eb9','E9','F9','Gb9','G9','Ab9','A9','Bb9','B9'
]
{% endhighlight %}

### Alls Well That Feeps Well

In the end, after a lot of trial and error, and help from the Internet (natch), I got a Rubygem created and [added to Rubygems.org](https://rubygems.org/gems/feep)! Now, when I want a simple *feep* sound on my computer, I can go to a command prompt, type `feep`, and I get a nice sine wave at 440Hz, 1/2 system volume, for 100 ms. If I want something cooler, I type `feep -n A#3,B3,D#4,A#4,C#5,A#6 -d 1500 -a 0.25 -w saw` for a nice jazzy chord block.

You can just play around with this for fun, or you could essentially use it for any kind of audio-related need you have in your current project, be it an alarm, warning, art installation, or game sound effect.

Also, feel free to [fork it and improve it](https://github.com/michaelchadwick/feep), as I know it's not as good as it could be (doesn't even have any tests yet). However, it's totally useable even now, so go forth and feep, OK?
