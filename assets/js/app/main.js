/* main */
/* app entry point and main functions */
/* global MCInfo */
/* eslint-disable no-undef */

let theme = 'light'

// find links and change their <li> background to be their favicon
const faviconLinks = document.querySelectorAll('ul.links li.dynamic a.favicon')

faviconLinks.forEach(f => {
  const parentStyle = f.parentElement.style
  const hostname = f.href

  let iconSize = 16
  let url = ''

  // exceptions
  if (hostname == 'https://nebyoolae.newgrounds.com/') {
    url = 'https://www.newgrounds.com/img/icons/favicon.png'
  } else if (hostname == 'https://fenchy.bandcamp.com/album/just-a-waste-ep') {
    url = '/assets/images/fenchy-jaw-ep-icon.jpg'
  } else if(hostname.endsWith('/blog')) {
    url = '/assets/images/mc-logo-icon.png'
  } else {
    url = `https://www.google.com/s2/favicons?domain=${hostname}&sz=${iconSize}`
  }

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

const themeToggler = document.querySelector('#theme-toggler')
const imgThemeToggler = document.querySelector('#theme-toggler span.theme-image')
const lblThemeToggler = document.querySelector('#theme-toggler span.theme-label')
const headerScrolled = document.querySelector('header.header-scrolled')
const bodyClasses = document.body.classList
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const currentTheme = localStorage.getItem('mcinfo-theme')

if (themeToggler) {
  if (currentTheme == 'dark') {
    bodyClasses.toggle('dark-theme')

    imgThemeToggler.innerHTML = '🌙'
  } else {
    bodyClasses.toggle('light-theme')

    imgThemeToggler.innerHTML = '☀️'
  }
}

let lastKnownScrollPosition = 0
let ticking = false

MCInfo.handleResize = () => {
  if (headerScrolled) {
    const width = document.body.clientWidth

    if (width >= 550 && lastKnownScrollPosition <= 200) {
      headerScrolled.classList.remove('show')
    }

    headerScrolled.style.width = `${window.innerWidth}px`
  }
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
  themeToggler.addEventListener('click', function() {
    bodyClasses.toggle('dark-theme')
    bodyClasses.toggle('light-theme')

    theme = bodyClasses.contains('light-theme') ? 'light' : 'dark'

    // update text inside toggler
    imgThemeToggler.innerHTML = theme == 'light' ? '☀️' : '🌙'

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
    MCInfo.BLOG(),
    MCInfo.POD()
  }

  const projectUrls = ['/projects', '/projects/']

  if (projectUrls.includes(document.location.pathname)) {
    // get external site data
    MCInfo.BGG()
    MCInfo.BLOG()
    MCInfo.GH(),
    MCInfo.POD(),
    MCInfo.RG(),
    MCInfo.STEAM()
  }

  MCInfo.handleScroll()
  MCInfo.handleResize()

  if (prefersDarkScheme.matches) {
    bodyClasses.add('dark-theme')
    bodyClasses.remove('light-theme')
    imgThemeToggler.innerHTML = '🌙'
  }
}

/************************************************************************
 * ON PAGE LOAD, DO THIS *
 ************************************************************************/

window.onload = MCInfo.initApi
