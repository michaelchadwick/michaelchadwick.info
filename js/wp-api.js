$(function() {
  var MUZBLOG_API_URL = 'https://blog.nebyoolae.com/?json=get_recent_posts'

  $.ajax({
    dataType: 'json',
    url: MUZBLOG_API_URL,
    success: function (data) {
      var latestPost = data.posts[0]
      var title = latestPost.title
      var date = latestPost.date.split(' ')[0]
      var url = latestPost.url

      $('.blogNebyoolaeCom').html(`Latest post: ${date}<br /><a href='${url}'>${title}</a>`)

      if ($('.apiData.muzblog').prop('display') != 'block') {
        $('.apiData.muzblog').show();
      }
    },
    error: function (e) {
      console.log('Could not get muzblog data', e)
    }
  })
})
