/* global $ */

$(function() {
  const minFont = 1.0
  const maxFont = 2.5
  const diffFont = maxFont - minFont
  let size = 0
  let max = 1.0
  const tags = document.querySelector('#tags').dataset.tags

  console.log('tags', tags)

  const tagsJSON = JSON.parse(tags)

  console.log('tagsJSON', tagsJSON)

  for(var t in tags) {
    if (t.size > max) {
      max = t[1].size
    }
  }

  var index = 0
  for(var tag in tags) {
    size = (Math.log(tag[1].size) / Math.log(max)) * diffFont + minFont
    $(`${index}`).css('font-size', size + 'em')
  }

  $('#tag-cloud a[class^="tag"]').click(function() {
    $('.post-list').empty()
    $('#list_' + $(this).attr('id')).each(function() {
      $('.post-list').append('<ul>' + $(this).html() + '</ul>')
    })
  })
})
