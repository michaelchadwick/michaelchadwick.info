/* main */
/* app entry point and main functions */

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
  btn.innerHTML = THEME_DARK_TEXT
} else if (currentTheme == 'light') {
  bodyClasses.toggle('light-theme')
  btn.innerHTML = THEME_LIGHT_TEXT
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
  event.target.innerHTML = theme == 'light' ? THEME_LIGHT_TEXT : THEME_DARK_TEXT

  localStorage.setItem('mcinfo-theme', theme)
})

MCInfo.initApi = () => {
  // get external site data
  MCInfo.BG()
  MCInfo.CN()
  MCInfo.GH()
}

/************************************************************************
 * ON PAGE LOAD, DO THIS *
 ************************************************************************/

window.onload = MCInfo.initApi
