// frontend script to send out HTTP requests to APIs
// - some go to a backend script due to authentication

if (typeof MCInfo.SiteApi === 'undefined') MCInfo.SiteApi = {}

// ADVENTOFCODE (backend)
MCInfo.SiteApi.AOC = function () {
  // get calendar stars information
  fetch(MCInfo.BACKEND_SITE_API_PATH, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ site: 'aoc' }),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // console.log('aoc api request SUCCESS', data)

      const aocApiData = document.querySelector('.apiData.aocStars')
      const aocStars = document.querySelector('.adventOfCode')
      const events = []

      Object.entries(data).sort((a, b) => b[0] - a[0]).forEach((event) => {
        events.push(`<a href="https://adventofcode.com/${event[0]}" target="_blank">${event[0]}</a>: <strong>${event[1]}</strong>`)
      })

      aocStars.innerHTML = events.join(', ')

      if (!aocApiData.classList.contains('show')) {
        aocApiData.classList.add('show')
      }
    })
}

// BOARDGAMEGEEK (frontend)
MCInfo.SiteApi.BGG = function () {
  const bggLastGamePlayed = document.querySelector('.bggLastGamePlayed')
  const bggApiData = document.querySelector('.apiData.bgg')

  // get most recent board game play
  fetch(BGG_API_URL, {
    method: 'GET',
    mode: 'cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not get bgg data')
      }

      return response.text()
    })
    .then((data) => {
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

      if (!bggApiData.classList.contains('show')) {
        bggApiData.classList.add('show')
      }
    })
    .catch((error) => {
      console.error('boardgamegeek api request failed', error)
    })
}

// BLOG (frontend)
MCInfo.SiteApi.BLOG = function () {
  const devblog = document.querySelector('.mcinfoBlog')
  const devblogApi = document.querySelector('.apiData.devblog')

  // get most recent blog post
  fetch(MCINFO_API_URL, {
    method: 'GET',
    mode: 'cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not get devblog data')
      }

      return response.json()
    })
    .then((data) => {
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

      let postDate = post.url.substr(6, 10)
      postDate = _replaceAll(postDate, '/', '-')

      devblog.innerHTML = `<span>Latest post: ${postDate}<br />`
      devblog.innerHTML += `<a href="${postUrl}">${postTitle}</a></span>`

      if (!devblogApi.classList.contains('show')) {
        devblogApi.classList.add('show')
      }
    })
    .catch((error) => {
      console.error('blog api request failed', error)
    })
}

