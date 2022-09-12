// POCKET - disabled because no CORS enabled
MCInfo.PO = function() {
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

// PODBEAN - disabled because no CORS enabled
MCInfo.POD = async function() {
  const podbean = document.querySelector('.htgPod')
  const podbeanApi = document.querySelector('.apiData.devpod')

  fetch(PHP_GETENV_URL, {
    body: {
      CLIENT_ID_KEY: 'PODBEAN_MCINFO_CLIENT_ID',
      CLIENT_SECRET_KEY: 'PODBEAN_MCINFO_CLIENT_SECRET'
    },
    method: 'POST'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get devpod data')
      }

      return response.text()
    }).then(data => {
      // console.log('client_creds', data)

      return fetch(PODBEAN_OAUTH_URL, {
        body: 'grant_type=client_credentials',
        headers: {
          'Authorization': 'Basic ' + btoa(data.creds.client_id + ':' + data.creds.client_secret)
        },
        method: 'POST'
      })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Could not get devpod data')
      }

      return response.text()
    }).then(response => {
      return fetch(`${PODBEAN_API_URL}/episodes?access_token=${response}`)
    }).then(response => {
        if (!response.ok) {
          throw new Error('Could not get devpod data')
        }

        return response.json()
      }).then(data => {
        const episodes = data
        const ep = episodes[0]
        const epTitle = ep.title
        const epTime = new Date(ep.publish_time)
        const epUrl = `${ep.permalink_url}`

        podbean.innerHTML = `<span>Latest episode: ${epTime}<br />`
        podbean.innerHTML += `<a href="${epUrl}">${epTitle}</a></span>`

        if (podbeanApi.style.display !== 'block') {
          podbeanApi.style.display = 'block'
        }
      })
}

// RUBYGEMS - disabled due to rubygems.org not honoring preflight OPTIONS requests
MCInfo.RG = async function() {
  let RUBYGEMS_API_KEY = ''

  fetch(RUBYGEMS_API_URL, {
    method: 'GET',
    headers: {
      'Authorization': RUBYGEMS_API_KEY
    },
    body: JSON.stringify({}),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get rubygems data')
    }

    return response.json()
  }).then(data => {
    console.log('rubygems data', data)
  })
}

// SOUNDCLOUD - not using right now
MCInfo.SC = async function() {
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
    MCInfo.SC.get('/tracks', {
      user_id: SC_USER_ID,
      limit: 1
    },
    function(latest_track) {
      scEmbedWrapper.innerHTML = ''

      const scPlayerDiv = document.createElement('div')
      scPlayerDiv.id = 'sc_player'

      scEmbedWrapper.append(scPlayerDiv)

      MCInfo.SC.oEmbed(
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

// STEAM - disabled because no CORS enabled
MCInfo.STEAM = function() {
  const steamLastGamePlayed = document.querySelector('.steamLastGamePlayed')
  const steamApiData = document.querySelector('.apiData.steam')

  fetch(ENV_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('env vars fetch failed')
      }

      return response.json()
    })
    .then(json => {
      const steamKey = json['STEAM_WEB_API_KEY']
      const steamId = json['STEAM_ID_64']
      const steamUrl = `${STEAM_API_URL}/?key=${steamKey}&steamid=${steamId}`

      return fetch(steamUrl)
    })
      .then(response => {
        if (!response.ok) {
          console.error('steam response', response)
          throw new Error('steam api fetch failed')
        }

        return response.json()
      })
      .then(data => {
        const game = data['response']['games']

        const gameTitle = game['name']
        const gameId = game['appid']
        const gameUrl = `https://steamcommunity.com/app/${gameId}`

        steamLastGamePlayed.innerHTML = `<span>Latest game: ${gameTitle}<br />`
        steamLastGamePlayed.innerHTML += `<a href="${gameUrl}">${gameTitle}</a></span>`

        if (steamApiData.style.display !== 'block') {
          steamApiData.style.display = 'block'
        }
      })
      .catch(error => {
        console.error('steam request failed', error)
      })
}

// WORDPRESS - moved all wordpress blog content to static codaname site
MCInfo.WP = async function() {
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

      if (muzBlogApiData.style.display !== 'block') {
        muzBlogApiData.style.display = 'block'
      }
    })
}
