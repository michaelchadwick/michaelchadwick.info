// BOARDGAMEGEEK
MCInfo.BGG = function() {
  const bggLastGamePlayed = document.querySelector('.bggLastGamePlayed')
  const bggApiData = document.querySelector('.apiData.bgg')

  fetch(BGG_API_URL, {
    method: 'GET',
    mode: 'cors'
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get bgg data')
    }

    return response.text()
  }).then(data => {
    const xml = new DOMParser().parseFromString(data, 'text/xml')
    const plays = _xml2json(xml).plays.play[0]
    const lastPlay = plays['@attributes']
    const lastPlayItem = plays['item']['@attributes']

    const name = lastPlayItem['name']
    const id = lastPlayItem['objectid']
    const date = lastPlay['date']

    if (name && id && date) {
      bggLastGamePlayed.innerHTML = `Latest game: ${date}<br />`
      bggLastGamePlayed.innerHTML += `<a href='https://boardgamegeek.com/boardgame/${id}'>${name}</a>`
    } else {
      console.error('bgg api error')
    }

    if (bggApiData.style.display !== 'block') {
      bggApiData.style.display = 'block'
    }
  })
}

// BLOG
MCInfo.BLOG = function() {
  const devblog = document.querySelector('.mcinfoBlog')
  const devblogApi = document.querySelector('.apiData.devblog')

  fetch(MCINFO_API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get devblog data')
      }

      return response.json()
    }).then(data => {
      const entries = data.entries
      const post = entries[entries.length-1]
      const postTitle = post.title
      const postUrl = `${post.url}`

      let postDate = post.url.substr(6,10)
      postDate = _replaceAll(postDate, '/', '-')

      devblog.innerHTML = `<span>Latest post: ${postDate}<br />`
      devblog.innerHTML += `<a href="${postUrl}">${postTitle}</a></span>`

      if (devblogApi.style.display !== 'block') {
        devblogApi.style.display = 'block'
      }
    })
}

// GITHUB
MCInfo.GH = async function() {
  // pinned projects
  const ghPinnedProjects = await fetch(
    `${GH_PINNED_API}${GH_USER}`)
    .then(response => response.json())

  if (ghPinnedProjects) {
    const ghInfo = document.querySelector('.ghInfo')
    const ghApiData = document.querySelector('.apiData.devgit')

    let str = `<span>Pinned projects:</span> `

    let projects = []

    ghPinnedProjects.forEach(item => {
      const url = item.link
      const repo = item.repo

      projects.push(`<a href='${url}'>${repo}</a>`)
    })

    str += projects.join(', ')

    ghInfo.innerHTML = str

    if (ghApiData.style.display !== 'block') {
      ghApiData.style.display = 'block'
    }
  }

  // recent commits
  // const ghRecentCommits = await fetch(
  //   `${GH_API_URL}/search/commits?q=author:${GH_USER}&sort=committer-date&per_page=3`)
  //   .then(response => response.json())

  // if (ghRecentCommits) {
  //   const ghInfo = document.querySelector('.ghInfo')
  //   const ghApiData = document.querySelector('.apiData.devgit')

  //   let str = ''
  //   str += `<span>Latest commits:</span>`

  //   ghRecentCommits.items.forEach(item => {
  //     const msg = item.commit.message
  //     const url = item.html_url
  //     const repo = item.repository.name
  //     const date = item.commit.author.date.substr(0, 10)

  //     str += `<br />- ${date}: <a href='${url}'>${msg}</a></span> (<strong><a href='${repo}'>${repo}</a></strong>)`
  //   })

  //   ghInfo.innerHTML = str

  //   if (ghApiData.style.display !== 'block') {
  //     ghApiData.style.display = 'block'
  //   }
  // }
}

// PODBEAN
MCInfo.POD = function() {
  fetch(SITE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'site': 'podbean' }),
  })
    .then(response => response.json())
    .then(ep => {
      const podbean = document.querySelector('.htgPod')
      const podbeanApi = document.querySelector('.apiData.devPod')

      const podDate = new Date(parseInt(ep.time * 1000)).toLocaleDateString('en-CA')

      podbean.innerHTML = `<span>Latest episode: ${podDate}<br />`
      podbean.innerHTML += `<a href="${ep.url}">${ep.title}</a></span>`

      if (podbeanApi.style.display !== 'block') {
        podbeanApi.style.display = 'block'
      }
    })
}

// RUBYGEMS
MCInfo.RG = async function() {
  fetch(SITE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'site': 'rubygems' })
  })
  .then(response => response.json())
  .then(data => {
    const rubygems = document.querySelector('.rubyGems')
    const rubygemsApi = document.querySelector('.apiData.gemList')
    const gems = []

    Object.values(data).forEach(gem => {
      gems.push(`<a href="https://rubygems.org/gems/${gem.name}">${gem.name}</a>`)
    })

    rubygems.innerHTML = gems.sort().join(', ')

    if (rubygemsApi.style.display !== 'block') {
      rubygemsApi.style.display = 'block'
    }
  })
}

// STEAM
MCInfo.STEAM = function() {
  const steamLastGamePlayed = document.querySelector('.steamLastGamePlayed')
  const steamApiData = document.querySelector('.apiData.steam')

  fetch(SITE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'site': 'steam' })
  })
  .then(response => response.json())
  .then(data => {
    const game = data['response']['games'][0]

    const gameTitle = game['name']
    const gameId = game['appid']
    const gameUrl = `https://steamcommunity.com/app/${gameId}`

    steamLastGamePlayed.innerHTML = `<span>Latest game: <a href="${gameUrl}">${gameTitle}</a></span>`

    if (steamApiData.style.display !== 'block') {
      steamApiData.style.display = 'block'
    }
  })
  .catch(error => {
    console.error('steam request failed', error)
  })
}