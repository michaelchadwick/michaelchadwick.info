/* htg */
/* global MCInfo */

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
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

// external site checking for podcasts/htg page
if (['/podcasts/htg', '/podcasts/htg/'].includes(document.location.pathname)) {
  console.log('you have reached a fun internal page')
  MCInfo.POD('episodes')
}
