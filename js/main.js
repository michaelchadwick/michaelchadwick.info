$(function () {
  $('ul.links li a[href^="http"]').each(function () {
    $(this).parent().css(
      'list-style-image', `url('https://www.google.com/s2/favicons?domain=${this.hostname}')`)
  });
  
  $style = $('style#theme')
  $('div#theme a.light').on('click', function () {
    $style.html('@import url("css/theme/light.css");')
  })
  $('div#theme a.dark').on('click', function (link) {
    $style.html('@import url("css/theme/dark.css");')
  })
})
