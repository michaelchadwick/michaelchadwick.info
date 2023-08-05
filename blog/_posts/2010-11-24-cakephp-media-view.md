---
title: CakePHP Media View
date: 2010-11-24T17:12:30-08:00
layout: post
tags:
  - cakephp
  - mediaview
  - webdev
---
Anyone else out there using CakePHP 1.2 and trying to use the Media View component? I&#8217;m trying to hide the actual location of the MP3s on nebyoolae.com to make it seem more professional and give me more control over counting downloads (and maybe it&#8217;ll lower the number of random websites direct linking to songs).

<!--more-->

I&#8217;ve tried two methods of implementation I found online ([method 1](http://book.cakephp.org/view/489/Media-Views), [method 2](http://cakedc.com/florian_kraemer/2010/01/25/file-uploading-file-storage-and-cakephp-mediaview-class)), but neither seem to work, both resulting in a blank screen save for debug info. No file downloads, no request for the file is even made, nothing appears in logs, and no errors occur in the console. Debugging the parameters shows everything being correct and the file/folder where the media exists are accessible by my local machine, so I don&#8217;t know what&#8217;s up.
