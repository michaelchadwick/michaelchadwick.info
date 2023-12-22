---
title: Google Chrome Stable (version 7)
date: 2010-10-20T15:11:01-07:00
layout: post
tags:
  - bugs
  - fallout
  - google-chrome
  - webdev
---
Switching to Chrome from Firefox a while back was pretty much a sweet move. Nothing again Firefox, which is a great browser and one I used for a long time proudly, but the interface and design of Google&#8217;s now pretty-popular app has won me over. The two things initially keeping me away, plugins/extensions and Firebug, have been ameliorated by beefing up the catalog and making peace with the Web Inspector.

<!--more-->

Initially I started with their stable release. After getting comfortable I dabbled in the beta (dev) and alpha (nightly) channels. Getting new fixes and features immediately was something that was fun and cutting-edge. Unfortunately, an odd bug cropped up on a site that my friend and I work on, [More Things Need To](http://morethingsneed.to "More Things Need To") (a Mad-Libs-inspired web app with user-generated content that&#8217;s fun to contribute to and read).

**The Issue**: anytime you click on something that fires some AJAX, Chrome&#8217;s JavaScript console responds with:

`Failed to load resource: the server responded with a status of 405 (Method Not Allowed)`

Currently, that means you can&#8217;t submit an entry or comment, nor can you vote. All other browsers don&#8217;t exhibit this issue. Chrome worked fine at version 6, so pushing the dev channel to stable and announcing it fixes a bunch of bugs with this result isn&#8217;t the most ideal world.

I figure it&#8217;ll get fixed soon (much like the bugs in Fallout: New Vegas are going to get squashed imminently), but in the meantime LIFE IS PAIN (in this really specific instance).
