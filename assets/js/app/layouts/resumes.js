$(function () {
  const RESUME_RESET_CODE = 46 // delete

  function makePrintable () {
    $('a#linkMakePrintable').click(function (e) {
      e.preventDefault()

      // make pretty
      $('.removeable').animate({
        'opacity': '0'
      }, 100, function () {
        $(this).slideUp()
      })

      $('div#header').slideUp(500, function () {
        $('div#footer').slideUp(0, function () {
          $('body')
          .css({
            'margin': '0'
          })
          $('div#content, div#content a, div#content .head, div#content .jobname,')
          .css({
            'background-color': '#fff',
            'box-shadow': 'none',
            '-moz-box-shadow': 'none',
            '-webkit-box-shadow': 'none',
            'color': '#000'
          })
          $('div#content h3')
          .css({
            'margin-top': '0'
          })
          $('div#content .head')
          .css({
            'border-left': '0',
            'border-right': '0',
            'font-weight': 'bold',
            'text-shadow': 'none'
          })
          $('div#content .jobname img')
          .css({
            'display': 'none'
          })
        })
      })
    })
    unmakePrintable()
  }

  function unmakePrintable () {
    $(document).keyup(function (e) {
      if (e.keyCode === RESUME_RESET_CODE) {
        e.preventDefault()

        $('div#header').slideDown(500, function () {
          $('div#footer').slideDown(0, function () {
            $('body')
            .animate({
              'margin': '0'
            }, 500, function () {
              $('div#content')
              .css({
                'background-color': '#eee1c6',
                'box-shadow': '0 0 12px #666',
                '-moz-box-shadow': '0 0 12px #666',
                '-webkit-box-shadow': '0 0 12px #666',
                'border': '0',
                'margin': '0',
                'overflow': 'hidden',
                'padding': '25px 20px',
                'text-align': 'left'
              })
              $('div#content a')
              .css({
                'background': 'none',
                'color': '#b34700'
              })
              $('div#content h3')
              .css({
                'margin-top': '0.7em'
              })
              $('div#content .head')
              .css({
                'background': '#6a8347',
                'border-bottom': '1px solid #000',
                'border-left': '1px solid #000',
                'border-right': '1px solid #000',
                'box-shadow': 'inset 3px 3px 6px #555',
                '-moz-box-shadow': 'inset 3px 3px 6px #555',
                '-webkit-box-shadow': 'inset 0 0 20px #555',
                'color': '#fff',
                'text-shadow': '1px 1px 1px #000'
              })
              $('div#content .jobname')
              .css({
                'background': '#baffc1'
              })
            })
          })
        })

        // unmake pretty
        $('.removeable').animate({
          'opacity': '1.0'
        }, 100, function () {
          $(this).slideDown()
        })
      }
    })
  }

  function makePDFable () {
    $('a#linkMakePDFable').click(function (e) {
      e.preventDefault()

      // make pretty
      $('.removeable').animate({
        'opacity': '0'
      }, 100, function () {
        $(this).slideUp()
      })

      $('div#header').slideUp(500, function () {
        $('div#footer').slideUp(0, function () {
          $('body')
          .animate({
            'margin': '8px'
          }, 500, function () {
            $('div#content')
            .css({
              'border': '1px solid #111',
              'box-shadow': 'inset 3px 3px 6px #555',
              '-moz-box-shadow': 'inset 3px 3px 6px #555',
              '-webkit-box-shadow': 'inset 0 0 20px #555'
            })
          })
        })
      })

      $('h3').animate({
        'margin-top': '0'
      }, 100)
    })
  }

  function unmakePDFable () {
    $(document).keyup(function (e) {
      if (e.keyCode === RESUME_RESET_CODE) {
        e.preventDefault()

        // unmake pretty
        $('div#header').slideDown(300, function () {
          $('div#footer').slideDown(0, function () {
            $('body')
            .animate({
              'margin': '0'
            }, 150, function () {
              $('h3')
              .animate({
                'margin-top': '8px'
              }, 200, function () {
                $('div#content')
                .animate({
                  'border': 'none'
                }, 250, function () {
                  $(this)
                  .animate({
                    'box-shadow': '0 0 12px #666',
                    '-moz-box-shadow': '0 0 12px #666',
                    '-webkit-box-shadow': '0 0 12px #666'
                  }, 300)
                })
              })
            })
          })
        })

        $('.removeable').animate({
          'opacity': '1.0'
        }, 100, function () {
          $(this).slideDown()
        })
      }
    })
  }

  makePDFable()
  makePrintable()
})
