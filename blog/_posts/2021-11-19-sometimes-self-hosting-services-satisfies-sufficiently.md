---
layout: post
title:  "Sometimes Self-Hosting Services Satisfies Sufficiently"
tags: self-hosted webdev freshrss homer neb.host wallabag roundcube drupal linode vue-js minecraft wordpress jekyll-rb hugo
headerImage: posts/self-hosted.jpg
---

Over the years, the way I've used the Internet has changed: initial discovery through a modem and AOL, creating my own little space on a local ISP's at `/~username`, always-on broadband in college, and then residential service that I've now had for nearly 2 decades.

Once you're online all the time, you start using it a lot more. I've used the popular services everyone else uses, like Google and Wikipedia, but also toyed with running my own services on some server somewhere, usually shared. Issues of privacy and security are definitely relevant here, but customization and control are even more important to me.

<!--more-->

Around 2017 I finally got my own Linux virtual machine in the _cloud_, and have been messing around with it since then. Various jobs have given me some basic UNIX skills, so I could figure out what I needed to when it came up, but for the most part I just used it as I used earlier shared servers: a file server. I just wanted a place to store and link to cool stuff I found or made! Give me `mysql` and `php` and I can get a quick dynamic web frontend going to look in a directory for stuff and then display an interface to get at them. But one can do so much more!

I like knowing how things work. Becoming a programmer meant that I could use a computer and not just wonder about how it all worked, but also _know_ and even _change_ things. This means that even though Bandcamp exists, and is amazing!, I still want to see if I can build it myself. And so, a recent surge of inspiration has hit me and I'm configuring a bunch of homegrown services for things I would normally use external sites for.

## WHEREIN I LIST THE THINGS I'VE GOT MORE OR LESS DONE

### DASHBOARD

[Homer](https://github.com/bastienwirtz/homer) is a great little [Vue.js-powered](https://vuejs.org) project that quickly allows you to create a SPA dashboard for your server. You can see mine [here](https://neb.host), and it displays some links to stuff I work on or maintain.

### READ-IT-LATER

[Pocket](https://getpocket.com) has been invaluable to me for many years. There's so much great stuff on the Internet to read or watch or listen, uh, to (why is there no one-word aural verb?), but keeping track of it all has many solutions. Pocket is well-supported, works everywhere, and has great interfaces on every platform.

That being said, what it actually _does_ is replicated rather easily by [Wallabag](https://www.wallabag.it). The name doesn't verb as well, but it's memorable and cute. The current iOS app is not as polished as Pocket's, but I usually read stuff later on a computer, and the mobile version of the webapp it provides works fine.

## WHEREIN I LIST THE THINGS I'M WORKING ON

### BANDCAMP/SOUNDCLOUD

Work continues apace on my [custom Bandcamp for one](https://music.nebyoolae.com) in Drupal ~~8~~**9**. Whenever I release new music, I try to add it there, as well. Basic functionality is fine, but it's rough around the edges, and I just never seem to go back to sand them off.

### RSS

When Google Reader went under, I migrated to [Feedly](https://feedly.com). Yet another amazing web service that I've used for many years, Feedly is hard to beat. The Internet told me that [FreshRSS](https://freshrss.org) was the best open-source, self-hosted project, so I'm trying it out, but running into some issues with logging in and the general interface. It could just be the usual growing pains of setting something custom up, but I may also try something else. Until then, Feedly wins.

### EMAIL

I've half-heartedly used domain mail on whatever server I was using at the time for a while now. Running a mail server is rife with issues, though, and so I've never used it as my primary contact point. Gmail is a behemoth, but it also works nearly flawlessly, so I keep using it.

My latest attempt at personal domain email is with [Roundcube](https://roundcube.net), via `postfix` and `dovecot`. I'm not sure why, but it seems like something randomly dies on my server about once every few months, causing mail to not get delivered, and requiring a service restart at best, or a trip back to Tutorial Land at worst, so this is a constant struggle. Roundcube's interface is also quite slow, especially compared to Gmail.

I may try something else someday, but I also barely use email except for confirmation and notification emails, so my interest in this is usually quite low.

### MINECRAFT

In the early days, I tried running a Minecraft server from wherever I had shared space at the time. It worked pretty well, but the hardware resources I had were minimal, so it was prone to issues. Later, I tried Minecraft Realms, which was good, but didn't give end users much control.

For several years, our family then used [CubedHost](https://cubedhost.com), and they were rad the whole time. Very few issues ever crept up, and when they did the support was amazing.

Since my inspiration to use self-hosted stuff has bloomed, however, I decided to stop using them since I bumped the CPU/RAM on my virtual Linux server, and now I'm back to self-hosting an instance again using a custom [systemd script](https://gist.github.com/justinjahn/4fe65b552b0622662420928cc8ffc7c0) to launch instances via `screen`.

It eats up a lot of memory and CPU even when no one is using it, however, so I'm also looking into something to ameliorate that situation.

## WHEREIN I LIST THE THINGS I'M THINKING ABOUT WORKING ON

### VERSION CONTROL SYSTEM

[Github](https://github.com) is still pretty much the best place to put code you want to easily version and share, but [Gitlab](https://gitlab.com) is definitely worth looking into. I tried once a while ago, but never got very far. The litany of projects I've created over the years seems a bit overwhelming, so I'm going through them and trying to reduce or consolidate what I have before making any large migration effort.

### CHAT

I know someone who works (worked?) heavily in the [Matrix](https://matrix.io) space, and so I've used [Riot/Element](https://element.io) to chat with people using it. However, pretty much everyone else I know uses some other system, be it Slack, FB Messenger, Google Chat, or just text messaging. It would be great if everyone could be on some decentralized, federated something or other (I guess?), and then I could just use the one client for all of them, and I could set up my own home server, but until then I will continue to use multiple closed-source clients.

### PASSWORD MANAGER

A good friend got me a license to [1Password](https://1password.com) forever ago, and that thrust me into the modern era of generating random alphanumeric passwords for sites so I can be a good netizen. Unfortunately, it still syncs over Dropbox or iCloud, so I'm running risky. Maybe a self-hosted thing is something to look into...?

## WHEREIN I LIST THE THINGS THAT WERE ALREADY SELF-HOSTED

### BLOGS

I have two blogs that get updated...occasionally. One is for [music](https://blog.nebyoolae.com), and one is for [dev](https://codaname.neb.host). The former is [Wordpress](https://wordpress.org), because it was initally an easy place to migrate my old LiveJournal into and then continue updating; the latter has always been [Jekyll-powered](https://jekyllrb.com), and it works pretty well! I've also used [Hugo](https://gohugo.io) for a project, and it works well, too.

## FOR THE ROAD

Going 100% open-source, self-hosted is not in my immediate future, as I still love using my Mac, many closed-source (and oftentimes paid) software apps, and Google/Microsoft services. A good mix of both works for me now, and the few but mighty amount of projects I've taken on gives me plenty to tinker with in the meantime.
