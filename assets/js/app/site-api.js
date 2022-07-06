// _UTILITIES
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace)
}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
}

// BOARDGAMEGEEK
MCInfo.BG = async function() {
  const bggLastGamePlayed = document.querySelector('.bggLastGamePlayed')
  const bggApiData = document.querySelector('.apiData.bgg')

  fetch(BGG_API_URL, {
    headers: {
      'Content-Type': 'application/xml',
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get bgg data')
    }

    return response
  }).then(xml => {
    const lastPlay = xml.querySelector('play')[0]
    const lastPlayItem = lastPlay.querySelector('item')

    const name = lastPlayItem[0].getAttribute('name').value
    const id = lastPlayItem[0].getAttribute('objectid').value
    const date = lastPlay.getAttribute('date').value

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

// CODANAME
MCInfo.CN = async function() {
  const devblog = document.querySelector('blogCodaname')
  const devblogApi = document.querySelector('.apiData.devblog')

  fetch(CODANAME_API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get devblog data')
      }

      return response.json()
    }).then(data => {
      const entries = data.entries
      const post = entries[entries.length-1]
      const postTitle = post.title
      const postUrl = `${CODANAME_URL}${post.url}`

      let postDate = post.url.substr(6,10)
      postDate = replaceAll(postDate, '/', '-')

      devblog.innerHTML = `<span>Latest post: ${postDate}<br />`
      devblog.innerHTML += `<a href="${postUrl}">${postTitle}</a></span>`

      if (devblogApi.style.display !== 'block') {
        devblogApi.style.display = 'block'
      }
    })
}

// GITHUB
MCInfo.GH = async function() {
  const ghLastRepo = await fetch(GH_API_LAST_REPO)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get devgit data')
      }

      return response.json()
    })

  fetch(ghLastRepo)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get last commit message')
      }

      return response.json()
    }).then(data => {
      const repo_name = data[0].name
      const repo_url = data[0].html_url

      if (data.length > 0) {
        const commit_sha = data[0].sha
        const commit_msg = data[0].commit.message
        const commit_url = data[0].html_url
        const commit_date = data[0].commit.author.date.substr(0, 10)

        updatePageChunk(repo_name, repo_url, commit_sha, commit_msg, commit_url, commit_date)
      }
    })

  function updatePageChunk(repo_name, repo_url, commit_sha, commit_msg, commit_url, commit_date) {
    const ghLastChange = document.querySelector('.ghLastChange')
    const ghApiData = document.querySelector('.apiData.devgit')

    let str = ''
    str += '<span>'
    str += `Latest commit: ${commit_date}<br />`
    str += `<strong><a href='${repo_url}'>${repo_name}</a></strong>`
    str += '</span>'
    str += `<br />- <a href='${commit_url}'>${commit_msg}</a></span>`

    ghLastChange.innerHTML = str

    if (ghApiData.style.display !== 'block') {
      ghApiData.style.display = 'block'
    }
  }
}

// POCKET - disabled because no CORS enabled
/*
MCInfo.PO = async function() {
  let POCKET_CONSUMER_KEY = ''
  let requestCode = ''
  let accessToken = ''

  $.ajax({
    url: POCKET_REQUEST_URL,
    dataType: 'json',
    type: 'POST',
    async: false,
    data: {
      "consumer_key": POCKET_CONSUMER_KEY,
      "redirect_uri": POCKET_REDIRECT_URL
    },
    success: function (data) {
      console.log('success! pocket request url', data)
      $(this).requestCode = data
    },
    error: function (e) {
      console.error('Could not get pocket request data', e)
    }
  })

  $.ajax({
    url: POCKET_ACCESS_URL,
    dataType: 'json',
    type: 'POST',
    async: false,
    data: {
      "consumer_key": POCKET_CONSUMER_KEY,
      "code": requestCode
    },
    success: function (data) {
      console.log('success! pocket access url', data)
      $(this).accessToken = data
    },
    error: function (e) {
      console.error('Could not get pocket access data', e)
    }
  })

  $.ajax({
    url: POCKET_QUERY_URL,
    dataType: 'json',
    type: 'POST',
    async: false,
    data: {
      "consumer_key": POCKET_CONSUMER_KEY,
      "access_token": accessToken,
      "count": 5,
      "detailType": "complete"
    },
    success: function (data) {
      console.log('success! pocket query', data)
    },
    error: function (e) {
      console.error('Could not get pocket query data', e)
    }
  })
}
*/

// RUBYGEMS - disabled due to rubygems.org not honoring preflight OPTIONS requests
/*
MCInfo.RG = async function() {
  let RUBYGEMS_API_KEY = ''

  $.get({
    url: RUBYGEMS_API_URL,
    type: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', RUBYGEMS_API_KEY)
    },
    data: {},
    dataType: 'json',
    success: function (data) {
      console.log('rubygems data', data)
    },
    error: function (e) {
      console.error('Could not get rubygems data', e)
    }
  })
}
*/

// SOUNDCLOUD - not using right now
/*
MCInfo.SC = async function() {
  let $sc_embed_wrapper = $('li.soundcloud')

  $.getJSON('js/client_ids.json', function(data) {
    SC.initialize({
      client_id: data.soundcloud,
      redirect_uri: '/'
    })
  })

  getLatestTrack()

  function getLatestTrack() {
    SC.get('/tracks',
    {
      user_id: SC_USER_ID,
      limit: 1
    },
    function(latest_track) {
      $sc_embed_wrapper.empty()
      $sc_embed_wrapper.append("<div id='sc_player'></div>")
      SC.oEmbed(
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
*/

// WORDPRESS - moved all wordpress blog content to static codaname site
/*
MCInfo.WP = async function() {
  $.ajax({
    dataType: 'json',
    url: MUZBLOG_API_URL,
    success: function (data) {
      var latestPost = data[0]
      var title = latestPost.title.rendered
      var date = latestPost.date.split('T')[0]
      var url = latestPost.link

      $('.blogNebyoolaeCom').html(`Latest post: ${date}<br /><a href='${url}'>${title}</a>`)

      if ($('.apiData.muzblog').prop('display') !== 'block') {
        $('.apiData.muzblog').show()
      }
    },
    error: function (e) {
      console.error('Could not get muzblog data', e)
    }
  })
}
*/
