$(function() {
	$.ajax({
  	dataType: 'json',
  	url: 'http://codana.me/pages.json',
  	success: function (data) {
			var entries = data.entries;
	    var post = entries[entries.length-1];
			var postDate = post.url.substr(1,10);
			var postTitle = post.title;
			var postUrl = "http://codana.me" + post.url;
			postDate = replaceAll(postDate, '/', '-');
			$('.blogCodaname').html('<span>Latest post: ' + postDate + '<br /><a href="' + postUrl + '">' + postTitle + '</a></span>');
			if ($('.apiData').prop('display') != 'block') {
				$('.apiData').show();
			}
	  }
	});

	function replaceAll(str, find, replace) {
	  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	function escapeRegExp(str) {
  	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
});
