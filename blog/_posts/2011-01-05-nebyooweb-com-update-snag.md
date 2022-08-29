---
title: Nebyooweb.com Update Snag
date: 2011-01-05T02:08:37-08:00
layout: post
tags:
  - dev-vs-live
  - dependencies
  - web-development
---
I was about to put up the new, much improved version of [nebyooweb.com](http://nebyooweb.com) tonight. Of course, moving from a local dev environment to a shared hosting production server is always fraught with some peril. Things are different on the server as far as location/permissions, and you might not even realize certain dependencies you&#8217;re using in your app are non-existent server-side.

I had just uploaded all the files and hit refresh on nebyooweb.com only to see a largely white screen and a scant few elements appearing. Where&#8217;s my website? I asked myself. An error message pointed me toward a library I was using for RSS parsing and I remembered at once what I needed to do. Unfortunately, when you share server space with others certain security measures have to be taken to make sure no one ruins things for others. Doubly unfortunately, this means currently I can&#8217;t install the dependency and nebyooweb.com is on hiatus until my host&#8217;s support can help me out (which they always end up doing, as they rule). My triumph of being done and showing off my new toy to the world is stunted and I will have to wait, however. Tonight&#8217;s failure will hopefully turn into tomorrow&#8217;s success.

<!--more-->
