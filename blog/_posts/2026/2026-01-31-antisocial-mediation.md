---
layout: post
title: 'Anti-Social Mediation'
date: 2026-01-31
description: 'After many years of sharing my life in a public broadcast kind of way, a server upgrade kills my love for even the last bastion of social media I still use consistently.'
tags: debian facebook instagram livejournal mastodon social-media twitter
published: true
---

{{ page.description }}

<!--more-->

I just killed my single-user, hosted instance of [Mastodon](https://joinmastodon.org).

Perhaps a victim of the [binge-purge cycle](/blog/2026/01/23/the-binge-purge-tech-cycle/)?

## CONTEXT

When I first heard about Mastodon, and that it could be self-hosted, I was very interested. I've had my own Linux VPS (Virtual Private Server) for many years now, and I love to try out new self-hosted software. It started with web and file serving. Then, slowly but surely, I've been moving services that used to be on a server I had no control over to my own server which I do. I was also excited to try a social media/microblogging platform that didn't use an algorithm, nor that was owned by a tech billionaire.

My server started on Debian 9(?), and moving to 10 didn't bring any major issues, but I was also running a lot less on it. Moving to 11 also didn't bring any major issues that I can remember. Even a recent move from 11 to 12 was no big deal, but going to 13 borked several things: my mail server, a web site using Phusion Passenger, and my self-hosted version of Mastodon. The other two are going to need more research and work at some point, but I attempted to ameliorate the latter one today. Before I even started, I was tired. Knowing how something works and being able to fix it are things I value, but there's a cost to the knowledge and the application of it. I have a limit on how much I want to endure, and I guess I finally hit it today.

I've been using Mastodon for several years now, occasionally posting to it, and using it to keep up on other creative people who did fun stuff like make games, music, animations, and other art. I wish it were used by more people I know, but I understand why it is not. Regardless, I believe it truly is the best way to be social online today, in a public way, to a wide audience, without being subject to tech giant algorithm nonsense.

Unfortunately, like every other microblogging platform that has ever existed, if you don't already have an audience, it's not some guarantee to getting one. Thus, a lot of the time it felt like I was posting into a void, much like when I make a blog like this one. The blog is just a _part_ of my personal website, however, and so failing to write new blog posts often doesn't mean I can't tinker with the rest of it. Mastodon, on the other hand, is just the blog, and nothing else.

Not being a stranger to putting things online that no one looks at, this didn't bother me, and so I used Mastodon, anyway. Running a Mastodon _server_, however, can be frustrating like running any other kind of server, and the difficulty of upgrading a Linux OS coupled with some confusion about the proper `postgresql` version to use resulted in losing my years-old account and friends list and post history. With more effort expended, I could go to a backup, extract said data, and put more hours into trying to fix things. But over the years I've grown almost as much weary at the concept of this particular brand of devops as I am curious. In other words, I'm getting too old for this shit.

So, I made a decision: just blow away the whole thing. The server maintenance and occasional bugfixing and Google sleuthing that comes with the whole thing, espcially when I barely use it, just doesn't add up to enough value for it to feel worth it to me right now. It means, however, that what little "social media" I actively contribute to just took a dive. My time spent on Facebook or Instagram or X/Twitter or whatever can be measured in "barely" or "non-existent", so removing Mastodon means I'm down to just my [website](https://michaelchadwick.info). Just like the old days, I guess. Except in the old days, I had LiveJournal. I didn't control it, but I posted to it often, as did my friends, and we had a community. That particular community died years ago, however, and I feel like social on the web has never been the same since.

## FOR THE ROAD

I'll miss the people I found on Mastodon, and maybe I'll join some non-self-hosted instance someday, but for now...I feel a burden lifted. Mastodon was kind of a behemoth to host, and while I probably made it more difficult on myself not using Docker (it would probably have made the dependency management much less of a concern), the overall utility of it as a platform plus the exhausted frustration made it something I could see myself going without. Tootles for now.
