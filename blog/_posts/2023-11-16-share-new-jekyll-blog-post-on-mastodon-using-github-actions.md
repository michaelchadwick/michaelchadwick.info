---
layout: post
title: "Share New Jekyll Blog Post on Mastodon Using Github Actions"
tags: automation chatgpt chatgpt3 github github-actions jekyll mastodon
published: true
---

Now that I use [Mastodon](https://masto.neb.host) as my daily social media outlet, I want to automagically share any new posts on my [blog](https://michaelchadwick.info) as a new toot. My blog is kept in a `git` repo, and shared on [Github](https://github.com), so I figured I could use [Github Actions](https://docs.github.com/en/actions) to do this.

Thanks to some digital friends along the way, I was able to create one!

<!--more-->

## GITHUB ACTIONS?

Github Actions are YAML config files you write to trigger some kind of event to take place when a Github-related action occurs (e.g. push, pull request, etc.). You can even write Github Actions that others can use, and I used [one of them](https://github.com/cbrgm/mastodon-github-action) to make the Mastodon part much easier to write.

I'll go into detail on some specifics, but first here's the full thing:

```yaml
name: Blog2Masto
on:
  push:
    paths:
      - 'blog/_posts/*.md'

jobs:
  post:
    if: contains(github.event.head_commit.message, 'new blog post:')
    runs-on: ubuntu-latest
    steps:
    - name: Identify Added Blog Post
      id: identify_added_blog_post
      run: |
        if [ -n ${{ github.event.act }} ]; then
          sha=${{ secrets.TEST_SHA }}
          echo "using ${{ secrets.TEST_SHA }} for local act testing"
        else
          sha=${{ github.sha }}
        fi

        if [ -n "$post_file" ]; then
          new_post_file=$(echo "$post_file" | head -n 1)

          # Extract information from file's front matter using awk and grep
          title=$(awk '/^title:/ {$1=""; sub(/^[ \t]+/, ""); print}' "$new_post_file" | tr -d '"')
          date=$(echo "$new_post_file" | grep -oP '\d{4}-\d{2}-\d{2}' | sed 's/-/\//g')
          tags=$(awk '/^tags:/ {for (i=2; i<=NF; i++) print "#" $i}' "$new_post_file" | tr -d '[,]' | tr '\n' ' ')

          # Construct the URL based on Jekyll site's URL structure
          base_url="${{ secrets.BLOG_URL }}"
          url=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]' | sed -E 's/[[:space:]]+/-/g' | sed -E 's/^-//;s/-$//')
          post_url="$base_url/$date/$url"

          # Add pertinent Github environment variables
          echo "post_title=$title" >> $GITHUB_ENV
          echo "post_url=$post_url" >> $GITHUB_ENV
          echo "post_tags=$tags" >> $GITHUB_ENV
        fi
    - name: Post to Mastodon
      id: post_to_mastodon
      if: ${{ env.post_title != '' && env.post_url != '' }}
      uses: cbrgm/mastodon-github-action@v1.0.3
      with:
        message: |
          New blog: "${{ env.post_title }}"
          ${{ env.post_url }}

          ${{ env.post_tags }} #blog
        visibility: "public"
      env:
        MASTODON_URL: ${{ secrets.MASTODON_URL }}
        MASTODON_ACCESS_TOKEN: ${{ secrets.MASTODON_ACCESS_TOKEN }}
```

## ARTIFICIAL INTELLIHELP

I _would_ say that this Github Action I have written is a Github Action I have written, except for the fact that a lot of it was written by [ChatGPT3](https://chat.openai.com).

My initial stab at writing a Github Action was a lot less complicated than the final one, and didn't have a long shell script to create variables. The resulting Mastodon post was just a link to my blog, and a simple "New blog post" title. I figured I could do better than this, but it would take some real effort.

Poring through the docs yielded some half-hearted and nonfunctional results (creating actions are not as simple as I would hope), so I did something I've done very little of thus far: I asked ChatGPT.

And it went well!

It's no hot take at this point to say that ChatGPT is kind of revolutionary, if for nothing else than to be able to ask questions in conversational language and get actual working results! I did have to iterate a few times on certain lines that needed some tweaking or threw an error, but it was actually fun, way more fun than my Googling attempts.

## LOCAL DEVELOPMENT

The main issue with writing and testing a Github Action is the...Github Action part. My action is predicated on a `git push` with a certain commit message, so every time I needed to make a change I had to do a whole **thing**:

* Edit the action on Github
* Commit that change
* Pull that change to my local version
* Make a change to a post
* Commit that change
* Do a `git push` to trigger the action

That workflow is not very efficient, eh?

Thankfully, I found [act](https://github.com/nektos/act). This awesome tool allows you to edit your action to your heart's content, and run it from your local computer, instead of Github's server. Make change, save file, run command, see results. Just like regular web development!

Downsides to using `act` vs Github itself were mainly centered around creating some secrets or server variables that don't automatically exist locally, so it was sort of like writing configuration for unit tests.

## PUTTING IT ALL TOGETHER

It's not exaggeration to claim that without the previous online help, I would have probably just given up and went back to manually posting on Mastodon like a pleb. But that's no fun!

Thus, my `.github/workflows/post-to-mastodon.yml` action was truly born, and now we will break it down.

```yaml
name: Blog2Masto
on:
  push:
    paths:
      - 'blog/_posts/*.md'
```

Github Actions are referred to as _workflows_ that are triggered by some kind of _event_ that occurs on a repository. My _event_ is simple: when I do a `git push`, check if there is a file within the commit that matches a path. That path is where my blog posts live. If so, run a _job_.

```yaml
jobs:
  post:
    if: contains(github.event.head_commit.message, 'new blog post:')
    runs-on: ubuntu-latest
```

Github Actions consist of _jobs_ that consist of _steps_. I only have one job I need to accomplish: post to my Mastodon instance. I only want the job to run if a `git push` is adding a new blog post, so I figured the easiest way was to just put that in the commit message and check for it. There may be a way to do this by checking for "only when a Markdown post is _added_", but this works for my purpose.

Also, the `runs-on` value is there because a small VM gets spun up to run your action, which is kind of cool.

```yaml
steps:
    - name: Identify Added Blog Post
      id: identify_added_blog_post
    ...
    - name: Post to Mastodon
      id: post_to_mastodon
```

My one job has two steps: parse the commit to get the title, url, and tags from a Markdown file, and then post it to Mastodon.

```yaml
      run: |
        if [ -n ${{ github.event.act }} ]; then
          sha=${{ secrets.TEST_SHA }}
          echo "using ${{ secrets.TEST_SHA }} for local act testing"
        else
          sha=${{ github.sha }}
        fi
```

This part grabs the SHA (the long alphanumeric string that identifies your commit) from the most recent `git push` and uses it later to extract information about the blog post I want to use in my Mastodon post. Since I'm using `act` for local development, there's a check for it so I can use an existing SHA that already has the correct commit message and file added if this action is run locally.

The rest of the `identify_added_blog_post` step consists mainly of grabbing info from the Markdown file using *nix tools like `awk` and `grep` and `sed`, and was helpfully provided by ChatGPT3. The variables I need are added to the `$GITHUB_ENV` variable to be used in the second step.

```yaml
    - name: Post to Mastodon
      id: post_to_mastodon
      if: ${{ env.post_title != '' && env.post_url != '' }}
      uses: cbrgm/mastodon-github-action@v1.0.3
      with:
        message: |
          New blog: "${{ env.post_title }}"
          ${{ env.post_url }}

          ${{ env.post_tags }} #blog
        visibility: "public"
      env:
        MASTODON_URL: ${{ secrets.MASTODON_URL }}
        MASTODON_ACCESS_TOKEN: ${{ secrets.MASTODON_ACCESS_TOKEN }}
```

Thanks to [this Github Action](https://github.com/cbrgm/mastodon-github-action), I could bring those juicy variables to my second step and plug them into the `with: message:` value. Finally, a worthy payload is sent off to my Mastodon instance.

## FOR THE ROAD

For how little I actually write blog posts, the time spent on getting a Github Action to work was probably overkill. However, as a programmer, just trying to see if it can be done is a valid reason for anything.

Now that this blog post is done, committing its finality and pushing it to Github will hopefully, and accurately, create a Mastodon post linking to it. The meta of all this is truly overwhelming.
