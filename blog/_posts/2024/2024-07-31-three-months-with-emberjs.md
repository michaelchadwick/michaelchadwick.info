---
layout: post
title: 'Three Months With EmberJS'
description: "I started a new job recently, so I've been learning and using EmberJS, an open-source JavaScript framework. It's been over 3 months now, and it's time to do a retrospective."
tags: angular emberjs jquery react retrospective vuejs webdev
headerImage: posts/2024/three-months-emberjs.jpg
headerImageCaption: 'a sharpened colorful closeup on a large fiery wood ember that is sitting on a blurrier less contrasty dirt ground, cartoony - NightCafe (model: Dreamshaper XL Lightning, preset: Hyperreal)'
published: true
---

{{ page.description }}

<!--more-->

## Humble Beginnings (And Recurring Failings)

![Vanilla JS app directory]({{ site.baseurl }}/assets/images/posts/2024/vanilla-app.png){: style='float: right; padding: 0 1em 0.5em 1em'}

I still often start web projects these days without using any kind of framework. Call me old-fashioned, I guess. Despite doing it dozens and dozens of times over the last couple decades, there is still something magical about creating an `index.html` file, `<link>`-ing in a `.css` file to make it look presentable, and then adding a `<script>` tag to a separate `.js` file for interactivity. In the end, that's what even the most complicated framework will most likely export into the final product that a browser will interpet, and what a user will see if they check the source.

That being said, frameworks help a TON in getting a working web _application_ off the ground without re-writing the wheel like I constantly do. Showing a simple homepage with an `<h1>`, some `<p>`s, and maybe a `<img>` or two can be easily accomplished with the old-school method, but there are so many things to think about beyond that, like state and data management, routing, testing, and accessibility, and it's really nice to have a more modern approach.

## My Background With JavaScript Libraries/Frameworks

### JQuery

![jQuery app directory]({{ site.baseurl }}/assets/images/posts/2024/jquery-app.png){: style='float: right; padding: 0 0 1em 2em'}

My (and many other people's) first taste of using Javascript libraries was probably [jQuery](https://jquery.com) (created in 2006!). It's not opinionated on _how you structure your app_, but it does change _how you write Javascript_ by using its opinionated **functions** that, until recently, were way better than writing vanilla JS.

### Angular(JS)

![Angular app directory]({{ site.baseurl }}/assets/images/posts/2024/ng-app.png){: style='float: right; padding: 0 0 1em 2em'}

[Angular](https://angular.dev) (Google; AngularJS created in 2010, but modern Angular was 2016) is the framework I have the most exerience with, having used it for years on an internal personnel web app at an old job. It introduced me to TypeScript, even. It's been updated so much in the time I started using it, however, and creating and maintaining a new Angular app today is quite a different experience already.

### React(JS)

![React app directory]({{ site.baseurl }}/assets/images/posts/2024/react-app.png){: style='float: right; padding: 0 0 1em 2em'}

Despite the popularity of [React](https://react.dev) (Facebook; created in 2013), I never got into it, and no job has ever required it. I know it's been highly influential in the Javascript ecosystem, however, and so I feel like it's a personal hole in my JS toolchain.

### VueJS

![VueJS app directory]({{ site.baseurl }}/assets/images/posts/2024/vue-app.png){: style='float: right; padding: 0 0 1em 2em'}

I built a playable keyboard on the web using [VueJS](https://vuejs.org) (created in 2014) called [Keebord](https://keebord.neb.host). VueJS uses the concept of components (as do most frameworks now) and puts the markup (HTML), presentation (CSS), and interactivity (JS) all in one file. It's kind of nice to have it all in one place, but it also feels a bit more spaghetti-like.

## Enter the Ember

![EmberJS app directory]({{ site.baseurl }}/assets/images/posts/2024/ember-app.png){: style='float: right; padding: 0 0 1em 2em'}

EmberJS was created in December 2011, so it's a peer to tools like AngularJS. Much like Angular and React and Vue, it's been updated many times over the last decade. The app you might've built when these tools first came out is markedly different than the one you would build today.

Much like the other, Ember has their own command line tool (`ember-cli`) to create Ember apps and the parts that make them up. Once it's on your system, you run something like `ember new ember-app` to make a subfolder called `ember-app` with all the files you need to run your web application.

### First Impressions

My first impression of Ember was positive, as it works a lot like the other frameworks I've used. The layout of an Ember app is familiar, and it seems to follow all of the conventions I'm acquainted with when building a modern web application.

#### Scripting Engine

Ember defaults to JavaScript, although they have support for TypeScript, and the project I'm working on may get updated to it someday. While TypeScript is pretty awesome, Vanilla JS has improved so much over the years that I'm still fine with using it.

#### Templating Engine

Ember currently depends on [Handlebars](https://handlebarsjs.com) for its templating, whereas Angular and Vue use augmented HTML, and React uses JavaScript (eh) or JSX (odd JS + HTML variant). Handlebars work fine, and remind me of using [Twig](https://twig.symfony.com/doc/3.x/) in Drupal, but removing dependencies would be nice.

#### Components

Ember, much like all other frameworks nowadays, uses the concept of components to create modular chunks of code, but separates the HTML, CSS, and JS into separate files like Angular and React, which I prefer over all-in-one like Vue.

#### Testing

Instead of Cypress, the testing engine I've primarily used, Ember uses something called  `qunit`, which works pretty similarly, if not as visually polished. Apparently, it was originally created for testing jQuery and its related software, but became a more generic JS testing engine.

#### Popularity

Ember is definitely not as popular these days as Angular/React/Vue, judging primarily by reported public usage and the dearth of recent forum posts, so it's sometimes harder to get help when I run into an issue. Even though I feel mixed on its existence, thankfully a tool like ChatGPT exists, because it's often more helpful than Google searches.

Despite its lower profile in the JS world, it has a [cool mascot](https://github.com/ember-learn/ember-website/blob/main/public/images/brand/Ember%20Logos/Ember%20Tomster%20Lockup/ember-tomster-lockup-4c.png), an [ecosystem of addons](https://emberobserver.com), and their [own conference](https://www.emberconf.com). Everything checks out!

One other thing I really like about Ember is its commitment to [backwards compatibility](https://emberjs.com/releases/).

### Test Application

When I started learning Ember, I figured the best thing to do was to go through their documentation. This resulted in [RemEmber Stuff](https://mc-emberjs-remember-stuff.netlify.com), a place to put all the stuff I've toyed around with thus far. It's become what StackBlitz used to be for me when I needed to toy around with a simpler version of an Angular app. It also lets me mess up stuff in a test app that I can easily back out of without polluting an existing project that others rely on.

Thus far, I've got several custom components, a custom service, translations for English and Spanish across the whole site, and a fairly robust test suite. I even converted it to a [monorepo](https://en.wikipedia.org/wiki/Monorepo) with the `frontend` package relying on the `rs-common` package, which I'd never done before. Using web applications to learn how to better fix and augment other web applications is the way to go!

### For the Road

Thus far, I'm happy with my experience of Ember, despite never using it before. My future plans for the test application are to add an actual database backend, users and login authentication, and perhaps another package called something like `rs-embedded` that pulls in the `frontend` and `rs-common` packages into an embedded version of the site.
