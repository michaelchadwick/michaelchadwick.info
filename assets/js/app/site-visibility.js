// BLOG_PRIV
MCInfo.BLOG_PRIV = function(key) {
  return fetch(SITE_VIS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'key': key })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get mcinfo visibility')
    }

    return response.json()
  }).then(unlocked => {
    return unlocked
  })
}
