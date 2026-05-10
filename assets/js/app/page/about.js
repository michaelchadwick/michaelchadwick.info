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
