// POCKET - disabled because no CORS enabled
MCInfo.PO = async function() {
  let POCKET_CONSUMER_KEY = ''
  let requestCode = ''
  let accessToken = ''

  await fetch(POCKET_REQUEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'json',
    },
    body: JSON.stringify({
      "consumer_key": POCKET_CONSUMER_KEY,
      "redirect_uri": POCKET_REDIRECT_URL
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get Pocket requeat data')
    }

    return response.json()
  }).then(data => {
    console.log('success! pocket request url', data)
    requestCode = data
  })

  await fetch(POCKET_ACCESS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'json',
    },
    body: JSON.stringify({
      "consumer_key": POCKET_CONSUMER_KEY,
      "code": requestCode
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get Pocket access data')
    }

    return response.json()
  }).then(data => {
    console.log('success! pocket access url', data)
    accessToken = data
  })

  await fetch(POCKET_QUERY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'json',
    },
    body: JSON.stringify({
      "consumer_key": POCKET_CONSUMER_KEY,
      "access_token": accessToken,
      "count": 5,
      "detailType": "complete"
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get Pocket query data')
    }

    return response.json()
  }).then(data => {
    console.log('success! pocket query', data)
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
    }
}
