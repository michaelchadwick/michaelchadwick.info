---
layout: post
title: 'To Err is to Web Develop'
date: 2026-01-22
description: 'When planning a way to handle errors in a web application, there are a few ways to go about doing it. However, consider the following: what if you just do something else first for a while?'
tags: error guide linting prettification webdev
published: false
---

{{ page.description }}

<!--more-->

Errors are unavoidable. Perfection is impossible. This is true in web development just as it is in life. That doesn't mean you can't _do something_ about handling all those inevitable unwanted outcomes, but first: **stand up**. I know you are probably sitting or lying down while reading this, so let's break up the flow a bit.

If you are on a mobile device, prepare to put it down. If you're on a desktop or laptop, be ready to look away from it. Either way, prepare to do some deep breathing in and out for a few minutes while either staring into the middle distance or closing your eyes completely, put the device down or out of sight, and..._do that_. The blog post will wait.

...

OK, done? Now that we have **perspective**, let's first discuss how your web application _could_ go wrong, and then some solutions to potentially handle it. Since I needed to elucidate the myriad ways a web application I've been working on recently _could_ or _might_ go awry, AND ways to combat that, here's a refresher course for both me and you.

## TYPES OF ERRORS

There are several different types of `error` that can arise in a web application. If it only sets off an alarm, but doesn't stop the proper functioning of your application, then it's a `warning`.

### BUILD/COMPILE ERROR

This is caused by your code being ~~bad~~invalid.

Since most web languages, like HTML, CSS, and Javascript, are not compiled, there's no such thing as a build/compile error. However, if you are using a higher-level language that compiles to them, such as TypeScript->JavaScript or SASS/SCSS->CSS, then there can be build/compiler errors. Regardless, if the site can't be compiled or interpreted, then it won't even load. This can be ameliorated by your text editor or IDE, usually with a built-in or third-party plugin.

#### LINTING

Proper [linting](https://eslint.org) is very helpful in an interpreted language without a compile step, pointing out things that can cause _runtime_ errors, or just cause undesired program states.

```js
// Runtime error ahoy!
// Wednesday is either an undefined object or a string that is missing quotes
let day = Wednesday;
// console.log method call is missing closing paren
console.log(day;

// Unassigned variable!
// The `status` variable usage won't break build, but will always be undefined
let status;

if (status === 'ready') {
  console.log('Ready!');
}
```

#### FORMATTING

Use of a [formatter](https://prettier.io) doesn't save you from bugs, but it can keep code cohesive, consistent, and readable for other people (including Future You). Moreover, it might prevent future bugs and speed up development due to variables and methods being predictable and code "shape" having familiar contours.

```js
// NO; too long
foo(reallyLongArg(), omgSoManyParameters(), weShouldRefactorThis(), isThereSeriouslyAnotherOne());

// YES; formatted for easier human parsing
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  weShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

### RUNTIME ERROR

This is caused by your _running_ code failing. If you ignore your linter (or don't even use one), then you won't notice the bug until a browser tries to interpret it.

There are a literal metric ton of potential [HTTP reponse status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#client_error_responses), but you really only need to handle a few of them.

#### HTTP ERRORS

##### 401 AUTHORIZATION ERROR

This is caused by a request sending authorization credentials (i.e. due to a route, page, or file needing to have an identity other than anonymous), and that authorization being denied, resulting in a `401`.

* `locahost:3000/login -> user:foo/pass:bar -> 401`

##### 403 AUTHENTICATION ERROR

This is caused by a request requiring valid authentication (i.e. due to a route, page, or file needing to have a specific, proven identity), and not getting it, resulting in a `403`.

* `locahost:3000/private/stuff -> current identity not on allow list? -> 403`

**Solution**: check to make sure your identity is real. Look in a mirror and ponder. Then double-check your username and/or password was correct and try entering it again.

#### 404 ROUTE ERROR

This is caused by either your inability to navigate a site or link rot. Usually refered to by its HTTP error code, `404`, a route error happens when a location is requested, but that location ain't there, yo.

* `localhost:3000/not-yet-existing-place -> 404`
* `<a href="http://not-a-site-but-oh-if-only.com">go here for the juice</a>`

**Solution**: if your web framework has a routing system, there is probably a place to create a template to serve to a user if this happens. If not, then your web server software (Apache, nginx, IIS, etc.) probably has a way to serve something similar. If the site is running on a potato, check for freshness.

#### 500 SERVER ERROR

This is caused by the web server hosting the site not working correctly for...various reasons.

##### LOCAL ERROR

For example, a form could cause an error while processing on the server, and so it will send a `500` error back to the client web application.

* `localhost:3000/page-with-form -> submit form -> 500`

##### REMOTE API ERROR

This is caused by a remote API not existing or failing to do its job.

* `localhost:3000 -> fetch(https://coolsite.com/api/coolThing1) -> 500`

**Solution**: check if the remote API can be accessed outside of your website to make sure it's not just a faulty implementation. Try using `curl -I https://coolsite.com/api/coolThing1` on the command line.

#### FORM ERROR

This is caused by entering invalid data into a client-side form input, or by the server rejecting form input values upon submission. Client-side errors will usually appear on the website itself via `HTML` attributes or `Javascript` validation, whereas a submission that makes it to the server but fails may present something similar, or either log or redirect to a `500` error.

#### MODEL ERROR

This is caused by the site's database not finding something. It could be due to an invalid link, or the data could have been deleted and the frontend not refreshed yet.

* `localhost:3000/user/dave -> 404 (dave ain't here, man)`

**Solution**: redirect to your 404/Not Found route, and log the issue internally for later research purposes.
