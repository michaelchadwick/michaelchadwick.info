---
layout: post
title:  "Excluding Pages from Top Navigation in Jekyll"
tags: jekyll customization navigation layout webdev
published: true
---
While dynamic creation of collections of variables is often a very helpful thing, sometimes it treats all its members the same, even though they are not. Jekyll, the tech that creates this very site, is a bit non-picky about what it puts in its site-wide navigation, but it can be taught.

<!--more-->

[Jekyll](https://jekyllrb.com) is a neat static-site generator written in Ruby. It allows me to have a blog without a database, as I can just write stuff in specifically-named and specifically-located files that the generator (i.e. Jekyll) knows how to process into the actual content that my site consists of (which is what gets deployed to my host, [Github](https://github.com)). The blog post you're reading right now is a good example of that.

Another good example is essentially *any page that isn't a blog post*. As each of them critters get created, the header layout (at least in boilerplate Jekyll) of the site auto-adds each one to the site-wide navigation in the top-right.

{% highlight html %}
<a class="page-link" href="/subdir1/">Subdir1</a>
<a class="page-link" href="/subdir2/">Subdir2</a>
<a class="page-link" href="/subdir3/">Subdir3</a>
{% endhighlight %}

In general, this is cool, but not every page is something you might want to show up in that navigation. For instance, some may be additional pages inside a section of the site that you only want the index page of that section linked.

There are likely many ways to accomplish the task of excluding them, but one quick and easy way I found is to simply harness the power of Jekyll's [Front-matter](https://jekyllrb.com/docs/frontmatter/) for any page you want to exclude. It's a simple two-step process:

<ol>
  <li>Add an `unless` clause to your site-wide navigation block (this is boilerplate Jekyll, with percent signs missing as they were being parsed, btw):

    { for page in site.pages }
      { unless page.exclude_from_nav }
        <a class="page-link" href="{ page.url | prepend: site.baseurl }">
          { page.title }
        </a>
      { endunless }
    { endfor }
  </li>
  <li>Create a custom variable in the Front-matter section of the page you don't want to be automatically added that matches the one above:

    ---
    layout: default
    title: SubDirPage2
    exclude_from_nav: true
    ---
  </li>
</ol>

Voila! That page is now safely hidden until you link to it in some laborious, *manual* way.
