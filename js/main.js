$(function(){
  var favicon_src = "";
  var $link = "";

  $("ul.links li a[href^='http']").each(function() {
    $(this).parent().css("list-style-image", "url('https://www.google.com/s2/favicons?domain=" + this.hostname + "')");
  });
});
