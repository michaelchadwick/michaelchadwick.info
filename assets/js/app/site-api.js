// BOARDGAMEGEEK
MCInfo.BGG = function() {
  const bggLastGamePlayed = document.querySelector('.bggLastGamePlayed')
  const bggApiData = document.querySelector('.apiData.bgg')

  // get most recent board game play
  fetch(BGG_API_URL, {
    method: 'GET',
    mode: 'cors'
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get bgg data')
    }

    return response.text()
  }).then(data => {
    // console.log('boardgamegeek api request SUCCESS')

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
  }).catch(error => {
    console.error('boardgamegeek api request failed', error)
  })
}

// BLOG
MCInfo.BLOG = function() {
  const devblog = document.querySelector('.mcinfoBlog')
  const devblogApi = document.querySelector('.apiData.devblog')

  // get most recent blog post
  fetch(MCINFO_API_URL, {
    method: 'GET',
    mode: 'cors'
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get devblog data')
    }

    return response.json()
  }).then(data => {
    // console.log('blog api request SUCCESS')

    const entries = data.entries

    let i = 1

    // find the most recent published post
    while (entries[entries.length - i].meta.published == false) {
      i++
    }

    const post = entries[entries.length - i]
    const postTitle = post.title
    const postUrl = post.url

    let postDate = post.url.substr(6,10)
    postDate = _replaceAll(postDate, '/', '-')

    devblog.innerHTML = `<span>Latest post: ${postDate}<br />`
    devblog.innerHTML += `<a href="${postUrl}">${postTitle}</a></span>`

    if (devblogApi.style.display !== 'block') {
      devblogApi.style.display = 'block'
    }
  }).catch(error => {
    console.error('blog api request failed', error)
  })
}

// GITHUB
MCInfo.GH = async function() {
  // get pinned projects
  fetch(`${GH_PINNED_API}${GH_USER}`, {
    method: 'GET'
  }).then(response => {
    return response.json()
  }).then(ghPinnedProjects => {
    if (ghPinnedProjects) {
      // console.log('github api request SUCCESS')

      const ghApiList = document.querySelector('.apiData.devgit')
      const ghApiListItem = document.querySelector('.ghInfo')

      let str = `<span>Pinned projects:</span> `

      let projects = []

      ghPinnedProjects.forEach(item => {
        const url = item.link
        const repo = item.repo

        projects.push(`<a href='${url}'>${repo}</a>`)
      })

      str += projects.join(', ')

      ghApiListItem.innerHTML = str

      if (ghApiList.style.display !== 'block') {
        ghApiList.style.display = 'block'
      }
    }
  }).catch(error => {
    console.error('github api request failed', error)
  })

  // get recent commits
  // const ghRecentCommits = await fetch(
  //   `${GH_API_URL}/search/commits?q=author:${GH_USER}&sort=committer-date&per_page=3`)
  //   .then(response => response.json())

  // if (ghRecentCommits) {
  //   const ghApiListItem = document.querySelector('.ghApiListItem')
  //   const ghApiList = document.querySelector('.apiData.devgit')

  //   let str = ''
  //   str += `<span>Latest commits:</span>`

  //   ghRecentCommits.items.forEach(item => {
  //     const msg = item.commit.message
  //     const url = item.html_url
  //     const repo = item.repository.name
  //     const date = item.commit.author.date.substr(0, 10)

  //     str += `<br />- ${date}: <a href='${url}'>${msg}</a></span> (<strong><a href='${repo}'>${repo}</a></strong>)`
  //   })

  //   ghApiListItem.innerHTML = str

  //   if (ghApiList.style.display !== 'block') {
  //     ghApiList.style.display = 'block'
  //   }
  // }
}

// PODBEAN
MCInfo.POD = function() {
  // get most recent podcast episode
  fetch(SITE_API_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'site': 'podbean' }),
  }).then(response => {
    return response.json()
  }).then(ep => {
    // console.log('podbean api request SUCCESS')

    const podbeanApiListItem = document.querySelector('.htgPod')
    const podbeanDate = new Date(parseInt(ep.time * 1000)).toLocaleDateString('en-CA')

    podbeanApiListItem.innerHTML = `<span>Latest episode: ${podbeanDate}<br />`
    podbeanApiListItem.innerHTML += `<a href="${ep.url}">${ep.title}</a></span>`
  }).catch(error => {
    console.error('podbean api request failed', error);

    const podbeanApiList = document.querySelector('.apiData.devPod')
    podbeanApiList.style.display = 'none';
  })
}

// RUBYGEMS
MCInfo.RG = async function() {
  // get linked list of rubygems
  fetch(SITE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'site': 'rubygems' })
  }).then(response => {
    return response.json()
  }).then(data => {
    // console.log('rubygems api request SUCCESS')

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
  }).catch(error => {
    console.error('rubygems api request failed', error)
  })
}

// STEAM
MCInfo.STEAM = function() {
  const steamLastGamePlayed = document.querySelector('.steamLastGamePlayed')
  const steamApiData = document.querySelector('.apiData.steam')

  // get most recent steam game played
  fetch(SITE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'site': 'steam' })
  }).then(response => {
    return response.json()
  }).then(data => {
    console.log('steam api request SUCCESS', data)

    const resp = data['response']

    console.log('steam resp', resp)

    if (resp.total_count) {
      if (resp.total_count == 0) {
        steamLastGamePlayed.innerHTML = `<span>Steam says I have not played any games :-O</span>`
      }
    } else {
      console.log('resp[games]', resp['games'])

      const games = resp['games']

      if (games.length) {
        const game = games[0]

        const gameTitle = game['name']
        const gameId = game['appid']
        const gameUrl = `https://steamcommunity.com/app/${gameId}`

        steamLastGamePlayed.innerHTML = `<span>Latest game: <a href="${gameUrl}">${gameTitle}</a></span>`
      } else {
        steamLastGamePlayed.innerHTML = `<span>Steam failed to respond >:-(</span>`
      }
    }

    if (steamApiData.style.display !== 'block') {
      steamApiData.style.display = 'block'
    }
  }).catch(error => {
    console.error('steam api request failed', error)
  })
}