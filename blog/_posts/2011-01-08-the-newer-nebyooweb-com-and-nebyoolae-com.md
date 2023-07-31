---
layout: post
title: The New(er) Nebyooweb.com and Nebyoolae.com
date: 2011-01-08T12:02:54-08:00
tags: bugs cakephp jquery nebyoolae.com nebyooweb.com ruby-on-rails web-development wrapup
headerImage: posts/2011/01/ss_nebyooweb.png
---

My two flagship websites, [Nebyooweb.com](http://nebyooweb.com) (web portfolio), and [Nebyoolae.com](http://nebyoolae.com) (original music), have been updated to versions&#8230;uh&#8230;they&#8217;re newer.

Nebyooweb.com (Nebyoolae + web; genius, I know) is my personal web development/design portfolio. If anyone wants to know how I build websites, then this is a good portal. This new version has quite a few changes.

<!--more-->

It now has a web development blog on the front page (culled from this blog), with a little &#8220;Latest Project&#8221; widget, too. Sections include Projects, where descriptions of sites I&#8217;ve done exist, Resume for a more traditional view of my web development history, a short About page, and the ubiquitous Contact form.

The look of it has been completely revamped, going from a fixed width to a dynamic one based on the browser window. When I made the previous version, I wanted something that fit in a single, portrait window, so making it fixed-width made sense. Unfortunately, I usually use my computer at a high resolution, leaving a lot of unused whitespace visible, making the site seem overly empty. Using a liquid design makes sure that no part of the window looks so&#8230;barren.

I didn&#8217;t have a blog of any sort on the old site, and that was a mistake. Besides showing off what you&#8217;ve done, most people want to know you can talk about it, too. Making a separate dev blog just for this site was unnecessary when I was already making dev posts here. I found a [PEAR component](http://pear.php.net/package/XML_RSS) that would help me parse Lazy in the Blog&#8217;s public RSS feed for specific posts and then display them here. Mission accomplished.

The about page removed a lot of pretentious and unneeded cruft about the technologies I use. For the record, the site is built using PHP via the CakePHP 1.2 framework. It&#8217;s XHTML 1.0 compliant and uses mainly CSS2 with some CSS3 garnishes for flavor. User interaction here and there is accomplished with jQuery.

My resume got updated and the ways in which you can view it are new. Besides the carried-over text-only view, you can now change it to a PDF-printable version, perfect for printing to PDF if on a Mac, or using a plugin like CutePDF on Windows. Finally, a generic printable version that&#8217;s not as bare-bones as the text-only view has been added, for printing to paper. I spent a lot of time getting the neat transition animation to work, but it&#8217;s not optimized yet.

The contact form is pretty much the same, but it works with AJAX now, giving better feedback to the user about required fields and whether the message got sent or not.

All in all, I&#8217;m happy with the new look and added functionality. Using CSS3 is fun because it allows me to make rounded corners and shadows without having to make images in Photoshop. I&#8217;m not a great visual artist, so any programmatic tools to get around having to make little graphics is helpful.

##### NEBYOOLAE.COM

<img aria-describedby="caption-attachment-4008" data-attachment-id="4008" data-orig-file="{{ site.baseurl }}/assets/images/posts/2011/01/ss_nebyoolae.png" data-orig-size="845,561" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;}" data-image-title="ss_nebyoolae" data-image-description="<p>Nebyoolae.com screenshot</p>
" data-image-caption="<p>Nebyoolae.com</p>
" data-medium-file="{{ site.baseurl }}/assets/images/posts/2011/01/ss_nebyoolae-640x424.png" data-large-file="{{ site.baseurl }}/assets/images/posts/2011/01/ss_nebyoolae-800x531.png" loading="lazy" class="size-medium wp-image-4008 " title="ss_nebyoolae" src="{{ site.baseurl }}/assets/images/posts/2011/01/ss_nebyoolae-640x424.png" alt="Nebyoolae.com" width="448" height="297" srcset="{{ site.baseurl }}/assets/images/posts/2011/01/ss_nebyoolae-640x424.png 640w, {{ site.baseurl }}/assets/images/posts/2011/01/ss_nebyoolae-800x531.png 800w, {{ site.baseurl }}/assets/images/posts/2011/01/ss_nebyoolae.png 845w" sizes="(max-width: 448px) 100vw, 448px" />

Whereas Nebyooweb.com is more consistent in look and color scheme, Nebyoolae.com has always been more of a playground. I started it as my &#8220;personal homepage&#8221; sometime back in the 1990s, and its focus has ebbed and flowed with each variation. Initially, it was probably more of a free-for-all, but then narrowed to just music. Later it added pictures and videos as I made them. Then it later got stripped back down to just music in 2003, as well as getting a dynamic overhaul when I changed everything to PHP and created a database for all of the music I&#8217;d created up to that point. Now I could more easily look up albums and songs and display them in more useful ways. I even made an administration side that allowed me to add and edit information without having to edit the database directly or raw HTML files. It was the first &#8220;modern&#8221; version of Nebyoolae.com.

Since then, I moved it from vanilla PHP to CakePHP, a framework that speeds up the creation of dynamic websites by doing a lot of the initial scaffolding. Most sites are just interfaces to a database, and frameworks know this and harness the conventions established by millions of web designers to formalize things so it can build a skeleton of your web site before you even begin to type anything. This, I like. Once all that was set up, I really needed to work on the user experience, which was the focus for the latest update.

The homepage is no longer a blog, but the main albums index. Blog entries still exist, but are now relegated to a small box, hidden until clicked on. They are parsed from the same RSS feed as Nebyooweb.com, just with a different category. While I think that blog entries are important, music should be the thrust of why people are here.

Song views never sat right with me, aesthetically. I just couldn&#8217;t figure out how I wanted to display all of the related information at the top. My latest design uses a faux-gradient style with a larger font that I really like. Song comments and ratings have been flawed for a while. The design was rough and the AJAX was minimal or wonky. Now, comments are added dynamically and ratings update correctly, all without refreshing the whole site. The song search function has been fixed and improved, as well. Start typing and it dynamically loads the songs that match below. A small delay is created before doing a lookup so that each _350ms period of combined_ keypresses, and not each individual one, is sent, limiting the DB queries.

The tag cloud was always a point of contention. Horizontal lists made things difficult to read, as it would look like one long, run-on sentence. My friend suggested I use columns of a few items each, with the remainder moving rightward to a new column until it wrapped onto the next line, which is what ended up making the cut. I still haven&#8217;t implemented a _weighted_ tag display (showing, usually by size, a tag&#8217;s relative importance), which would be ideal, but that will come in a later variation.

The studio information page hasn&#8217;t changed, but the about page&#8217;s overall length got truncated, to minimize scrolling. I buffed up the description a bit, but made the gallery slideshow smaller. Images now change with a minor fade.

##### PLANS FOR THE FUTURE

One thing that was not included in these revisions was any kind of significant update to the administrative side. The public-facing part was most important, since that&#8217;s what everyone sees, so I made it the focus.

Nebyooweb.com will be changed from CakePHP to Ruby on Rails and the resume transition will be optimized. Nebyoolae.com will most likely have its fixed-width design changed to a liquid one, and the Flash player for songs may change to HTML5 once that becomes more standardized. The color palette will also be reduced and made more consistent.
