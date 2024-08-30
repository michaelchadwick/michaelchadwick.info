// MCInfo object init
if (typeof MCInfo === 'undefined') var MCInfo = {}

const MCINFO_PROD_URL = ['michaelchadwick.info']

// set some site vars
MCInfo.env = MCINFO_PROD_URL.includes(document.location.hostname) ? 'prod' : 'local'
MCInfo.showUnpublished = false

if (MCInfo.env == 'prod') {
  MCInfo.BACKEND_SITE_API_PATH = '/assets/php/site-api.php'
  MCInfo.BACKEND_SITE_VIS_PATH = '/assets/php/site-visibility.php'
} else {
  MCInfo.BACKEND_SITE_API_PATH = 'http://localhost:3000/site-api.php'
  MCInfo.BACKEND_SITE_VIS_PATH = 'http://localhost:3000/site-visibility.php'
}
