// BLOG_PRIV
MCInfo.BLOG_PRIV = async function (key) {
  const response = await fetch(MCInfo.BACKEND_SITE_VIS_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key: key }),
  })
  if (!response.ok) {
    throw new Error('Could not get mcinfo visibility')
  }
  const unlocked = await response.json()
  return unlocked
}
