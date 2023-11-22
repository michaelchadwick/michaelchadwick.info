---
layout: post
title: "Client-Side Ruby with Web Assembly"
tags: ruby wasm web web-assembly
headerImage: posts/2023/ruby-on-wasm-2023-11-22.jpg
published: true
---

I've never tried to do anything with Web Assembly before, even though it seems quite exciting. However, while searching the Internet for a way to showcase some old Ruby scripts I wrote once in my early programming days, I came upon this Javascript library that lets you run client-side Ruby in a web page.

And folks...I just had to try it out.

<!--more-->

## RUBY

[Ruby](https://www.ruby-lang.org) is a dynamic programming language, often used with something called [Rails](https://rubyonrails.org) to make dynamic websites. My attempts at making a Rails site never quite came to fruition, but I've made many scripts to do various things, like producing random text or [making a whole game](https://github.com/michaelchadwick/gemwarrior-ruby).

That being said, Ruby code largely runs on the command line and doesn't have a strong GUI game. That is, until you bring [Web Assembly](https://webassembly.org) (WASM) into the mix.

## WEB ASSEMBLY

To be honest, I don't think I understand it well enough to explain in any detail, other than to say it's a way to write things in non-web languages (e.g. C/C++, Go, Ruby) so that they can be run on the web (via Javascript, for example). It's a whole _thing_, and my little experiment here is just barely touching the edge of what it can do.

Here's a [decent introduction](https://web.dev/articles/what-is-webassembly), here's a related technology called [Emscripten](https://emscripten.org/), here's a [synth](https://timdaub.github.io/wasm-synth/) someone built with WASM, and here's a [use case from ebay](https://innovation.ebayinc.com/tech/engineering/webassembly-at-ebay-a-real-world-use-case/) to wet your whistle for now.

## GLUING IT ALL TOGETHER

One way to use WASM is to translate Ruby code into something a web browser can understand on the client-side. In the past, you could have some frontend Javascript call a backend Ruby script and then return its output to the frontend to display on a website. With WASM, you can do **all** of this on the frontend.

Remember this tag?

```html
<script type="text/javascript">
  console.log('hello world')
</script>
```

Standard use case, right? You can also do this:

```html
<script type="text/ruby">
  puts "hello world from ruby"
</script>
```

Of course, if you do _just_ that, it won't do anything. Add the following library to your `<head>` tag: `<script src="https://cdn.jsdelivr.net/npm/ruby-3_2-wasm-wasi@1.0.1/dist/browser.script.iife.js"></script>`, then refresh the page. You should see something like the following:

```shell
ruby 3.2.0 (2022-12-25 revision a528908271) [wasm32-wasi] browser.script.iife.js:2871
hello world from ruby                                     browser.script.iife.js:2871
```

If you `require` the `js` module, then you can target web elements just like in Javascript:

```html
<body>
  <label for="button">Click this button, then check dev console!</label>
  <button id="button">Boop</button>
</body>

<script type="text/ruby">
  require "js"

  document = JS.global[:document]
  button = document.getElementById('button')
  button.addEventListener "click" do |e|
    puts "you hit the boop!"
  end
</script>
```

## FOR THE ROAD

My examples don't truly show the real power of WASM, because you could have easily written the Ruby in actual Javascript, but for something more complex (and pre-written), this could be very helpful.

Also, there's one fundamental issue when writing client-side Ruby I should note: Ruby is couched in the terminal's event loop, but to do anything interactive on a web page, like an input parser, you have to re-think how you're checking for that input (`gets` vs `<input>`) and displaying output (`puts` vs `outputElement.value`), which definitely takes some re-writing of your original Ruby script. I suppose this is unavoidable as the two paradigms are fundamentally different.

Regardless, I thought this was a cool thing to discover, and I plan to rewrite some of my old scripts for showcasing on a website soon!
