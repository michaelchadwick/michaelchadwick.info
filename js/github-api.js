$(function() {
  var GH_URL = 'https://github.com'
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
        url: `${GH_API_URL}/repos/${GH_USER}/${repo_name}/events?per_page=1`,
        success: function (data) {

          if (data.length > 0) {
            let commit_sha = data[0].payload.commits[0].sha
            let commit_msg = data[0].payload.commits[0].message
            let commit_url = `${GH_URL}/${GH_USER}/${repo_name}/commit/${commit_sha}`
            let commit_date = data[0].created_at.substr(0, 10)

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
    let str = `<span>Latest update: ${commit_date}<br />
    <strong><a href='${repo_url}'>${repo_name}</a></strong></span><br />
    - <a href='${commit_url}'>${commit_msg}</a></span>`

    $('.ghLastChange').html(str)

    if ($('.apiData.devgit').prop('display') != 'block') {
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
