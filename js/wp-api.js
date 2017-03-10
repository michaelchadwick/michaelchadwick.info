var BLOG1 = 'http://blog.nebyoolae.com';
var BLOG1_LIMIT = 1;
var MYWRAPPER_CLASS = 'blogNebyoolaeCom';

// main WP object
var WP={
  open:function(b){
    console.log("b",b);
    var a={
      posts:function(){
        var d=BLOG1_LIMIT;
        var e=0;
        var c={
          all:function(g){
            var f=b+"/api/get_recent_posts/";
            //console.log("made it");
            f+="?count="+d+"&page="+e+"&callback=?";
            //console.log("made it");
            jQuery.getJSON(f,function(l){
              console.log("main getJSON first success");
              var k=l.posts;
              for(var j=0;j<k.length;j++){
                var h=k[j];
                h.createComment=function(i,m){
                  i.postId=h.id;
                  a.comments().create(i,m)
                }
              }
              g(k);
            })
            .done(function() {
              //console.log("main getJSON second success");
            })
            .fail(function() {
              console.log("main getJSON failed");
            })
            .always(function() {
              //console.log("main getJSON");
            });
          },
          findBySlug:function(f,h){
            var  g=b+"/api/get_post/";
            g+="?slug="+f+"&callback=?";
            jQuery.getJSON(g,function(i){
              h(i.post)
            })
          },
          limit:function(f){
            d=f;
            return c
          },
          page:function(f){
            e=f;
            return c
          }
        };
        return c
      },
      pages:function(){
        var c={
          findBySlug:function(d,f){
            var e=b+"/api/get_page/";
            e+="?slug="+d+"&callback=?";
            jQuery.getJSON(e,function(g){
              f(g.page)
            })
          }
        };
        return c
      },
      categories:function(){
        var c={
          all:function(e){
            var d=b+"/api/get_category_index/";
            d+="?callback=?";
            jQuery.getJSON(d,function(f){
              e(f.categories)
            })
          }
        };
        return c
      },
      tags:function(){
        var c={
          all:function(e){
            var d=b+"/api/get_tag_index/";
            d+="?callback=?";
            jQuery.getJSON(d,function(f){
              e(f.tags)
            })
          }
        };
        return c
      },
      comments:function(){
        var c={
          create:function(f,e){
            var d=b+"/api/submit_comment/";
            d+="?post_id="+f.postId+"&name="+f.name+"&email="+f.email+"&content="+f.content+"&callback=?";
            jQuery.getJSON(d,function(g){
              e(g)
            })
          }
        };
        return c
      }
    };
    return a
  }
};

window.addEventListener('error', function(e) {
  console.log("WP error", e);
}, true);

// connect to blog
var blog = WP.open(BLOG1);
//console.log("blog",blog);
//console.log("blog.posts.length", blog.posts.length);
var postDate, postTitle, postUrl = "";

// run through all posts and grab info
blog.posts().all(function(posts){
  //console.log("posts.length", posts.length);
  if (posts.length > 0) {
    for(var i = 0; i < posts.length; i++){
      jQuery('.'+MYWRAPPER_CLASS).append(function(){
        postDate = posts[i].date.substr(0,10);
        postTitle = posts[i].title;
        postUrl = posts[i].url;
        return ('<span>Latest post: ' + postDate + '<br /><a href="' + posts[i].url + '">' + posts[i].title + '</a></span>');
      });
    }
    if ($('.apiData').prop('display') != 'block') {
      $('.apiData').show();
    }
  } else {
    return ('<span>No posts.</span>');
  }
});
