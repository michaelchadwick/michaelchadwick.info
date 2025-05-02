/* htg */
/* global MCInfo */

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
let bodyClasses = document.body.classList
bodyClasses.remove(['dark-theme', 'light-theme'])

// check system color theme first
if (prefersDarkScheme.matches) {
  bodyClasses.add('dark-theme')
  bodyClasses.remove('light-theme')
} else {
  bodyClasses.add('light-theme')
  bodyClasses.remove('dark-theme')
}

// external site checking for podcasts/htg page
if (['/podcasts/htg', '/podcasts/htg/'].includes(document.location.pathname)) {
  console.log('you have reached a fun internal page')
  MCInfo.SiteApi.PODBEAN('episodes')
}

document.getElementById('episode-filter-search').addEventListener('keyup', (e) => {
  const filter = e.target.value.trim().toLowerCase()
  const episodeRows = document.querySelectorAll('#episode-list ul li')

  if (filter.length > 0) {
    setTimeout(() => {
      for (let node of episodeRows) {
        node.classList.remove('hidden')
        if (!node.innerText.toLowerCase().includes(filter)) {
          node.classList.add('hidden')
        }
      }
    }, 250)
  } else {
    for (let node of episodeRows) {
      node.classList.remove('hidden')
    }
  }
})
