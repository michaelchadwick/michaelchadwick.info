---
layout: post
title: "Share New Jekyll Blog Post on Mastodon Using Github Actions"
tags: automation chatgpt chatgpt3 github github-actions jekyll mastodon
published: true
---

Now that I use Mastodon as my daily social media outlet, I want to automagically share any new posts on my blog as a new toot. My blog is kept in a git repo, and shared on Github, so I figured I could use Github Actions to do this.

Here is my journey to do just that.

<!--more-->

## WHY?

Github Actions are YAML config files you write to trigger some kind of event to take place when a Github-related action occurs (e.g. push, pull release). You can even write Github Actions that others can use, and I used [one of them](https://github.com/cbrgm/mastodon-github-action) to make my action easier to write.

I'll go into detail on some specific, but here's the full thing:

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
    - name: Checkout code
      uses: actions/checkout@v2
    - name: Identify Added Blog Post
      id: parse_commit
      run: |
        post_file=$(git diff-tree --no-commit-id --name-only -r ${{ github.sha }})

        if [ -n "$post_file" ]; then
          # Assuming only one new blog post is added in the commit
          new_post_file=$(echo "$post_file" | head -n 1)

          # Extract information from front matter using awk and grep
          title=$(awk '/^title:/ {$1=""; sub(/^[ \t]+/, ""); print}' "$new_post_file" | tr -d '"')
          date=$(echo "$new_post_file" | grep -oP '\d{4}-\d{2}-\d{2}' | sed 's/-/\//g')
          tags=$(awk '/^tags:/ {for (i=2; i<=NF; i++) print "#" $i}' "$new_post_file" | tr -d '[,]' | tr '\n' ' ')

          # Construct the URL based on Jekyll site's URL structure
          base_url="https://michaelchadwick.info/blog"
          url=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]' | sed -E 's/[[:space:]]+/-/g' | sed -E 's/^-//;s/-$//')
          post_url="$base_url/$date/$url"

          echo "post_title=$title" >> $GITHUB_ENV
          echo "post_url=$post_url" >> $GITHUB_ENV
          echo "post_tags=$tags" >> $GITHUB_ENV
        fi
    - name: Post to Mastodon
      id: mastodon
      uses: cbrgm/mastodon-github-action@v1.0.3
      with:
        message: |
          New blog: "${{ env.post_title }}"
          ${{ env.post_url }}

          #blog ${{ env.post_tags }}
        visibility: "private" # default: public
      env:
        MASTODON_URL: ${{ secrets.MASTODON_URL }}
        MASTODON_ACCESS_TOKEN: ${{ secrets.MASTODON_ACCESS_TOKEN }}
```