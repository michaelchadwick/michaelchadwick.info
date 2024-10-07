---
layout: post
title: 'Blogging All the Blogs'
date: 2023-08-04 10:24:00
tags: blogging site-maintenance
headerImage: posts/2023/blogging-all-the-blogs-2023-08-04.jpg
headerImageCaption: '"blogging all the blogs" - NightCafe (model: SDXL 1.0)'
---

I've been blogging on the web for over 20 years. I started with [LiveJournal](https://livejournal.com), moved to a personal [Wordpress](https://wordpress.org), and then created a [Jekyll](https://jekyllrb.com) blog inside my public site.

Moving all of that cruft from one system to another is non-trivial, and I left a lot of old stuff in a format that couldn't be used..._until now_.

_Note_: the post header image was created using [NightCafe](https://nightcafe.studio), but the words are my own (I swear!).

<!--more-->

## MY PROCESS

Thankfully, both LiveJournal and Wordpress possess ways to export content, and so I did. Unfortunately, Wordpress exports not only the final version of a post, but also "autosave" and "revision" versions, so I had to spend some time wading through them all to get the canonical version of each post. There were 4000+ files, so it took _a bit_.

Jekyll uses a simple filename-based post format tucked into a <code>_posts</code> directory, so a blog post written in today would be something like <code>_posts/2023-08-04-blogging-all-the-blogs.md</code> (<code>.html</code> is also OK). My exported blog posts did not have that filename format, so through the combination of a couple shell scripts and [Name Mangler](https://manytricks.com/namemangler) I was able to grab a <code>date</code> meta line from the file itself and rename each file accordingly. I also needed to add a specific tag to some posts so I could hide them publicly (not everything I wrote in the past is germane to this blog, but I still want to be able to read them!).

## HICCUPS

Besides re-learning how to do string manipulation in <code>bash</code> and how to actually use <code>sed</code> (I've basically almost never used it before), the main hiccup was just dealing with a large number of files (which I segmented into folders based on the first letter in the file) and trial-and-error with the logic in my shell scripts.

However, one Jekyll-related thing that came up (that I've solved in the past but forgot how to do until now) was this warning when serving up my site:

```shell
Conflict: The following destination is shared by multiple files
          The written file may end up with unexpected contents.
          /path/to/jekyll/_site/blog/tags/[tag-name]/index.html
           - blog/tags/[tag-name]/index.html
           - blog/tags/[tag-name]/index.html
```

Most of the fixes I found on the web did not address it for me (e.g. duplicate <code>page.html</code> and <code>page.md</code>), but once I searched for the offending tag name it was obvious: <code>tag name</code> vs. <code>tag-name</code> was resulting in the same page, which is not ideal.

The fix? Make sure you only use one format or the other. I just renamed any tags that had spaces to use hyphens instead and _voil&#224;_.

## IN THE END

Now I have a way to read everything I've ever blogged in the past 20 years in one place, and I control all of the content and how it's displayed. This is the dream for all of us who, while still living in a corporate-controlled web where all your content gets locked up in a few companies' coffers, don't, like, actually want that to be true.

I'm sure many don't care about that, and will continue to post their stuff on the Facebooks, Instagrams, Twitters/Xs, Threads, and their ilk, and so be it. Maybe I'm too precious with my words and their archival, but I figure I can have it this way and still link to my blog on those spaces if I want, so it's a win-win.
