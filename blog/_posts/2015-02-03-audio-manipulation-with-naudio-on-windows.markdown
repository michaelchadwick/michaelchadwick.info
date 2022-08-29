---

layout: post
title:  "Audio Manipulation with NAudio on Windows"
tags: windows windows7 naudio audio application audiohash wav

---

After much frustration with some low-level audio manipulation in Javascript, I decided to change gears and make my first Windows Form application using Visual Studio 2010 and a great 3rd-party audio library. Yes, it's really 2015; I'm just behind. In this, I have gotten further in my goal of gluing disparate audio files into a single one. Which is pretty great.

<!--more-->

### A Great Audio Manipulation Library is Sometimes Needed

The general makeup of [Audio Hash on the web](https://github.com/michaelchadwick/audiohash-web) carried over fairly easily to a [Windows Form app](https://github.com/michaelchadwick/audiohash-win), in that getting the UI to do what I wanted for basic things, like loading audio files and playing them, was not an issue. However, the task of writing out a WAV file in code is still an issue. Thankfully, there's a great 3rd-party library called [NAudio](https://naudio.codeplex.com) that does all the heavy lifting.

NAudio is not really necessary to just load a file and play its data to your speakers, but when it comes to reading multiple files and writing their composite data out to a new file, it was the only way I could get what I wanted to work. And, in fact, I was able to get the basic idea of my app working. Thus, you can now queue up a bunch of files, choose an _n_-second chunk, of them, and glue that all together into a new file ("sampler").

### Some Code, To Illustrate

Here's some code!

{% highlight csharp linenos %}
...
foreach (string sourceFile in sourceFiles)
{
  using (WaveFileReader reader = new WaveFileReader(sourceFile))
  {
    if (writer == null)
    {
      writer = new WaveFileWriter(outputFile, reader.WaveFormat);
    }
    else
    {
      if (!reader.WaveFormat.Equals(writer.WaveFormat))
      {
        throw new InvalidOperationException("Can't concatenate WAV Files that don't share the same format");
      }
    }

    int soundLen = (int)reader.TotalTime.TotalMilliseconds;

    sampleLen = Math.Min(sampleLen, soundLen);

    TimeSpan sampleStartPos = new TimeSpan(0, 0, 0, 0, 0);
    TimeSpan sampleDuration = new TimeSpan(0, 0, 0, 0, soundLen);

    if (sampleLen > 0)
    {
      sampleStartPos = GenRandomStart(soundLen);
      sampleDuration = new TimeSpan(0, 0, 0, 0, (int)sampleLen);
    }

    boolAudioFileWrittenSuccessfully = WriteAudioFileToDisk(reader, writer, sourceFile, outputFile, sampleStartPos, sampleDuration);
  }
}
...
{% endhighlight %}

To break this down a little, we're iterating through all audio files loaded by the GUI, grabbing a chunk from each, and writing all that in sequential order to a single output audio file. The `GenRandomStart()` function uses the length of the sample chunk to find a random starting point in the file to begin grabbing from.

Now, let's go into the `WriteAudioFileToDisk()` function:

{% highlight csharp linenos %}
...
while (reader.Position < endPos)
{
  int bytesRequired = (int)(endPos - reader.Position);
  if (bytesRequired > 0)
  {
    int bytesToRead = Math.Min(bytesRequired, buffer.Length);
    int bytesRead = reader.Read(buffer, 0, bytesToRead);
    if (bytesRead > 0)
    {
      writer.Write(buffer, 0, bytesRead);
    }
  }
}
...
{% endhighlight %}

I'm cutting out a bunch of code, but the meat of it all is this: as long as the audio file reader hasn't reached the `endPos`, or the position in the file that's been designated as the stopping point (i.e. end of the random sampled chunk), check to see how many more bytes need to be read (as long as it doesn't exceed the sound's length) and write that to our output WAV file.

One bug I've already gotta squash is the one where the random chunk starts after a point where the length of it will be reached (e.g. an audio file is 10 seconds long; the random chunk is 5 seconds long; the random chunk got chosen to start at second 8, meaning we're only getting a 2 second chunk). However, we still got a working model, overall.

Of course, this doesn't do any kind of fancy anything, like fading in and out at the extremes of our output file, nor cross-fading between audio files. It's all very start and stop. I think I'm going to have to delve deeper into how I'm reading/playing the files to solve that one.

### For the Road

The original purpose for this tool, which was to make album samplers from a few of their tracks, got done well before I made any real progress. A human being is a lot better at picking the best dynamic moments of a track to combine together (and a lot faster). I still would like to try to make this tool better (and make it work on the web), so I'll keep at it and blog any results I come about.

Check out the [entire source code](https://github.com/michaelchadwick/audiohash-win).
