---
title: Making a Better Web Portfolio
date: 2010-12-08T08:50:23-08:00
layout: post
tags:
  - nebyoolae.com
  - nebyooweb.com
  - organization
  - redmine
  - webdev
published: true
---
I&#8217;ve had the domain [nebyoolae.com](http://nebyoolae.com) since 03/03/2003 (wow, I swear I didn&#8217;t pick that day for any particular reason). Before that I had some personal websites, but they didn&#8217;t have the distinctive vanity address that I eventually picked out for myself. Generally, it&#8217;s been a place to showcase my original music, and it&#8217;s been fun updating it every year or so with a new look or technology. Music hasn&#8217;t been a very profitable business, however, and so in 2009 I bought [nebyooweb.com](http://nebyooweb.com), ostensibly to showcase my very web development skills themselves.

<!--more-->

Whereas &#8220;blueish&#8221; was my color scheme for nebyoolae.com, I decided to go with &#8220;greenish&#8221; as a foundation for nebyooweb.com. It started out really simple and has gotten a bit more complex, adding things like a contact form and the ability to sign up as a user to get at special areas, as it went through a couple iterations. Last night I started work on yet another iteration, and (as usual) it&#8217;s the best one yet. The new look is much better and the code will be refactored to a degree that contents me&#8230;for now.

The most recent version used a static layout set to about 800 or so pixels, which was really just an extension of what I&#8217;d done with the layout of nebyoolae.com at the time. Each site influences the other as I&#8217;m often developing them concurrently. For my latest attempt I figured I&#8217;d go with a liquid layout because I always use my computer at a resolution of 1280 x (1024 desktop/800 laptop) and all the empty space offended my design aesthetic. However, the drawback is you have to plan for the &#8220;flow&#8221; of things so that depending on how big the browser is and how many items are on the screen it still looks good. Seeing everything slide around as you change the dimensions of your browser is immensely satisfying for some reason, though.

I&#8217;ve always been a proponent of using pure CSS for graphical details (corners, gradients, shadows) just because it means I don&#8217;t have to create a separate graphic and future updates are more flexible. CSS3 is being taken advantage of as much as possible this time around, eschewing JS when I can, because I care less about coding for every possible browser possibility. It&#8217;s a bit elitist and lazy, but I use Google Chrome all day, which uses WebKit, and it rules. If I&#8217;m using the site as a way to possibly get jobs, do I still really want to work with someone who only uses IE 7? In the end, I may relent just to make the site more accessible, but for now I&#8217;m just gonna let it go.

Updating nebyooweb.com also means updating my resume, since it&#8217;s really just a prettier, more interactive representation of one. However, I still want a &#8220;regular&#8221; resume that can be easily copied/downloaded for all cases. My current CakePHP controller for handling my resumes needs updating, and the resume information itself really needs to be in a database, rather than hard-coded into the views (go ahead and shame me).

The problem with updating any existing site is that there&#8217;s rusty knowledge of how things work, and you&#8217;ve probably gotten better at coding since last maintaining it, and that means noticing crappy code. Unfortunately, I sometimes take shortcuts that produce a desired, if not always elegant, result. Wading through this a year later is a struggle, and the pangs of just starting the whole thing over burn ever bright. In fact, **I will end up doing just that** once I (re)start the Ruby on Rails version of nebyooweb.com. Learning a whole new language and way to construct a website is a harrowing task, as it first was when I turned nebyoolae.com from Generic PHP to CakePHP. Thankfully, I have a friend who is already knowledgeable and can help me out.

All this is to say that nebyooweb.com will be looking different soon, I really want to work on it instead of not working on it right now, and [Redmine](http://redmine.org) is great.
