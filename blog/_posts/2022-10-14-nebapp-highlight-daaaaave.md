---
title: 'NebApp Highlight: Daaaaave'
layout: post
tags: nebapp daaaaave dave api php json
---

While designing a webapp that needs to call a remote API, sometimes the API you actually need to use is too complicated or not even available due to local development access issues (e.g. CORS). It's [times like these](https://www.youtube.com/watch?v=rhzmNRtIp8k) you learn to, uh, use something lighter and more accessible.

Sure, there's plenty of [Public APIs](https://github.com/public-apis/public-apis) you could use for such a purpose, but as a developer I like to take a crack at making my own version of something at least once.

Thus, I created [Daaaaave](https://dave.neb.host), a simple public API built with PHP.

<!--more-->

I have a friend named Dave. He's a cool guy. He's a fan of [the band I'm in](http://flylikevenus.com). He also has a nice, short name, which is perfect for a webapp. While the project is an elongated Daaaaave, I'll just refer to it in its original, non-elongated, form from here on out.

My initial use case with Dave was for a Slack bot on our band's workspace, so that you could just ask for Dave and he'd respond with something random for fun. However, I found that a more general-purpose API was useful for many other things, so I expanded on it quite a bit.

## Some Basic Dave API Stuff

You can send an HTTP request to Dave and he will respond with JSON. If you give him no options, then he'll ask for more.

```shell
curl https://dave.neb.host | json_pp
```

```json
{
   "body" : null,
   "customType" : "server",
   "error" : true,
   "message" : "Dave says: I think you forgot to ask for something. I know about ?binary, ?dave(s), ?http_code, ?json, ?slack, and ?text. See https://github.com/michaelchadwick/daaaaave for more, man.",
   "status" : "204",
   "statusText" : "OK"
}
```

Dave's basic unit of currency is, of course, `daves`. Given no amount, Dave will respond with a single `dave`.

```shell
curl https://dave.neb.host?daves | json_pp
```

```json
{
   "body" : [
      "dave"
   ],
   ...
}
```

If you give Dave a quantity, Dave will respond by adding an extra 'a' for each subsequent `dave`:

```shell
curl https://dave.neb.host?daves=5 | json_pp
```

```json
{
   "body" : [
      "dave",
      "daave",
      "daaave",
      "daaaave",
      "daaaaave",
   ],
   ...
}
```

Dave will also return more than just Dave's name. Try `?binary&size=1` for a 1 MB binary file, `?http_code=404` for an HTTP response with a 400 response code, or even `?json&size=5` for a random set of 5 JSON items.

## For the Road

The Dave API is for everyone to use in any project that needs a quick remote API check. I'm using it in another project to test out browser caching, and it's been very helpful.

Dave is also completely [open-source](https://github.com/michaelchadwick/daaaaave), so feel free to download the source and tinker. If you find a bug or have a feature request, be sure to [let me know](https://github.com/michaelchadwick/daaaaave/issues/new).
