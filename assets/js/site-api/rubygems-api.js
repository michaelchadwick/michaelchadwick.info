$(function() {
  var RUBYGEMS_API_URL = 'https://rubygems.org/api/v1/gems.json'

  $.ajax({
    url: RUBYGEMS_API_URL,
    type: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', '84035edcea278c14f1e277b28bc8f43d')
    },
    data: {},
    dataType: 'json',
    success: function (data) {
      console.log('rubygems data', data)
    },
    error: function (e) {
      console.error('Could not get rubygems data', e)
    }
  })
})
