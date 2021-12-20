// BOARDGAMEGEEK
const BG = $(function() {
  var BGG_API_URL = 'https://www.boardgamegeek.com/xmlapi2/plays?username=nebyoolae&type=thing&subtype=boardgame&page=001'

  $.ajax({
    datatype: 'xml',
    url: BGG_API_URL,
    success: function (xml) {
      var $lastPlay = $(xml).find('play')[0]
      var $lastPlayItem = $($lastPlay).find('item')

      var name = $lastPlayItem[0].attributes['name'].value
      var id = $lastPlayItem[0].attributes['objectid'].value
      var date = $lastPlay.attributes['date'].value

      if (name && id && date) {
        $('.bggLastGamePlayed').html(`Latest game: ${date}<br /><a href='https://boardgamegeek.com/boardgame/${id}'>${name}</a>`)
      } else {
        console.error('bgg api error')
      }

      if ($('.apiData.bgg').prop('display') !== 'block') {
        $('.apiData.bgg').show()
      }
    },
    error: function (e) {
      console.error('Could not get bgg data', e)
    }
  })
})

// CODANAME
const CN = $(function() {
  var CODANAME_API_URL = 'https://neb.host/blog/api/v1/pages.json'

  $.ajax({
    dataType: 'json',
    url: CODANAME_API_URL,
    success: function (data) {
      var entries = data.entries
      var post = entries[entries.length-1]
      var postDate = post.url.substr(1,10)
      var postTitle = post.title
      var postUrl = `https://neb.host/blog${post.url}`
      postDate = replaceAll(postDate, '/', '-')

      $('.blogCodaname').html('<span>Latest post: ' + postDate + '<br /><a href="' + postUrl + '">' + postTitle + '</a></span>')

      if ($('.apiData.devblog').prop('display') !== 'block') {
        $('.apiData.devblog').show()
      }
    },
    error: function (e) {
      console.error('Could not get devblog data', e)
    }
  })

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace)
  }

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
  }
})

// GITHUB
const GH = $(function() {
  var GH_USER = 'michaelchadwick'
  var GH_API_URL = 'https://api.github.com'
  var GH_API_LAST_REPO = `${GH_API_URL}/users/${GH_USER}/repos?sort=updated&per_page=1`

  $.ajax({
    dataType: 'json',
    url: GH_API_LAST_REPO,
    success: function (data) {
      let repo_name = data[0].name
      let repo_url = data[0].html_url

      $.ajax({
        dataType: 'json',
        url: `${GH_API_URL}/repos/${GH_USER}/${repo_name}/commits?per_page=1`,
        success: function (data) {
          if (data.length > 0) {
            let commit_sha = data[0].sha
            let commit_msg = data[0].commit.message
            let commit_url = data[0].html_url
            let commit_date = data[0].commit.author.date.substr(0, 10)

            updatePageChunk(repo_name, repo_url, commit_sha, commit_msg, commit_url, commit_date)
          }
        },
        error: function (e) {
          console.error('Could not get last commit message', e)
        }
      })
    },
    error: function (e) {
      console.error('Could not get devgit data', e)
    }
  })

  function updatePageChunk(repo_name, repo_url, commit_sha, commit_msg, commit_url, commit_date) {
    let str = `<span>Latest commit: ${commit_date}<br />
    <strong><a href='${repo_url}'>${repo_name}</a></strong></span><br />
    - <a href='${commit_url}'>${commit_msg}</a></span>`

    $('.ghLastChange').html(str)

    if ($('.apiData.devgit').prop('display') !== 'block') {
      $('.apiData.devgit').show()
    }
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace)
  }

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
  }
})

// POCKET - disabled because no CORS enabled
/*
const PO = $(function() {
  var POCKET_CONSUMER_KEY = ''
  var POCKET_REDIRECT_URL = 'https://michaelchadwick.info'
  var POCKET_REQUEST_URL = 'https://getpocket.com/v3/oauth/request'
  var requestCode = ''
  var POCKET_ACCESS_URL = 'https://getpocket.com/v3/oauth/authorize'
  var accessToken = ''
  var POCKET_QUERY_URL = 'https://getpocket.com/v3/get'

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
})
*/

// RUBYGEMS - disabled due to rubygems.org not honoring preflight OPTIONS requests
/*
const RG = $(function() {
  var RUBYGEMS_API_KEY = ''
  var RUBYGEMS_API_URL = 'https://rubygems.org/api/v1/owners/mjchadwick/gems.json'

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
})
*/

// SOUNDCLOUD - not using right now
/*
const SC = $(function() {
  var myUserId = 17397
  var $sc_embed_wrapper = $('li.soundcloud')

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
      user_id: myUserId,
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
})
*/

// WORDPRESS
const WP = $(function() {
  var MUZBLOG_API_URL = 'https://blog.nebyoolae.com/wp-json/wp/v2/posts'

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
})
