const note = document.querySelector('.musical-note')

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

const chord = document.querySelector('.musical-chord')

if (chord) {
  chord.addEventListener('click', (event) => {
    event.preventDefault()

    const audioContext = new AudioContext()
    const masterGainNode = audioContext.createGain()
    masterGainNode.gain.value = 0.0001

    const FREQS = event.target.dataset.notes.split(',').map((f) => f * 2)
    const TYPES = ['sine', 'square', 'triangle', 'saw']

    FREQS.forEach((freq) => {
      const oscNode = audioContext.createOscillator()
      oscNode.type = TYPES[Math.floor(Math.random() * 3)]
      oscNode.frequency.value = freq

      oscNode.connect(masterGainNode)
      masterGainNode.connect(audioContext.destination)

      oscNode.start(audioContext.currentTime)
      masterGainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.2)

      masterGainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.5)
      oscNode.stop(audioContext.currentTime + 1.5)
    })

  })
}