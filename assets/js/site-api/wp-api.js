$(function() {
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
