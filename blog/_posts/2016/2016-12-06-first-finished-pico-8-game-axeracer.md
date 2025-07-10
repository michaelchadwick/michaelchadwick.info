---
layout: post
title:  "Axeracer, my first Pico-8 game"
tags: axeracer game gaming lua pico8 learning github
headerImage: posts/2016/12/axeracer_gameplay.gif
excerpt: "The Github Game Off is over, and my 'finished' product is Axeracer. It's a simple, one-track racing game that has you piloting a little insect car thing with axes for antennae, all the better to 'hack' through the grassy track on your way to the finish line."
published: true
---

The [Github Game Off](https://github.com/github/game-off-2016) is over, and my "finished" product is [**Axeracer**](https://codaname.neb.host/games/src/pico8/axeracer/axeracer.html) ([source](https://github.com/michaelchadwick/game-off-2016)). It's a simple, one-track racing game that has you piloting a little insect car thing with axes for antennae, all the better to "hack" through the grassy track on your way to the finish line.

This post is not meant to go over every detail of the game, but just to hit on some of the highlights.

<!--more-->

Axeracer was built in [Pico-8](https://lexaloffle.com/pico-8.php), which allows for all the code, graphics, and sound to be in one nice package. Of course, there are graphical, aural, and input restrictions, by design, so it can make it both easy and difficult to work in. My month-long endeavor to understand the system may not have delivered flashy visuals or sound, but getting it to where it is today took a lot of work, regardless.

#### Humble Beginnings

To get a feel for things, I made a bunch of prototypes: arkanoid, pong, shooter, and snake. Via online tutorials and my own fiddling, I got the gist of how a Pico-8 game came together, what with sprites and collisions and movement. One particular prototype that kept me coming back to was an overheard racing game, and it reminded me of playing Super Off Road, Spy Hunter, and R.C. Pro-Am back in the day. This would be what I would flesh out.

#### Game Basics

After all this tinkering, I came to some general conclusions about what's necessary for a finished game:

* Avatar to control
* Scene to move avatar on
* Scene tiles that are passable, and scene tiles that are _not_ passable
* Scene origin and ending rules
* Code to manipulate avatar
* Code to keep avatar in bounds
* Additional scenes for title, win, and game over, and code to move between them

In general, all Pico-8 projects use two main system calls to rock that game loop:

1. `_update()` - what should change each frame?
2. `_draw()` - what should be drawn each frame?

Everything else in a `.p8` file's code section is just variables and helper methods to those ends. All variables are global unless they're prefixed with `local`, so you generally just stick them all up front. It's not modern OOP programming, for sure. In fact, it's a mess of spaghetti code in a single file. However, it's like being able to program in a virtual NES-in-a-box in 2016, so that's cool.

#### Intermediate Goings-On

##### Movement

The simplest game's avatar would just be a single pixel, but it could also be a shape, like a rectangle or circle. Regardless, its basic 2d movement capabilities are basically covered by the following:

```lua
if (btn(left))  then x-=1 end
if (btn(right)) then x+=1 end
if (btn(up))    then y-=1 end
if (btn(down))  then y+=1 end
```

In other words, if you press any of the arrow keys, your avatar's x or y position changes (the screen is just a grid of x,y coordinates). The meat of all action games asks a two-part question once you decide to move: do you collide with anything? And, if so, what happens? Welcome to much of game development logic programming.

Pico-8, like most game development tools, allows for _sprites_, which are just pixel templates that can be moved as a group (think Mario in his overalls and hat). It still has an x,y position, and using either keyboard or game controller directional buttons can change that.

The next level of logic is acceleration, as simply "teleporting" an avatar around by changing its position by a fixed amount doesn't look real. So, as you hold down a button, the amount that your avatar changes position (their velocity) increases (acceleration). Release the button, and the velocity slows down (deceleration). All of that is present in Axeracer, and is pretty standard implementation.

#### The Hard Stuff

##### Sprite Rotation

Fortunately, for realism, the avatar you control isn't just one sprite always facing the same direction. Unfortunately, _rotating_ that sprite so it faces the direction you are moving was beyond my capacity alone, so I had to bring in [help](https://www.lexaloffle.com/bbs/?tid=2189). Thanks to Pico-8 BBS user _movAX13h_'s brilliant Pico Wheels game that had this amazing bit of code in it:

```lua
car.drw=function()
  local r=flr(car.rot*20)/20
  local s=sin(r)
  local c=cos(r)
  local b=s*s+c*c
  for y=-6,5 do for x=-6,5 do
    local ox=( s*y+c*x)/b
    local oy=(-s*x+c*y)/b
    local col=sget(ox+4,oy+4)
    if col>0 then
      pset(car.x+x-car.z,car.y+y-car.z,col)
      shadow(car.x+x+1+flr(car.z),car.y+y+1+flr(car.z))
    end
  end
end
```

Axeracer doesn't allow for jumping (yet), so I didn't need that `shadow` part, but the rest was golden. It essentially redraws the sprite as you rotate it, on-the-fly. Now I could turn my car around and around, and when it went forward, the front part of your avatar followed suit. Everything looked and acted much more realistic now. This was a huge part of making this particular prototype one I would end up expanding upon.

##### Sprite Zooming

As the project was reaching its end, I realized I wanted to add a countdown before you got control of your avatar (you know, 3..2..1..GO! kind of thing). You'd get to see these big numbers zooming in all dramatically, like I remember from other driving/racing games. Figuring out how to redraw sprites on the fly like with rotation was another roadblock, however.

Yet again, the Internet [saved the day](https://pico-8.wikia.com/wiki/Draw_zoomed_sprite_(zspr)):

```lua
function zspr(n,w,h,dx,dy,dz)
  sx = 8 * (n % 16)
  sy = 8 * flr(n / 16)
  sw = 8 * w
  sh = 8 * h
  dw = sw * dz
  dh = sh * dz

  sspr(sx,sy,sw,sh,dx,dy,dw,dh)
end
```

Using this wrapper `zspr()` method, it was a lot easier to figure out how to achieve the effect I was going for. Essentially, I had to set up a bunch of chain reactions that created a few `table`s, Pico-8's `array`, of sprite information, zoom into each sprite within, and then remove the array so the next frame updates wouldn't draw them anymore. I think I pretty much nailed it.

<p><img alt="3..2..1..GO!" src="{{ site.baseurl }}/assets/images/posts/2016/12/axeracer_countdown.gif" width="256" height="256" /></p>

#### Wrapping Up

Obviously, just having the one scene of a race track would be a little incomplete, so I also added a title screen scene which the game boots to, as well as _lose_ and _win_ conditions that just pop up a little dialog with some explanatory text. All of these details turn a _prototype_ into a **game**, in my opinion. Also, I added some music and sound FX to appropriate places to jazz it all up.

Another cool thing about Pico-8 is that it easily allows for screenshots and animated GIFs of your game, so documenting and marketing things are a snap. Thus, I put it up on [Game Jolt](https://gamejolt.com/games/axeracer/215403) for fun.

#### For the Road

I can definitely see using Pico-8 for quick prototypes of game ideas. Just being able to jump right into working code, especially now that I have templates to draw upon, really expedites the process. It's super easy to make lo-fi sprites and sounds, which I love. However, my next major project will be in [Stencyl](https://stencyl.com) for a game jam starting in a few days. Stencyl is a more modern GUI tool that's more complicated and allows for higher fidelity of graphics and sound and input. I look forward to seeing what it can do.
