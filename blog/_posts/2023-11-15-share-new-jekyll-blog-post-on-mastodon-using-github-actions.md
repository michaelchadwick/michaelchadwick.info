---
layout: post
title: "Share New Jekyll Blog Post on Mastodon Using Github Actions"
tags: automation github github-actions jekyll mastodon
published: true
---

Now that I use Mastodon as my daily social media outlet, I want to automagically share any new posts on my blog as a new toot. My blog is kept in a git repo, and shared on Github, so I figured I could use Github Actions to do this.

Here is my journey to do just that.

<!--more-->

## WHY?

Github Actions are YAML config files you write to trigger some kind of event to take place when a Github-related action occurs (e.g. push, pull release). You can even write Github Actions that others can use, and I used [one of them](https://github.com/cbrgm/mastodon-github-action) to make my action easier to write.
