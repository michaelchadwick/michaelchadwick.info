/* main */
/* app entry point and main functions */
/* global MCInfo */

let theme = 'light'

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

const btnThemeToggler = document.getElementById('theme-toggler')
// const headerTop = document.querySelector('header.header-top')
const headerScrolled = document.querySelector('header.header-scrolled')
const bodyClasses = document.body.classList
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const currentTheme = localStorage.getItem('mcinfo-theme')

if (currentTheme == 'dark') {
  bodyClasses.toggle('dark-theme')

  btnThemeToggler.innerHTML = '🌙'
} else if (currentTheme == 'light') {
  bodyClasses.toggle('light-theme')

  btnThemeToggler.innerHTML = '☀️'
}

let lastKnownScrollPosition = 0
let ticking = false

MCInfo.handleResize = () => {
  const width = document.body.clientWidth

  if (width >= 550 && lastKnownScrollPosition <= 200) {
    headerScrolled.classList.remove('show')
  }

  headerScrolled.style.width = `${window.innerWidth}px`
}

MCInfo.handleScroll = () => {
  lastKnownScrollPosition = window.scrollY

  if (document.body.clientWidth >= 550) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#examples
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastKnownScrollPosition > 200) {
          headerScrolled.classList.add('show')
        } else {
          headerScrolled.classList.remove('show')
        }

        ticking = false
      })

      ticking = true
    }
  }
}

MCInfo.addEventHandlers = () => {
  btnThemeToggler.addEventListener('click', function(event) {
    bodyClasses.toggle('dark-theme')
    bodyClasses.toggle('light-theme')

    theme = bodyClasses.contains('light-theme') ? 'light' : 'dark'

    // update text inside toggler
    event.target.innerHTML = theme == 'light' ? '☀️' : '🌙'

    localStorage.setItem('mcinfo-theme', theme)
  })

  window.onresize = MCInfo.handleResize
  window.onscroll = MCInfo.handleScroll
}

MCInfo.initApi = () => {
  // set env
  MCInfo.env = MCINFO_PROD_URL.includes(document.location.hostname) ? 'prod' : 'local'

  // adjust <title> for env
  if (MCInfo.env == 'local') {
    document.title = '(LH) ' + document.title
  }

  MCInfo.addEventHandlers()

  if (document.location.pathname == '/') {
    // get external site data
    MCInfo.BG()
    MCInfo.BLOG()
    MCInfo.GH()
  }

  MCInfo.handleScroll()
  MCInfo.handleResize()

  if (prefersDarkScheme.matches) {
    bodyClasses.add('dark-theme')
    bodyClasses.remove('light-theme')
    btnThemeToggler.innerHTML = '🌙'
  }
}

/************************************************************************
 * ON PAGE LOAD, DO THIS *
 ************************************************************************/

window.onload = MCInfo.initApi
