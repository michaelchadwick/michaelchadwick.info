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

// CODANAME
MCInfo.CN = function() {
  const devblog = document.querySelector('.blogCodaname')
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
  const ghLastRepo = await fetch(GH_API_LAST_REPO).then(response => response.json())

  let ghRepoName = ''
  let ghRepoUrl = ''

  if (ghLastRepo.length) {
    ghRepoName = ghLastRepo[0].name
    ghRepoUrl = ghLastRepo[0].html_url
  }

  const GH_API_LAST_COMMIT = `${GH_API_URL}/repos/${GH_USER}/${ghRepoName}/commits?per_page=1`

  const ghLastCommit = await fetch(GH_API_LAST_COMMIT).then(response => response.json())

  let ghCommitMsg = ''
  let ghCommitUrl = ''
  let ghCommitDate = ''

  if (ghLastCommit.length) {
    ghCommitMsg = ghLastCommit[0].commit.message
    ghCommitUrl = ghLastCommit[0].html_url
    ghCommitDate = ghLastCommit[0].commit.author.date.substr(0, 10)
  }

  const ghLastChange = document.querySelector('.ghLastChange')
  const ghApiData = document.querySelector('.apiData.devgit')

  let str = ''
  str += '<span>'
  str += `Latest commit: ${ghCommitDate}<br />`
  str += `<strong><a href='${ghRepoUrl}'>${ghRepoName}</a></strong>`
  str += '</span>'
  str += `<br />- <a href='${ghCommitUrl}'>${ghCommitMsg}</a></span>`

  ghLastChange.innerHTML = str

  if (ghApiData.style.display !== 'block') {
    ghApiData.style.display = 'block'
  }
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
