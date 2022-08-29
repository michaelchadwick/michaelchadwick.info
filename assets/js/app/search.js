/* global $, SimpleJekyllSearch */

$(function () {
  let jsonPath = '/blog/search.json'

  SimpleJekyllSearch.init({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    dataSource: jsonPath,
    json: jsonPath,
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    noResultsText: 'No results found',
    limit: 5,
    fuzzy: false
  })

  $('#search-input').on('focus', function () {
    $(this).addClass('selected')
    $(this).parent().addClass('selected')
    $('.overlay').addClass('enabled')
  })
  $('#search-input').on('blur', function () {
    $(this).removeClass('selected')
    $(this).parent().removeClass('selected')
    $('.overlay').removeClass('enabled')
  })

  // window.addEventListener('message', event => {
  //   // IMPORTANT: check the origin of the data!
  //   if (event.origin.startsWith('https://neb.host/omni')) {
  //       // The data was sent from your site.
  //       // Data sent with postMessage is stored in event.data:
  //       console.log('message from omni', event.data);
  //   } else {
  //       // The data was NOT sent from your site!
  //       // Be careful! Do not use it. This else branch is
  //       // here just for clarity, you usually shouldn't need it.
  //       return;
  //   }
  // });
})
