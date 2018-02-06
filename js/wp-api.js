$(function() {
  var BLOG_API_URL = 'https://blog.nebyoolae.com/?json=get_recent_posts'

  $.ajax({
    dataType: 'json',
    url: BLOG_API_URL,
    success: function (data) {
      var latestPost = data.posts[0]
      var title = latestPost.title
      var date = latestPost.date.split(' ')[0]
      var url = latestPost.url

      $('.blogNebyoolaeCom').html(`Latest post: ${date}<br /><a href='${url}'>${title}</a>`)

      if ($('.apiData').prop('display') != 'block') {
        $('.apiData').show();
      }
    },
    error: function () {
      console.log('No posts found')
    }
  })
})
