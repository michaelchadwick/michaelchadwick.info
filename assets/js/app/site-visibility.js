// BLOG_PRIV
MCInfo.BLOG_PRIV = function() {
  return fetch(SITE_VIS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'site': 'mcinfo_priv' })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Could not get mcinfo visibility')
    }

    return response.json()
  }).then(data => {
    return data
  })
}
