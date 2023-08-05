---

layout: post
title:  "\"Fun\" with Javascript Frameworks"
tags: angular angular-js express javascript meteor-js node-js react-js system-js webpack require-js raffler typescript
excerpt: "I recently completed a new web app called Raffler that lets you take a list of items (usually names) and then 'raffle' them (i.e. randomly choose one)."

---

I recently completed a new web app called [Raffler](https://raffler.codana.me) that lets you take a list of items (usually names) and then "raffle" them (i.e. randomly choose one). It's an extension of an older web app I made called [Just Pick One](https://codaname.neb.host/jpo), but except for some neat animation I added on the front-end design, the back-end logic was largely the same as always: one big honkin' `funcs.js` file full of global variables and methods. Bad Mike, I know, I know, but it's just how I function when I build from scratch.

However, I know it's "wrong" and I should adapt to modern development standards, so after a couple months of on-and-off toying with this new app, I finally modularized it in a more manageable state, but the journey was somewhat perilous as I ventured into the **World of Javascript in 2017**.

<!--more-->

### Backstory

[Raffler](https://raffler.codana.me) is a fairly simple mix of HTML and CSS, made neat and cute by a glut of Javascript/jQuery, but it doesn't mean it couldn't be improved by using a framework. Moving stuff into separate files that are specific to their function would improve maintainability and readability. Unfortunately (spoiler alert), the time and effort it would take to move my custom spaghetti code to a *proper* framework would direct my eventual path toward merely augmenting my existing code.

As Javascript frameworks go, until recently I had very little experience with anything beyond toying around with a to-do tutorial in BackboneJS. Thus, I had a lot of research to do.

### Big Solution = EGADS

Everything starts with [Node](https://nodejs.org), which is Javascript on the server (historically, it has solely been client-side). People really like to use Javascript, despite its failings, most likely because it's easy to play with and see results. The Main Big Frameworks built on top of Node seem to be [Angular](https://angular.io) and [React](https://facebook.github.io/react/) (I haven't yet dared venture down this road yet). We actually started a major project at work with Angular, so I've been learning its intricacies. I also tried out [Meteor](https://meteor.com), which is a similar variant.

Both Angular and Meteor turn all of your disparate parts into `components` that hook together like Lego blocks. Everything is in TypeScript, which is a typed version of Javascript that lets you use newer Ecmascript stuff. It's all a little overwhelming, and going through a few tutorials helps sort it out, but I'm not close to fluency yet.

Due to this technical mountain I'd have to climb, I figured it was not going to be an efficient route for my app, and looked for something simpler.

### Medium Solution = Almost There

Pulling back from the Big ones, we get a Medium solution in things like [Express](https://expressjs.com). Because Node is so barebones (on purpose, I assume), things like Express help to create some basic web app foundational things like templating, routing, and the like.

Express is not too difficult to understand, so it seemed like a winner. Still, using it would require some considerable rewriting of my setup, so I decided to go even simpler.

### Small Solution = Just Right

At the bottom of the "Modular Javascript" barrel, we have stuff like [RequireJS](https://requirejs.org), [Webpack](https://webpack.github.io), and, what I ended up going with, [SystemJS](https://github.com/systemjs/systemjs). RequireJS seems to be the old generation gold standard for breaking up your `funcs.js` into more manageable pieces, but I couldn't get it to work. Webpack is used by some of the above mentioned bigger frameworks, so I figured it would be overkill, and didn't even try it. **SystemJS**, on the other hand, well...it *just worked*.

Essentially, I included SystemJS in my app, and then broke out parts like bootstrapping (the initial variables and methods needed to even get things going), main (most other app methods), helper (utility methods that get reused a lot), and effects (I use a few audio files and a neat firework display on a successful raffle).

#### Old Directory Tree

<pre>
...
|-- js
  |-- funcs.js
  |-- jquery.js
  |-- jquery-ui.js
  ...
...
</pre>

#### New Directory Tree

<pre>
...
|-- js
  |-- app
    |-- bootstrap.js
    |-- fx.js
    |-- helper.js
    |-- main.js
  |-- lib
    |-- systemjs
    |-- jquery.js
    |-- jquery-ui.js
    ...
...
</pre>

Much nicer, yeah?

I could break my app out into even more parts if I wanted, which is the appeal to using something like SystemJS, so I dig it and will most likely use it in a future project. To the end user, nothing changed, but for me, it's a big difference. Maybe someday I'll actually make something with one of the more complicated solutions, too, but you gotta start somewhere!

Speaking of which, if you're like me and still often living in the dark ages of Javascript development, I'd urge you to just pick a solution (there are many, many others I did not mention) and focus on it. Everything works very similarly, so don't get tripped up on all the choices. It's an iterative world and frameworks are getting built and modified all the time, so just start with something, *anything*, and learn the basic functions. You'll be glad you did (actually, [no guarantees](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f)).
