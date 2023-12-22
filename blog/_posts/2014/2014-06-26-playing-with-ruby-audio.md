---

layout: post
title:  "Playing with Ruby Audio"
tags: ruby audio ruby-audio

---
I've got a bunch of albums on [Bandcamp](https://nebyoolae.bandcamp.com). They're generally anywhere from 20-50 minutes long. Sometimes, you just want to test out something and not try to take in the whole enchilada in one sitting, so I decided a while ago to start making "samplers" that are ~2 minutes long and provide a kind of appetizer mashup option.

This is kind of tedious, so what else but code could come to the rescue!

<!--more-->

Ruby is a swell language to do stuff like this in, so naturally I hunted around the net to see if there was some kind of library or gem that made interfacing with audio files easier.

Lo! There is [ruby-audio](https://github.com/warhammerkid/ruby-audio) (of course).

I've not done much digital audio file manipulation, so I'm starting small and simple. First, I created something that reads in a WAV file and exports a bunch of its information, just to make sure we got something going here.

{% highlight ruby linenos %}
def display_sound_info(file)
  snd = Sound.open(file)
  lenSecs = (snd.info.length).round(2)
  lenMins = (lenSecs / 60).round(2)
  puts "Filename: #{file}"
  puts "Channels: #{snd.info.channels}"
  puts "Frames: #{snd.info.frames}"
  puts "Length: #{lenMins} mins (#{lenSecs} secs)"
  puts "Sample Rate: #{snd.info.samplerate}"
  puts "Seekable? #{snd.info.seekable}"
  snd.close
end
{% endhighlight %}

Next, I decided I should actually try to read in a file and then write it back out, only in a shorter, snippet-ier format.

{% highlight ruby linenos %}
def create_snippet(file)
  SNIP_LENGTH = 15

  sndorig_comp = file
  sndorig_extn = File.extname sndorig_comp
  # grab the base filename for later
  sndorig_name = File.basename sndorig_comp, sndorig_extn

  Sound.open(sndorig_comp) do |snd|
    info = snd.info
    sndlen = info.length

    # grab a random starting point in the file
    snip_time_begin = rand(0..sndlen)

    # correct if the beginning point is in the last 15 seconds of the file
    if snip_time_begin.between?((sndlen-15),sndlen)
      snip_time_begin = snip_time_begin-15
    end

    # create a buffer as big as the snippet
    bytes_to_read = (info.samplerate * SNIP_LENGTH).to_i
    buf = Buffer.new("float", bytes_to_read, info.channels)

    # seek to where the snippet begins and grab the audio
    snd.seek(info.samplerate * snip_time_begin)
    snd.read(buf, bytes_to_read)

    # create new file's name from original
    sndsnip_name = sndorig_name + "_snippet.wav"

    # write the new snippet to a file
    out = Sound.open(sndsnip_name, "w", info.clone)
    out.write(buf)

    puts "#{sndsnip_name} created." if out
  end
end
{% endhighlight %}

It took me a bit of trial and error (and plenty of doc-reading, and googling) to get the new file to actually be a subset of the original, and to start where I wanted it to, but it works! The algorithm just chooses a random 15 second chunk of the original, which may not always work aesthetically, but does a decent job of what I want.

Tying the second bit of code into a loop that works on multiple files and then mashes them together shouldn't be *too* difficult, but I'm sure I'll need to massage it a bit. Of course, this doesn't make any transitions between pieces, so I need to now learn how to change volume and create fade ins and outs (and crossfades, too, if possible).

As usual, the amount of time it's taken me to get to this point far exceeds the length of time I'd spend doing it manually, but it fascinates me to see if code can accomplish the task, regardless. Once I get it working, future album samplers will be easy to make, and that's what coding is all about :)
