---
layout: post
title: 'More on Self-Hosting'
date: 2023-05-08 08:26:00
tags: blog chat email rss self-hosting server update web
headerImage: posts/2023/more-on-self-hosting-2023-05-08.jpg
published: true
---

About 6 months ago I did a <a href={{ site.blogurl }}/2021/11/19/sometimes-self-hosting-services-satisfies-sufficiently">post</a> about self-hosting: installing versions of server software on your own host, rather than using services provided wholly by another entity (Gmail, Github, etc.). I talked about which services I'm currently self-hosting and which I was thinking about self-hosting.

Let's get up to speed on what my current status is.

<!--more-->

The main pro to self-hosting is <strong>control</strong>. You, the host, say what is running and how it's run.

The main con is <strong>maintenance</strong>. Sure, you also have to set up and configure the software yourself, which can be a nightmare sometimes, but it's the day-to-day maintenance, which can include patching, fixing bugs, applying security measures, dealing with increasing amounts of data (user- or self-generated), and the like.

That being said, it's a fun learning process for me just to see if I can run as many services on my own host, and it keeps me a little less reliant on other services in the case of their degredation or actual demise.

Before we get started, a good place to start on your own self-hosting journey, should you embark upon one, is <a href="https://github.com/awesome-selfhosted/awesome-selfhosted">Awesome-Selfhosted</a>. There is a <a href="https://en.wikipedia.org/wiki/Free_softwar">Free</a> alternative to just about every service you can think of.

## CURRENT SELF-HOSTED SERVICES

### DASHBOARD

[Homer](https://github.com/bastienwirtz/homer) continues to be a great way to show off all the more nerdy things I want to show off, and you can find it [here](https://neb.host).

### BLOG

You gotta have a place to express your thoughts, be they long or short, meaningful or flippant.

#### MACRO

My main <em>business-y</em> point of contact on the web is <a href="https://michaelchadwick.info">my name</a>. I incorporated a separate <a href="https://jekyllrb.com">Jekyll</a> blog from the now-defunct <strong>Codaname</strong> persona into it, and occasionally I update it...like I'm doing right now.

#### MICRO

<a href="https://joinmastodon.org">Mastodon</a> has seen a surge of popularity in the wake of a now-Elon-run Twitter, and I've decided to move my Internet blips and blorps over to it. Of course, I had to try running my own instance. It's been a while since I've done anything in Ruby on Rails, but the setup was not too painful. Updates have been easy, too. The community is more early-Internet, barely anyone I know uses it, and I don't check it obsessively, which is probably a good thing.

### CHAT

Thought about using <a href="https://matrix.org">Matrix</a>, but never got it working. Still using a combination of Slack/Discord/text for now.

### EMAIL

<a href="https://dovecot.org">Dovecot</a> and <a href="https://postfix.org">Postfix</a> and <a href="https://mutt.org">Mutt</a> has been my go-to combination for domain email for a while. I still use Gmail for 99.9% of email purposes, thought, so I don't muck with it much. When I do, however, I wish I had a webmail client instead of the CLI, but <a href="https://roundcube.net">Roundcube</a> was problematic for me (and slow), so I ditched it in favor of...nothing (for now).

### RSS

Don't get me wrong: <a href="https://feedly.com">Feedly</a> is still very, very good and recommended. However, I've always wanted something more akin to Google Reader, but self-hosted. I tried <a href="https://freshrss.org">FreshRSS</a> at one point, ran into difficulties, and gave up on it.

Recently, I tried FreshRSS <em>again</em>, mainly due to still wanting to have a self-hosted RSS reader with the requisite supported clients, and because the Internet more-or-less deems it the best. This time, for some reason, I was able to get it working to my liking, and started using <a href="https://readkit.app">ReadKit</a> on my phone (my main RSS consumer), and it's great.

### READ-IT-LATER

<a href="https://wallabag.it">Wallabag</a> may be an unusual name, but it's a great Read-It-Later service, and I'm still happy using it.

### MISCELLANEOUS

* I don't share my beautiful code very often, but when I do, I now use <a href="https://carbon.neb.host">Carbon</a>
* Installing Mastodon required me to actually learn <a href="https://nginx.com">NGINX</a>, and in order to be consistent across the board, I changed all my websites to use it, which was a <em>task</em>, but it's done.

## FOR THE ROAD

As you can see, I'm still not 100% self-hosted, but I've progressed further towards that as a potential goal. One bummer was <a href="https://linode.com">Linode</a> got acquired by <a href="https://akamai.com">Akamai</a>, which meant my monthly fee to have a VPS to run all these goodies on went up. Blergh.
