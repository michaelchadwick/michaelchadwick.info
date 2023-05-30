const note = document.querySelector('.musical-tone')

if (note) {
  note.addEventListener('click', (e) => {
    e.preventDefault()

    const audioContext = new AudioContext()
    const masterGainNode = audioContext.createGain()
    masterGainNode.gain.value = 0.0001

    const FREQS = [220, 440, 880]
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
