const words = document.querySelectorAll('.click-to-talk')

if (words) {
  words.forEach((word) => word.addEventListener('click', (event) => {
    event.preventDefault()

    if (window.speechSynthesis) {
      const synth = window.speechSynthesis
      const lang = event.target.dataset.lang
      const text = event.target.innerText
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.lang = lang
      utterThis.volume = 0.5
      synth.speak(utterThis)
    }
  }))
}

const note = document.querySelector('.musical-tone')

if (note) {
  note.addEventListener('click', (event) => {
    event.preventDefault()

    const audioContext = new AudioContext()
    const masterGainNode = audioContext.createGain()
    masterGainNode.gain.value = 0.0001

    const FREQS = [220, 440, 660, 880]
    const TYPES = ['sine', 'square', 'triangle', 'saw']

    const oscNode = audioContext.createOscillator()
    oscNode.type = TYPES[Math.floor(Math.random() * 3)]
    oscNode.frequency.value = FREQS[Math.floor(Math.random() * 3)]

    oscNode.connect(masterGainNode)
    masterGainNode.connect(audioContext.destination)

    oscNode.start(audioContext.currentTime)
    masterGainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.2)

    masterGainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.1)
    oscNode.stop(audioContext.currentTime + 1.1)
  })
}
