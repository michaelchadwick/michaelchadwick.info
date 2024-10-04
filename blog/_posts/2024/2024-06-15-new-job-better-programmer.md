---
layout: post
title: 'New Job, Better Programmer'
date: 2024-06-15 19:48:00
tags: development dynamic-analysis emberjs eslint husky introspection linting npm pnpm programming static-analysis stylelint testing
headerImage: posts/2024/new-job-better-programmer.jpg
headerImageCaption: 'programmer wearing a t-shirt and jeans, in a hero pose, outside, standing at the top of a mountain, one fist in the air, one hand down grasping a keyboard, impressive, leveling up - NightCafe (model: Dreamshaper XL Lightning, preset: Vibrant)'
image: posts/2024/new-job-better-programmer.jpg
published: true
---

I took a new job recently. I no longer work on Drupal and Angular, but instead this framework called EmberJS that I'm still in the middle of learning.

With a new job comes a new way of handling a large software project, and, if I have to be honest, I think I've become significantly better already.

<!--more-->

## So, You Decided to Write Some Code

It's time to create a new software project for the web! Exciting! Whether you use something like `npm create vite new-app -- --template=vue` or `ember new` or `create-react-app new-app` or simply `mkdir new-app`, you're going to get a brand-spankin' new directory to put text into that will eventually metamorphisize into a grand URL for all the world to connect to and love.

Before you get to the "hosting it on the Internet for others to see" part of your majesty, however, you should probably keep a few things in mind.

### Global Node Package Management

Using NodeJS? If you're making something for the web that's moderately complicated, odds are you might be. Thus, you have a `node_modules` directory in your project, and you gotta interact with it somehow. Your first command will most likely be `npm install` which takes everything outlined in a `package.json` file, installs it, and then writes a report of sorts into a `package-lock.json` file (there is also `Gemfile(.lock)` in the Ruby world and `composer.[json|lock]` in the PHP world, among others). That lock file can be used to recreate the exact dependencies your project needs at a future time, making the `node_modules` or `vendor` or `whatever-your-project-uses-for-deps` directories effectively _temporary_ and easily buildable-on-demand at any time.

