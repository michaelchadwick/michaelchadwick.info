$(function() {
  var DEVBLOG_API_URL = 'http://codana.me/pages.json'

  $.ajax({
    dataType: 'json',
    url: DEVBLOG_API_URL,
    success: function (data) {
      var entries = data.entries;
      var post = entries[entries.length-1];
      var postDate = post.url.substr(1,10);
      var postTitle = post.title;
      var postUrl = "http://codana.me" + post.url;
      postDate = replaceAll(postDate, '/', '-');

      $('.blogCodaname').html('<span>Latest post: ' + postDate + '<br /><a href="' + postUrl + '">' + postTitle + '</a></span>');

      if ($('.apiData.devblog').prop('display') != 'block') {
        $('.apiData.devblog').show();
      }
    },
    error: function (e) {
      console.log('Could not get devblog data', e)
    }
  });

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
});
