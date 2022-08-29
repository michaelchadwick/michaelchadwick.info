// BOARDGAMEGEEK
MCInfo.BG = function() {
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
      const postUrl = `${MCINFO_URL}${post.url}`

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

// _UTILITIES
function _replaceAll(str, find, replace) {
  return str.replace(new RegExp(_escapeRegExp(find), 'g'), replace)
}

function _escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
}

/**
 * Changes XML to JSON
 * Modified version from here: http://davidwalsh.name/convert-xml-json
 * @param {string} xml XML DOM tree
 */
function _xml2json(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  // If all text nodes inside, get concatenated text from them.
  var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = _xml2json(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(_xml2json(item));
      }
    }
  }
  return obj;
}