[NPM](https://docs.npmjs.com/about-npm), or **Node Package Manager**, is the default way to handle dependencies in a NodeJS project. Lots of web frameworks that use NodeJS default to `npm` as well, but there is always room for improvement in organization, security, speed, and, to this blog post's specific interest, _space_. The issue with `node_modules` is that it gets generated in _every single node project you work on_. Even though the point is to _only_ have the _exact versions of dependencies_ you need for _your project_, that's still a lot of duplication among projects, as the same versions of dependencies are often shared.

[PNPM](https://pnpm.io), or **Performant Node Package Manager**, aims to fix that by using a global store of modules that get hardlinked into your project's `node_modules` directory. On small projects without a lot of dependencies, this may not save much space, but as your project grows, it could be very helpful. Moreover, the basic idea behind it jives with my thinking of how a dependency manager _should_ work, so I'm a fan and plan to convert any projects of mine that use `npm` to use `pnpm`.

There is also [Yarn](https://yarnpkg.com/), which was created before `pnpm` to fix some deficiencies with `npm`, and is still quite popular, even though `npm` keeps improving in ways that tend to obviate `yarn`.

### Static Code Analysis

When you write code, as long as it works, it doesn't really matter _how_ you write it. Use semicolons, or not. Use 80 or 100 or 120 characters as a line limit, or not. Use trailing commas on array elements, or not. Use blank lines between CSS selectors, or not. If it compiles/interprets and runs without program-halting errors, then it _works_.

That being said, there _is_ something to the _*how*_, as being able to easily read code after it has been written is both important to _Future You_ and _Other People_ (which includes _Future You_).

**Static code analysis** is the tool for this job, as it checks your code _before_ it is run. Having some kind of consistent convention in how code is organized can improve programmer performance. This includes, but isn't limited to, speeding up initial development of new projects, limiting surprises when opening up old code, and mitigating unnecessary code changes you have to commit and wade through later. This all becomes even more important when you start working on a team with multiple people touching the same code.

While the tools that exist to help keep your code clean and consistent have changed over the years (especially in the web development world), in 2024 there seems to be a few that are often used:

#### ESLint (Logic and Debugging)

The "es" in ESLint stands for `ECMAScript`, which is the standard that Javascript is built to. When Javascript improves, it's because ECMAScript is improved.

**Linting** is a form of static analysis: it checks code before it is run to try to root out potential _logical_ problems. I'm assuming the term comes from the real world, where one would use a tool to remove [lint](<https://en.wikipedia.org/wiki/Lint_(material)>) from clothing. In other words, a linter program flags the accumulation of specific lines of code ("lint") that do not adhere to prescribed coding rules ("clothing").

For example, a logical rule like [no-const-assign](https://eslint.org/docs/latest/rules/no-const-assign) would flag the following code:

```javascript
const a = 0;
a = 1;
```

If you ran `eslint` against your code, you would get something like this:

```shell
[lint:js] /code/new-app/main.js
[lint:js]   1:1  error  'a' is constant  no-const-assign
```

Javascript will still interpret your code and your website might still display fine (if that code isn't run right away), but it's an error that will cause something to go wrong once it is run. If the code is buried in some function that doesn't get called a lot, you might not understand why something breaks at some point. Linting would notice this _before_ you run the code and flag it so you can fix it.

There are also tools called [JSLint](https://jslint.com) and [JSHint](https://jshint.com), but I believe that ESLint has more or less superseded them.

#### Prettier (Style and Convention)

Even though I'm [not a fan of the name](https://hackingthegrepson.podbean.com/e/hacking-the-grepson-062-problematic-tech-talk/) of this tool, it can be helpful to write code to a _standard style_ so that _Future You_ knows what to expect later. Reading other people's code that is written to the same standard improves readability and understanding.

[Prettier](https://prettier.io) is an "opinionated code formatter" that prescribes a certain way of writing code, setting the so-called _standard_ mentioned before. It's more controversial to say "write your code so that each line is only 80 characters long or shorter" than to say "do not re-assign values to const variables", so there is more discussion around a tool like this.

For example, Prettier prescribes using a comma on the last item in a comma-separated structure:

```javascript
const foo = [
  'foo',
  'bar',
  'baz',
  'qux',
];
```

Leave off that last comma, and it will get flagged. This is something I only recently came around to liking, as it always looked off to me when I would see it in code. However, it makes sense to have one because if you don't, making additions to the list will cause 2 lines to be changed instead of 1 (since the penultimate item would need a comma to allow for the new ultimate line).

#### Stylelint (Logic and Style)

[Stylelint](https://stylelint.io) is a CSS linter that also performs formatting, so kind of a mix of the two previous tools. However, **Stylelint** is much more configurable than **Prettier**, so it's less opinionated about the _actual formatting_ you use, and more insistent that you use _something_.

CSS, which handles the presentation of your code, is generally more forgiving to logical errors, but still has potential for invalid code. Logical errors will cause things to not present as expected, while style errors will potentially affect human readability.

Logic example: if you use the Stylelint rule [color-no-invalid-hex](https://stylelint.io/user-guide/rules/color-no-invalid-hex), then the following code is invalid (and will cause that color to not be used):

```css
.foo {
  color: #yyy994;
}
```

Style example: if you use the Stylelint rule [length-zero-no-unit](https://stylelint.io/user-guide/rules/length-zero-no-unit), then the following code is invalid (but will not affect the padding):

```css
.foo {
  padding-top: 0px;
}
```

### Dynamic Analysis (Testing)

Dynamic analysis is for checking your code as it is _running_. You ideally want to check for runtime code errors before you deploy to a place that users would interact with it. Thankfully, there are tools to _test_ your running code before it gets deployed. Tests are generally just files in the same language as your app, only instead of _prescribing_ functionality, they instead _assert_ functionality.

Prescription:

```html
<button id="increase-counter">Increase Counter</button>
<span class="counter">{{this.count}}</span>
```

```javascript
const buttonIncreaseCounter = document.querySelector('button#increase-counter')
const spanCounter = document.querySelector('span.counter')

let count = 0

button.addEventListener('click', () => {
  count += 1
})
```

Assertion (Cypress):

```javascript
cy.get('button#increase-counter')
  .click()
cy.get('span.counter')
  .should('have.text', '1')
```

Assertion (QUnit):

```javascript
await click('button#increase-counter')
assert.dom('span.counter').hasText('1')
```

### Husky

If you're good about running both static and dynamic analysis of your code as you're developing and before you deploy, then...you are a better programmer than I am. Congrats!

For the rest of us, a tool called [Husky](https://typicode.github.io/husky/) is helpful to enforce both linting and testing before committing any new code to a repository, let alone to a deployment target.

To use it after installing, you add a file that runs a command, and triggers on a `git` event, such as `pre-commit`:

```shell
cd /code/new-app/.husky
echo 'npm lint' >> pre-commit
```

## For the Road

None of these tools are required to create code, let alone good code. However, having a well-planned strategy with certain checks before making changes to a codebase can be really helpful in the long run. A well-linted, well-tested project is kind of a dream to work in, even if it may slow down actual coding. It's a tradeoff: you can make riskier changes more quickly, or you can make safer changes more slowly. There's a balance, as always, but my new job has taught me that the latter can be more enjoyable and leave me with more confidence in the long-term health of a project if you just set up some infrastructure before making a single change.