// GITHUB (frontend)
MCInfo.SiteApi.GH = async function () {
  // get pinned projects
  fetch(`${GH_PINNED_API}${GH_USER}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json()
    })
    .then((ghPinnedProjects) => {
      if (ghPinnedProjects) {
        // console.log('github api request SUCCESS')

        const ghApiList = document.querySelector('.apiData.devgit')
        const ghApiListItem = document.querySelector('.ghInfo')

        let str = `<span>Pinned projects:</span> `

        let projects = []

        ghPinnedProjects.forEach((item) => {
          const url = item.link
          const repo = item.repo

          projects.push(`<a href='${url}'>${repo}</a>`)
        })

        str += projects.join(', ')

        ghApiListItem.innerHTML = str

        if (!ghApiList.classList.contains('show')) {
          ghApiList.classList.add('show')
        }
      }
    })
    .catch((error) => {
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

  //   if (!ghApiList.classList.contains('show')) {
  //     ghApiList.classList.add('show')
  //   }
  // }
}

// PODBEAN (backend)
MCInfo.SiteApi.PODBEAN = function (type = 'latest') {
  // get podcast episodes
  fetch(MCInfo.BACKEND_SITE_API_PATH, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ site: 'podbean', arg1: type }),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // console.log('podbean api request SUCCESS')

      /* apple_episode_type, content_explicit, duration, episode_number, id, logo,media_url, object: "Episode", permalink_url, player_url, podcast_id, publish_time, season_number, status, title, transcripts_url, type: "Public" */

      // create list of all episode titles (/podcasts/htg)
      if (type == 'episodes') {
        const podbeanEpisodeMeta = document.querySelector('#episode-meta')
        const podbeanEpisodeList = document.querySelector('#episode-list')
        const ignoredStatuses = ['draft', 'future']

        const eps = data.body.episodes
        const totalEps = eps.length
        const totalDuration = eps.reduce((acc, cur) => acc + cur.duration, 0)
        const shortestEpisode = JSON.parse(JSON.stringify(eps)).sort((a, b) => a.duration - b.duration)[0]
        const longestEpisode = JSON.parse(JSON.stringify(eps)).sort((a, b) => b.duration - a.duration)[0];

        const pubDates = eps.map((ep) => ep.publish_time)
        const firstPubDate = new Date(Math.min(...pubDates) * 1000).toISOString().substring(0, 10)
        const lastPubDate = new Date(Math.max(...pubDates) * 1000).toISOString().substring(0, 10)

        function secondsToHHMMSS(seconds) {
          const h = Math.floor(seconds / 3600);
          const m = Math.floor((seconds % 3600) / 60);
          const s = seconds % 60;

          // Pad each component to 2 digits
          const pad = num => String(num).padStart(2, '0');

          return `${pad(h)}:${pad(m)}:${pad(s)}`;
        }

        podbeanEpisodeMeta.innerHTML = `
          <strong>Total Episodes</strong>: ${totalEps}<br />
          <strong>Total Duration</strong>: ${secondsToHHMMSS(totalDuration)}<br />
          <strong>Last Episode</strong>: ${lastPubDate}<br />
          <strong>First Episode</strong>: ${firstPubDate}<br />
          <strong>Shortest Episode</strong>: ${shortestEpisode.title.substring(20)} (${new Date(shortestEpisode.duration * 1000).toISOString().substring(11, 19)})<br />
          <strong>Longest Episode</strong>: ${longestEpisode.title.substring(20)} (${new Date(longestEpisode.duration * 1000).toISOString().substring(11, 19)})<br />
        `

        let html = ''

        eps.filter((ep) => !ignoredStatuses.includes(ep.status)).forEach((ep) => {
          const perc = ((ep.duration / longestEpisode.duration).toFixed(2) * 100).toFixed(0)
          let percGraph = ''
          let percClass = ''
          for (i = 0; i < Number(perc) / 10; i++) {
            if (i > 7) {
              percGraph += '<span class="red">🟥</span>'
              percClass = 'long'
            } else if (i > 4) {
              percGraph += '<span class="yellow">🟨</span>'
              percClass = 'med'
            } else {
              percGraph += '<span class="green">🟩</span>'
              percClass = 'short'
            }
          }

          html += `<div class="episode" id="episode-${ep.id}">`
          html += '\t<div class="title">'
          html += `\t\t<button type="button" onclick="createPlayer('${ep.id}', '${ep.player_url}')">`
          html += `\t\t\t<img src="/assets/images/play.svg" alt="Play">`
          html += `\t\t</button>`
          html += `\t\t<a href="${ep.permalink_url}" title="${new Date(ep.publish_time * 1000).toISOString().substring(0, 10)}">`
          html += `\t\t\t${ep.title.substring(20)}`
          html += '\t\t</a>'
          html += '\t</div>'
          html += `\t<div class="duration ${percClass}">`
          html += `\t\t${new Date(ep.duration * 1000).toISOString().substring(11, 19)}`
          html += '\t</div>'
          html += '\t<div class="perc">'
          html += `\t\t${percGraph}`
          html += '\t</div>'
          html += '</div>'
        })

        podbeanEpisodeList.innerHTML = html
      }
      // display latest episode pertinent info (/, /projects)
      else {
        const podbeanApi = document.querySelector('.apiData.devPod')
        const podbeanApiListItem = document.querySelector('.htgPod')
        const podbeanDate = new Date(parseInt(data.time * 1000)).toLocaleDateString('en-CA')

        podbeanApiListItem.innerHTML = `<span>Latest episode: ${podbeanDate}<br />`
        podbeanApiListItem.innerHTML += `<a href="${data.url}">${data.title}</a></span>`

        if (!podbeanApi.classList.contains('show')) {
          podbeanApi.classList.add('show')
        }
      }
    })
    .catch((error) => {
      console.error('podbean api request failed', error)

      const podbeanApiList = document.querySelector('.apiData.devPod')
      podbeanApiList.style.display = 'none'
    })

  createPlayer = (id, link) => {
    const ep = document.querySelector(`#episode-${id}`)
    const playerWrapperId = `player-wrapper-${id}`
    const playerId = `player-${id}`

    if (!document.querySelector(`#${playerId}`)) {
      const div = document.createElement('div')
      div.classList = 'player-wrapper'
      div.id = playerWrapperId
      const iframe = document.createElement('iframe')
      iframe.classList = 'player'
      iframe.id = playerId
      iframe.src = link
      div.appendChild(iframe)
      ep.after(div)
    } else {
      document.querySelector(`#${playerWrapperId}`).remove()
    }
  }
}

// RUBYGEMS (backend)
MCInfo.SiteApi.RUBYGEMS = async function () {
  // get linked list of rubygems
  fetch(MCInfo.BACKEND_SITE_API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ site: 'rubygems' }),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // console.log('rubygems api request SUCCESS')

      const rubygems = document.querySelector('.rubyGems')
      const rubygemsApi = document.querySelector('.apiData.gemList')
      const gems = []

      Object.values(data).forEach((gem) => {
        gems.push(`<a href="https://rubygems.org/gems/${gem.name}">${gem.name}</a>`)
      })

      rubygems.innerHTML = gems.sort().join(', ')

      if (!rubygemsApi.classList.contains('show')) {
        rubygemsApi.classList.add('show')
      }
    })
    .catch((error) => {
      console.error('rubygems api request failed', error)
    })
}

