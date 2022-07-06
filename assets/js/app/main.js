// find links and change their <li> background to be their favicon
const favicons = document.querySelectorAll('ul.links li a.favicon[href^="http"]')

favicons.forEach(f => {
  const parentStyle = f.parentElement.style
  const hostname = f.hostname

  parentStyle.listStyleImage = `url('https://www.google.com/s2/favicons?domain=${hostname}')`
})

const btn = document.getElementById('theme-toggler')
const bodyClasses = document.body.classList
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const currentTheme = localStorage.getItem('mcinfo-theme')

if (currentTheme == 'dark') {
  bodyClasses.toggle('dark-theme')
  btn.innerHTML = 'dark'
} else if (currentTheme == 'light') {
  bodyClasses.toggle('light-theme')
  btn.innerHTML = 'light'
}

let theme = ''

// Listen for a click on the button
btn.addEventListener('click', function(event) {
  if (prefersDarkScheme.matches) {
    bodyClasses.toggle('light-theme')
    theme = bodyClasses.contains('light-theme') ? 'light' : 'dark'
  } else {
    bodyClasses.toggle('dark-theme')
    theme = bodyClasses.contains('dark-theme') ? 'dark' : 'light'
  }

  // update text inside toggler
  event.target.innerHTML = theme

  localStorage.setItem('mcinfo-theme', theme)
})

MCInfo.initApi = function() {
  MCInfo.BG()
  MCInfo.CN()
  MCInfo.GH()
}

window.onload = MCInfo.initApi