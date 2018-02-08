$(function() {
  var BGG_API_URL = 'https://www.boardgamegeek.com/xmlapi2/plays?username=nebyoolae&type=thing&subtype=boardgame&page=001'

  $.ajax({
    datatype: 'xml',
    url: BGG_API_URL,
    success: function (xml) {
      console.log('bgg success')
      var $lastPlay = $(xml).find('play')[0]
      var $lastPlayItem = $($lastPlay).find('item')

      var name = $lastPlayItem[0].attributes['name'].value
      var id = $lastPlayItem[0].attributes['objectid'].value
      var date = $lastPlay.attributes['date'].value

      if (name && id && date) {
        $('.bggLastGamePlayed').html(`Latest game: ${date}<br /><a href='https://boardgamegeek.com/boardgame/${id}'>${name}</a>`)
      } else {
        console.log('bgg api error')
      }

      if ($('.apiData.bgg').prop('display') != 'block') {
        $('.apiData.bgg').show()
      }
    },
    error: function (e) {
      console.log('Could not get bgg data', e)
    }
  })
})
