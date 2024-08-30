// BLOG_PRIV
MCInfo.BLOG_PRIV = function (key) {
  return fetch(MCInfo.BACKEND_SITE_VIS_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key: key }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not get mcinfo visibility')
      }

      return response.json()
    })
    .then((unlocked) => {
      return unlocked
    })
}
