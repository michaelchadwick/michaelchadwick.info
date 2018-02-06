$(function() {
  var myUserId = 17397
  var $sc_embed_wrapper = $('li.soundcloud')

  $.getJSON('js/client_ids.json', function(data) {
    SC.initialize({
      client_id: data.soundcloud,
      redirect_uri: '/'
    })
  })

  getLatestTrack()

  function getLatestTrack() {
    SC.get('/tracks',
    {
      user_id: myUserId,
      limit: 1
    },
    function(latest_track) {
      $sc_embed_wrapper.empty()
      $sc_embed_wrapper.append("<div id='sc_player'></div>")
      SC.oEmbed(
        latest_track.permalink_url,
        {
          show_comments: false,
          maxheight: 166
        },
        document.getElementById('sc_player')
      )
    })
  }

})
