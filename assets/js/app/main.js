$(function () {
  // find links and change their <li> background to be their favicon
  $('ul.links li a.favicon[href^="http"]').each(function () {
    $(this).parent().css(
      'list-style-image', `url('https://www.google.com/s2/favicons?domain=${this.hostname}')`
    )
  })

  // change the theme to day/night
  $style = $('style#theme')
  $('div#theme a.light').on('click', function () {
    $style.html('@import url("assets/css/theme/light.css")')
  })
  $('div#theme a.dark').on('click', function () {
    $style.html('@import url("assets/css/theme/dark.css")')
  })
})
