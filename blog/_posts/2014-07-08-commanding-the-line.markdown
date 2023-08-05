---

layout: post
title:  "Commanding the Line"
tags: cmd command shell bash prompt osx windows

---

`$ echo 'Hello World!'`

Graphical User Interfaces (GUIs) are a great thing and they make computing a lot easier. I've been fiddling with audio programming a bit lately (mainly loading/modifying/saving WAV files), and while getting your hands dirty allows for more flexibility and automation, I still love Audacity and Logic for their accessibility.

That being said, the command line is still often more powerful, but it comes with a higher learning curve.

That, and it still feels like magic most days.

<!--more-->

#### Being Prompt

``` bash
[~/Code/projectX] (master)
mike@bagel(09:04:52)$
```

That's what my current bash prompt, if it were in a mysterious code directory using [git](https://git-scm.org), looks like on OS X 10.9. It hides itself until I hit a keyboard shortcut to drop it down from the top of the screen via [TotalTerminal](https://totalterminal.binaryage.com/). The prompt itself is a smattering of variables and functions in my `~/.bashrc` that all get munged into the following line:

`export PS1="\[${red}\][\w]\[${darkcyan}\]\$(_hg_ps1)\$(__git_ps1)\n\[${green}\]\u@\h\[${yellow}\](\$(date +%T))\[${end}\]$ "`

I understand that somewhat gobbledygook-ish line of characters enough to piecemeal it together, but I still would probably not be able to create it from scratch. The people who created the system I'm bending and warping remain superior, and I'm glad they let me play in their world.

#### Learning to Comply

When I first started computing, lo, back in the mid-90s on an AST Pentium 100, I had only cmd.exe on Windows 3.1(1?), soon to be replaced by basically the same application on Windows 95. I'm pretty sure I didn't do much with it at the time because clicking on icons and such was a lot more intuitive. Eventually, over the next ~20 years, I would learn of the power of the command line, and grow to love modifying systems using it.

I think I got interested in the shell mainly due to my interest in programming. Sure, you could create a little Mac app in Xcode, or a Windows form in Visual Studio, and there is a definite joy in bringing life to an otherwise lifeless set of stock windows. But typing some arcane command in cold, stark text into a black void brings a different kind of rush. There always seems to be as much that could go wrong as could go right when you can type anything you want, and that brings with it delight and terror in equal doses.

Scripts and system configuration are the building blocks to massive enterprise software or exciting video game worlds. Need to automate some tedious task? Write a script. Think that the font size in some window could be bigger, but there's no GUI option? Find a config file and modify it. Once you start manipulating prefabricated environments, you realize how people get their ideas for full-fledged applications: we like to create. Spend enough time typing text into a box and you start to want to control how it looks and functions more. That's how "C:\\" in 1995 becomes what you see above in 2014.

#### Cryptic Writings

Even today, anytime I compile something from source or, more often nowadays, install something on OS X using [Homebrew](https://brew.sh) or on Windows using Chocolatey all the text that flows down the shell window can still seem like incantations written in a strange language. All the compilation messages that go flying by kind of blow my mind. Still, the system was created by humans, so it's obviously possible to understand and reproduce them. When they're processed by a computer many times faster, it distorts the reality, making it seem unreal.

#### Null Termination

To finish this stream-of-consciousness-post, I'll just say this: to anyone looking to better understand how computers work, learn your CLI-fu. Behind every GUI application you're more comfortable with lies a potential command line interface, simply-controlled by lines of text. All programming is just a list of instructions, interpreted or compiled by the computer. You will be able to effect much more change knowing how to control your system at the prompt than just relying on the choices given to you by the OS or app creator. At the same time, with that power comes responsibility, and the ability to hose stuff up badly if you don't know what you're doing, so research and test before typing a fateful command you're not familiar with.

#### Bonus Link

[Command LIne Magic](https://climagic.org/) is a neat Twitter account that just posts interesting things to try on the CLI.

`$ echo 'Goodbye World!'`
