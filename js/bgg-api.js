$(function() {
  var bggApiUrl = 'https://www.boardgamegeek.com/xmlapi2/plays?username=nebyoolae&type=thing&subtype=boardgame&page=001'

  $.get(bggApiUrl).done(function (xml) {
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

    if ($('.apiData').prop('display') != 'block') {
      $('.apiData').show()
    }
  })
})
