/* global $ */

$(function () {
  var cw = 'https://api.coderwall.com/michaelchadwick/endorsecount.png'

  $.ajax({
    url: cw,
    success: function (data) {
      $('#social-links').append("<li><a href='https://coderwall.com/michaelchadwick'><img alt='Endorse michaelchadwick on Coderwall' src='https://api.coderwall.com/michaelchadwick/endorsecount.png' /></a></li>")
    }
  })
})