// STEAM (backend)
MCInfo.SiteApi.STEAM = function () {
  const steamLastGamePlayed = document.querySelector('.steamLastGamePlayed')
  const steamApiData = document.querySelector('.apiData.steam')

  // get most recent steam game played
  fetch(MCInfo.BACKEND_SITE_API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ site: 'steam' }),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // console.log('steam api request SUCCESS', data)

      const resp = data['response']

      if ('total_count' in resp) {
        if (resp.total_count <= 0) {
          steamLastGamePlayed.innerHTML = `<span>No games played in the last 2 weeks :(</span>`
        } else {
          const games = resp['games']

          if (games) {
            const game = games[0]

            const gameDuration = Math.round((game['playtime_forever'] / 60) * 100) / 100
            const gameTitle = game['name']
            const gameId = game['appid']
            const imageHash = game['img_icon_url']
            const gameUrl = `https://steamcommunity.com/app/${gameId}`
            const gameIcon = `https://media.steampowered.com/steamcommunity/public/images/apps/${gameId}/${imageHash}.jpg`

            steamLastGamePlayed.innerHTML = `<span>Latest game: ${gameDuration} hours played</span><br /><img class="steam-icon" src="${gameIcon}" /><a href="${gameUrl}">${gameTitle}</a>`

            if (!steamApiData.classList.contains('show')) {
              steamApiData.classList.add('show')
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error('steam api request failed', error)
    })
}

// UNUSED FOR NOW (POCKET, SOUNDCLOUD, WORDPRESS)
/*

// POCKET - disabled because no CORS enabled
MCInfo.SiteApi.POCKET = function() {
  let POCKET_CONSUMER_KEY = ''
  let requestCode = ''
  let accessToken = ''

  fetch(POCKET_REQUEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'json',
    },
    body: JSON.stringify({
      "consumer_key": POCKET_CONSUMER_KEY,
      "redirect_uri": POCKET_REDIRECT_URL
    })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get Pocket requeat data')
    }

    return response.json()
  }).then(data => {
    console.log('success! pocket request url', data)
    requestCode = data

    return fetch(POCKET_ACCESS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'json',
      },
      body: JSON.stringify({
        "consumer_key": POCKET_CONSUMER_KEY,
        "code": requestCode
      })
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not get Pocket access data')
    }

    return response.json()
  }).then(data => {
    console.log('success! pocket access url', data)

    accessToken = data

    return fetch(POCKET_QUERY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'json',
      },
      body: JSON.stringify({
        "consumer_key": POCKET_CONSUMER_KEY,
        "access_token": accessToken,
        "count": 5,
        "detailType": "complete"
      })
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not get Pocket query data')
    }

    return response.json()
  }).then(data => {
    console.log('success! pocket query', data)
  })
}

// SOUNDCLOUD - not using right now
MCInfo.SiteApi.SC = async function() {
  let scEmbedWrapper = document.querySelector('li.soundcloud')

  await fetch('js/client_ids.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get soundcloud client ids')
      }

      return response.json()
    }).then(data => {
      SC.initialize({
        client_id: data.soundcloud,
        redirect_uri: '/'
      })
    })

  getLatestTrack()

  function getLatestTrack() {
    MCInfo.SiteApi.SC.get('/tracks', {
      user_id: SC_USER_ID,
      limit: 1
    },
    function(latest_track) {
      scEmbedWrapper.innerHTML = ''

      const scPlayerDiv = document.createElement('div')
      scPlayerDiv.id = 'sc_player'

      scEmbedWrapper.append(scPlayerDiv)

      MCInfo.SiteApi.SC.oEmbed(
        latest_track.permalink_url,
        {
          show_comments: false,
          maxheight: 166
        },
        document.getElementById('sc_player')
      )
    })
  }
}

// WORDPRESS - moved all wordpress blog content to static site
MCInfo.SiteApi.WP = async function() {
  const muzblog = document.querySelector('.blogNebyoolaeCom')
  const muzBlogApiData = document.querySelector('.apiData.muzblog')

  fetch(MUZBLOG_API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get muzblog data')
      }

      return response.json()
    }).then(data => {
      var latestPost = data[0]
      var title = latestPost.title.rendered
      var date = latestPost.date.split('T')[0]
      var url = latestPost.link

      muzblog.innerHTML = `Latest post: ${date}<br /><a href='${url}'>${title}</a>`

      if (!muzBlogApiData.classList.contains('show')) {
        muzBlogApiData.classList.add('show')
      }
    })
}

*/
