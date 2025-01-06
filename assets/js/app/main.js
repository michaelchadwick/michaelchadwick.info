/* main */
/* app entry point and main functions */
/* global MCInfo */
/* eslint-disable no-undef */

let theme = 'light'

// find links and change their <li> background to be their favicon
const faviconLinks = document.querySelectorAll('ul.links li.dynamic a.favicon')

faviconLinks.forEach((f) => {
  const parentStyle = f.parentElement.style
  const hostname = f.href

  let iconSize = f.dataset.size ?? 16
  let url = ''

  // exceptions
  if (hostname.endsWith('/blog')) {
    url = '/assets/images/mc-icon.png'
  } else {
    switch (hostname) {
      case 'https://nebyoolae.itch.io/': {
        url = '/assets/images/itchio-icon.png'
        break
      }
      case 'https://nebyoolae.newgrounds.com/': {
        url = '/assets/images/newgrounds-icon.png'
        break
      }
      case 'https://fenchy.bandcamp.com/': {
        url = '/assets/images/fenchy-icon.jpg'
        break
      }
      case 'https://flylikevenus.bandcamp.com/': {
        url = '/assets/images/flv-icon.jpg'
        break
      }
      case 'https://rustycrab.bandcamp.com/': {
        url = '/assets/images/rustycrab-icon.jpg'
        break
      }
      default: {
        url = `https://www.google.com/s2/favicons?domain=${hostname}&sz=${iconSize}`
        break
      }
    }
  }

  parentStyle.listStyleImage = `url(${url})`
})

const indentedLists = document.querySelectorAll('ul.links li ul li')

indentedLists.forEach((li) => {
  if (li.style.listStyleImage) {
    if (li.style.listStyleImage.indexOf('http')) {
      li.classList.add('blank')
    }
  }
})

const unpubIndicator = document.querySelector('#unpub-indicator')
const envIndicator = document.querySelector('#env-indicator')

if (unpubIndicator) {
  unpubIndicator.style.display = 'flex'
}
if (envIndicator) {
  envIndicator.style.display = 'flex'
}

const envLinker = document.querySelector('.env-indicator-dev')
const themeToggler = document.querySelector('#theme-toggler')
const imgThemeToggler = document.querySelector('#theme-toggler span.theme-image')
const lblThemeToggler = document.querySelector('#theme-toggler span.theme-label')
const headerScrolled = document.querySelector('header.header-scrolled')
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const savedTheme = localStorage.getItem('mcinfo-theme')

let bodyClasses = document.body.classList
bodyClasses.remove(['dark-theme', 'light-theme'])

// check system color theme first
if (prefersDarkScheme.matches) {
  bodyClasses.add('dark-theme')
  bodyClasses.remove('light-theme')
  imgThemeToggler.innerHTML = '🌙'
} else {
  bodyClasses.add('light-theme')
  bodyClasses.remove('dark-theme')
  imgThemeToggler.innerHTML = '☀️'
}

// then check theme toggler
if (themeToggler) {
  themeToggler.style.display = 'inline-block'
  if (savedTheme == 'dark') {
    bodyClasses.add('dark-theme')
    bodyClasses.remove('light-theme')
    imgThemeToggler.innerHTML = '🌙'
  } else {
    bodyClasses.add('light-theme')
    bodyClasses.remove('dark-theme')
    imgThemeToggler.innerHTML = '☀️'
  }
}

let lastKnownScrollPosition = 0
let ticking = false

MCInfo.addEventHandlers = () => {
  if (envLinker) {
    envLinker.addEventListener('mouseover', function (event) {
      event.target.innerText = 'PROD'
    })
    envLinker.addEventListener('mouseout', function (event) {
      event.target.innerText = 'DEV'
    })
    envLinker.addEventListener('click', function (event) {
      window.open('https://michaelchadwick.info', '_blank')
    })
  }
  themeToggler.addEventListener('click', function () {
    bodyClasses.toggle('dark-theme')
    bodyClasses.toggle('light-theme')

    theme = bodyClasses.contains('light-theme') ? 'light' : 'dark'

    // update text inside toggler
    imgThemeToggler.innerHTML = theme == 'light' ? '☀️' : '🌙'

    localStorage.setItem('mcinfo-theme', theme)
  })

  window.onresize = MCInfo._handleResize
  window.onscroll = MCInfo._handleScroll
}

MCInfo.initApi = () => {
  // adjust <title> for env
  if (MCInfo.env == 'local') {
    if (!document.title.includes('(LH) ')) {
      document.title = '(LH) ' + document.title
    }
  }

  MCInfo.addEventHandlers()

  // external site checking for homepage
  if (document.location.pathname == '/') {
    // get external site data
    MCInfo.SiteApi.BLOG()
    MCInfo.SiteApi.PODBEAN()
  }

  // external site checking for projects page
  if (['/projects', '/projects/'].includes(document.location.pathname)) {
    // get external site data
    // TODO
    // MCInfo.SiteApi.AOC()
    MCInfo.SiteApi.BGG()
    MCInfo.SiteApi.BLOG()
    // pinned repo service in flux, so turning off for now
    // MCInfo.SiteApi.GH()
    MCInfo.SiteApi.PODBEAN()
    MCInfo.SiteApi.RUBYGEMS()
    MCInfo.SiteApi.STEAM()
  }

  MCInfo._handleScroll()
  MCInfo._handleResize()
  MCInfo._handleVisibility()
}

/************************************************************************
 * private methods
 ************************************************************************/

MCInfo._handleVisibility = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  })

  const key = params.unpublished

  if (key) {
    const unlockAttempt = await MCInfo.BLOG_PRIV(key)
    const isUnlocked = unlockAttempt.isUnlocked

    MCInfo.showUnpublished = isUnlocked ? true : false

    if (MCInfo.showUnpublished) {
      const blogIndexUnpubPosts = document.querySelectorAll('.post-row.unpublished')
      const blogIndexNavLinks = document.querySelectorAll('.pagination a')
      const blogIndexPostLinks = document.querySelectorAll('.post-link')
      const blogPostNavLinks = document.querySelectorAll('.post .post-nav a')
      const blogLinks = document.querySelectorAll('span.blog a')

      if (blogIndexUnpubPosts.length) {
        blogIndexUnpubPosts.forEach((p) => (p.style.display = 'block'))
      }

      if (blogIndexNavLinks.length) {
        blogIndexNavLinks.forEach((link) => (link.href += `?unpublished=${key}`))
      }

      if (blogIndexPostLinks.length) {
        blogIndexPostLinks.forEach((link) => (link.href += `?unpublished=${key}`))
      }

      if (blogPostNavLinks.length) {
        blogPostNavLinks.forEach((link) => (link.href += `?unpublished=${key}`))
      }

      if (blogLinks.length) {
        blogLinks.forEach((link) => (link.href += `?unpublished=${key}`))
      }
    }
  }
}

MCInfo._handleResize = () => {
  if (headerScrolled) {
    const width = document.body.clientWidth

    if (width >= 550 && lastKnownScrollPosition <= 200) {
      headerScrolled.classList.remove('show')
    }

    headerScrolled.style.width = `${window.innerWidth}px`
  }
}

MCInfo._handleScroll = () => {
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

/************************************************************************
 * ON PAGE LOAD, DO THIS *
 ************************************************************************/

window.onload = MCInfo.initApi
