---
title: Nebyooweb.com Update
date: 2010-12-11T12:31:25-08:00
layout: post
tags:
  - cakephp
  - jquery
  - nebyooweb.com
  - web-development
---
I&#8217;m still working on it, but the new version of Nebyooweb.com is coming along nicely. Overall, it has a brand-new look, but is still on CakePHP. Once this iteration is done, I&#8217;m going to try to actually move it to Ruby on Rails.

The main layout is now liquid. There&#8217;s a new title, logo, and main nav links. There&#8217;s even a cheesy tagline :-P

<!--more-->

I&#8217;ve updated the homepage to show all my projects instead of an intro message + random project. The blurb got moved to my about page, since it seems more relevant, and more professional there. The resume section has gotten the biggest update so far. The logic behind it is more sound, and there are format links for text, pdf-printable, and regular-printable. When you click the latter two, a sweet (though unoptimized at this point) jQuery animation transition &#8220;transforms&#8221; the page into that format. If you don&#8217;t have JS turned on, then it just does a normal HTTP request and uses the layout, so you get the format, but not the transition.

Even the contact form got some graphical updates as the form elements look cooler.

Things left to do:

  * Add selected blog postings from here that have to do with web development
  * Fix flash message position/animation
  * I might still try to get wkhtmltopdf to work, but it may be too much work
  * Write a capistrano recipe for deployment

Hopefully, as a friend said recently, this will actually improve my standing in the pantheon of web developers. If not, it was at least a fun exercise.
