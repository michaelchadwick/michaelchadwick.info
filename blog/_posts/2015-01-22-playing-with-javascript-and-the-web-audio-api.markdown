---

layout: post
title:  "Playing with Javascript and the Web Audio API"
tags: webdev audio html5 javascript audiohash

---

While working on a tool in Ruby to make sampler tracks out of several album components, I realized I did not yet know enough about how to manipulate audio to do what I wanted. I needed to approach it from a different vantage point, and a different language altogether. So, I decided to see what the state of audio on the web was, having not done much beyond hosting and downloading MP3s years ago.

_**Spoiler**: it's pretty frickin' cool now, guys._

<!--more-->

### The Truth

_**Further Spoiler**: I haven't quite got everything I need figured out, uh, figured out yet._

My initial aim was to create a web app that could take random chunks of multiple audio files and combine them into a single, longer file, making a "sampler" of sorts. I even have a name: **Audio Hash**. Unfortunately, I've run into some issues in the low-level audio manipulation that's kept it in a non-working state for a while. However, I've learned a bunch and the Web Audio API can do some neat things.

### As Easy as Code

For example, with about a dozen lines of Javascript you can load up an audio file and play it (eschewing any kind of error checking, obv), but then do many other things to it that a simple `<audio src="audio.mp3" />` can't do.

{% highlight javascript %}
var audioContext = new ( window.AudioContext || window.webkitAudioContext )();
var audioBuffer;
var bufferSource = audioContext.createBufferSource();
var req = new XMLHttpRequest();
req.open("GET", "audio.mp3", true); // grab our audio file
req.responseType = "arraybuffer";   // needs to be specific type to work
req.onload = function() {
    audioContext.decodeAudioData(req.response, function(buf) {
        bufferSource.buffer = buf;  // load the audio buffer data
        bufferSource.connect(audioContext.destination);
        bufferSource.start(0);      // play the file (from the beginning)
    });
};
req.send();
{% endhighlight %}

You could also use a `<input type="file" />` control to upload the audio into a usable state, if you desired.

Now, add a button to stop the <s>rain</s>audio.

{% highlight html %}
<button id='stopAudio'>Stop Audio</button>
<script>
    document.getElementById('stopAudio').addEventListener('click', function() {
        bufferSource.stop();
    });
</script>
{% endhighlight %}

For a much more thorough explanation, check out Josh On Design's [Deep Dive into Web Audio](https://joshondesign.com/p/books/canvasdeepdive/chapter12.html), which I've cribbed/paraphrased a bit above to give you the simplest example.

With another couple lines, you can route that audio file through a *gain node* to change its volume.

{% highlight javascript %}
var gainNode = audioContext.createGain();   // make a new gainNode
gainNode.gain.value = 0.3;                  // set the volume
bufferSource.connect(gainNode);             // connect sound to gain
gainNode.connect(audioContext.destination); // reconnect gain to dest
{% endhighlight %}

There are a bunch of other kinds of *nodes* for effects (visual ones, as well), and CreativeJS has a great article on [all of them](https://creativejs.com/resources/web-audio-api-getting-started).

### Down the Audio Hole

As you can see, this can be pretty flexible and awesome if you want to get into the nitty-gritty of audio, rather than just playing a song in an embed. For Audio Hash, I needed to be able to actually *create* audio, not just play it, so I had to **go deeper**. This means I've been staring at code like the following for a bit, poring over why it doesn't do what I want it to do (yet).

{% highlight javascript %}
function _encodeWavFile(samples, sampleRate) {
    var buffer = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buffer);

    // RIFF identifier
    _writeString(view, 0, 'RIFF');
    // file length
    view.setUint32(4, 36 + samples.length * 2, true);
    // RIFF type
    _writeString(view, 8, 'WAVE');
    // format chunk identifier
    _writeString(view, 12, 'fmt ');
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, 2, true);
    // sample rate
    view.setUint32(24, sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * 4, true);
    // block align (channels * bytes/sample)
    view.setUint16(32, 4, true);
    // bits/sample
    view.setUint16(34, 16, true);
    // data chunk identifier
    _writeString(view, 36, 'data');
    // data chunk length
    view.setUint32(40, samples.length * 2, true);
    // write the PCM samples
    _writePCMSamples(view, 44, samples);

    return view;
}
{% endhighlight %}

I've even gone as far as finding someone who figured out the code to put the raw audio data as HEX into an HTML div. Both exercises are about as low-level as I've gotten in the development world, and it feels cool, if overwhelming. Regardless, the exported audio files I've been creating are too short and completely silent, so it's currently a failure for now. I'll most likely end up using some kind of existing audio library, as I don't *need* to write bytes from scratch, but I wanted to try my hand at low-level audio futzing to see how it worked.

### For the Road

Despite not succeeding at making the tool I envisioned, I've made progress and spent some time on the UI and getting a modular system to load sounds on a page, so check out [Audio Hash on Github](https://github.com/michaelchadwick/audiohash-web) if you want to root around in the source.

I later experimented with a custom Windows app (and third-party audio library ;P) after much frustration with the web app version, and I've gotten a lot farther, but I'm not done getting it to work on the web just yet. More on all that in a later post.
