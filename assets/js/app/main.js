// find links and change their <li> background to be their favicon
const faviconLinks = document.querySelectorAll('ul.links li.dynamic a.favicon[href^="http"]')

faviconLinks.forEach(f => {
  const parentStyle = f.parentElement.style
  const hostname = f.href

  let iconSize = 16

  // if (hostname == 'https://nebyoolae.itch.io/') {
  //   iconSize = 32
  // }

  let url = `https://www.google.com/s2/favicons?domain=${hostname}&sz=${iconSize}`

  parentStyle.listStyleImage = `url(${url})`
})

const indentedLists = document.querySelectorAll('ul.links li ul li')

indentedLists.forEach(li => {
  if (li.style.listStyleImage) {
    if (li.style.listStyleImage.indexOf('http')) {
      li.classList.add('blank')
    }
  }
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