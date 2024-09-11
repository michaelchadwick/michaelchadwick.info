---
layout: post
title: "About This Computer"
description: "Have you ever wanted to just get a quick print out (to the screen) of all the tech that's on your computer? I've been working on a shell script for years that does just that."
tags: about bash documentation linux macos neofetch python scripting shell sysadmin tool unix
headerImage: posts/2024/about-this-computer-2024-01-09.jpg
headerImageCaption: '"your computer specifications" abstract art complementary colors fine details numbers letters - NightCafe (model: SDXL 1.0)'
image: posts/2024/about-this-computer-2024-01-09.jpg
published: true
---

{{ page.description }}

<!--more-->

## FIRST THINGS FIRST

Note, this post is only concerned with macOS/Linux and its various flavors, as that's what I largely use on a day-to-day basis. I'm sure Windows has its own stuff (like `systeminfo`), but that's for a different post. Also, I'm only concerned with tools that you access from the _command line_, as GUIs will most likely have their own menu or button to tell you about your computer, but that can't be included in a script with other stuff.

My personal favorite command line tool to get information about my Mac (or Linux VM) is [neofetch](https://github.com/dylanaraps/neofetch). It's a rad `bash` script that creates a cool, screenshot-able display of useful information alongside either a picture of your OS's logo, or a custom image. Since it runs on `bash`, it runs on virtually any `bash`-compatible shell system, which is a lot of potential operating systems.

Before I found `neofetch`, I used to use [archey](https://github.com/HorlogeSkynet/archey4) (which is a maintained fork of the original found [here](https://github.com/djmelik/archey)). It's written in Python, which is another dependency that may not exist on the system you're checking.

## SCRIPT TIME

All this being said, not every system has (or _can be installed with_) the cool tools described above, so I decided a more _progressive enhancement_ flow of attempts worked best.

```bash
function about() {
  # OS info
  if hash neofetch 2>/dev/null; then
    neofetch
  else
    if hash archey 2>/dev/null; then
      archey -c "$1"
    else
      if [ -f /etc/os-release ]; then
        cat /etc/os-release
      else
        if [ -f /proc/version ]; then
          cat /proc/version
        else
          uname -a
        fi
      fi
    fi
  fi

  ...
}
```

Essentially, start with the best option, and if it does not exist, try the next best option. If `uname` doesn't exist then you're probably not running macOS/Linux, and something is very wrong.

While this if-else chain is useful, it's not very noteworthy for a post. Thus, over time I've slowly expanded this script to contain other things I care to know about a computer I'm using.

```bash
# colors
_RED="$(tty -s && tput setaf 1)"
_YELLOW="$(tty -s && tput setaf 3)"
_WHITE="$(tty -s && tput setaf 7)"
_GRAY="$(tty -s && tput setaf 8)"
_BOLD="$(tty -s && tput bold)"
_RESET="$(tty -s && tput sgr0)"

...other functions...

function about() {
  # OS info

  ...

  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"
  echo "${_BOLD}${_WHITE}| programming langs            |${_RESET}"
  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"

  ...

  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"
  echo "${_BOLD}${_WHITE}| package managers             |${_RESET}"
  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"

  ...

  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"
  echo "${_BOLD}${_WHITE}| web servers                  |${_RESET}"
  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"

  ...

  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"
  echo "${_BOLD}${_WHITE}| webdev tools                 |${_RESET}"
  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"

  ...

  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"
  echo "${_BOLD}${_WHITE}| database systems             |${_RESET}"
  echo "${_BOLD}${_WHITE}--------------------------------${_RESET}"

  ...
}
```

An example of a programming language would be `ruby`:

```bash
function about() {

  ...

  if hash ruby 2>/dev/null; then
    echo "${_BOLD}${_YELLOW}ruby${_RESET}:       ${_BOLD}${_WHITE}$(ruby -v | cut -d' ' -f2)${_RESET} $(which ruby)" | _anon

    if hash rbenv 2>/dev/null; then
      echo "${_BOLD}${_YELLOW}- rbenv${_RESET}     ${_BOLD}${_WHITE}$(rbenv -v | cut -d' ' -f2)${_RESET}; using: $(rbenv global)" | _anon
    else
      echo "${_BOLD}${_GRAY}- rbenv not installed${_RESET}"
    fi
  else
    echo "${_BOLD}${_GRAY}- ruby not installed${_RESET}"
  fi

  ...

}
```

I check if it exists on the system, and if it does I print out the version (deftly cut up to get the most basic display of it possible, as every program does it differently and in different precision). Everything has proper spacing so that when a bunch of them are printed out they line up nicely.

Here's an excerpt from the programming languages section to get the gist of all this:

```bash
python3:    3.11.7 /usr/local/bin/python3
- pyenv     2.3.35; using: system
ruby:       3.2.2 $HOME/.rbenv/shims/ruby
- rbenv     1.2.0; using: 3.2.2
rust:       1.75.0 /usr/local/bin/rustc
tsc:        5.3.3 /usr/local/bin/tsc
```

You may have noticed some of the version printing lines ending in `_anon`. That's piping the output to a special sub-function I wrote to anonymize any line that may have my home directory explicitly displayed. If I want to share this kind of thing publicly, it's nice to be able to keep it a little private.

## FOR THE ROAD

To be honest, I don't use this script very much, especially on a computer I use every day. I just kind of know what's on it after a while, so I don't need the reminder. I _can_ forget, though, so it's there to save me if I need it. Also, I can just copy this script to a server I'm accessing and run it to get a quick survey of its wares. As with most scripts like this, the most fun is in writing it, not using it.

The full thing is on [Github](https://github.com/michaelchadwick/dotfiles/blob/master/_functions#L34-L294) if you wish to use it (or expand it! (or mangle it!)).
