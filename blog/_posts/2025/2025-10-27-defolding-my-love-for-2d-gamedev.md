---
layout: post
title: 'Defolding My Love For 2D Gamedev'
date: 2025-10-27
description: "Season two of Hacking the Grepson is all about making a game. After some consideration, the decision to use Love2D and/or Defold, two different game engines, was made and a concentrated effort to tinker with both of them has begun."
tags: defold htg gamedev love2d lua podcast
headerImage: posts/2025/defold-love2d-gamedev.jpg
headerImageCaption: 'Love and Defold logos floating in a wild landscape'
image: posts/2025/defold-love2d-gamedev.jpg
published: true
---

{{ page.description }}

<!--more-->

## CONTEXT

For the first 100 episodes of [Hacking the Grepson](https://hackingthegrepson.com), the podcast about programming and related topics that my friend Matt and I do every other week, we did various topics. These topics include the following: programming languages, Wordle, software development life cycle, documentation, Factorio, technical debt, data analytics, Slay the Spire, version control, and many more.

You may have noticed a few proper nouns in that list, and those proper nouns are all what? GAMES. Many people become programmers to make games, and then end up working on spreadsheets or websites to pay the bills because those are generally easier and more applicable to more people. However, that itch to make a super cool game that's fun and addictive never quite goes away.

## ACTION

Thus! For season 2 (episode 101+) we decided to try something different and just have one topic for as many episodes as it takes: Make a Game (Together). That means we have had to decide what kind of game we are going to make, what to make it in, and then...make it and deploy it to the world.

After a couple of episodes (and some offline chatter), we have both gravitated to using [Love2D](https://love2d.org) (for prototyping) and [Defold](https://defold.com) (for the final product). I'd played with the former back in the day ([Balatro](https://playbalatro.com) was made with it!), but never even heard of Defold until Matt brought it up (apparently it was created by an offshoot of [Avalanche Studios](https://avalanchestudios.com/), the makers of Just Cause). They both use [Lua](https://lua.org), a very popular scripting language that seems to be embedded in a lot of other things (I remember first experiencing it when investigating World of Warcraft mods waaaaay back in the day).

As far as which kind of game we are going to make, or which platform, or which control scheme, or which theme, or which mechanics, or `[insert-other-aspect-of-game]`...that is still being actively decided. At least we know which tool(s) we are going to use, and are both getting the hang of both. I've been making prototypes, going through tutorials, and testing the online documentation and wikis of both tools.

### LOVE2D

Love (or LÖVE, as the creators stylize it, and as Love2D, which is how I will refer to it to make it distinct from the emotion/concept) is a [free, open-source framework](https://github.com/love2d/love) built on Lua, which means it takes the base Lua scripting language and adds a bunch of `love` (objects/classes) to it, and allows you to compile and run it (or export it to various things). Love2D has no IDE, so you write your code in a text editor of your choice, and build whatever pre-existing assets you want to use in whichever tool you choose, referencing them in code, but with no Love2D-specific GUI tooling to manipulate or organize them.

Here is some example code from a 2-player game's drawing routine:

```lua
function love.draw()
  love.graphics.setBackgroundColor(0, 0, 0.3)

  -- draw player1
  love.graphics.setCanvas(screenCanvas)
    love.graphics.clear()
    drawEntities(player1)
  love.graphics.setCanvas()
  love.graphics.draw(screenCanvas)

  -- draw player2
  love.graphics.setCanvas(screenCanvas)
    love.graphics.clear()
    drawEntities(player2)
  love.graphics.setCanvas()
  love.graphics.draw(screenCanvas, 400)

  -- Add a line to separate the screens
  love.graphics.line(WinWidthCenter, 0, WinWidthCenter, WinHeight)

  -- draw scores
  love.graphics.print("$1: " .. player1.score, 10, 10)
  love.graphics.print("$2: " .. player2.score, 10, 30)
end
```

### DEFOLD

Defold is a fully-fledged game engine and IDE (write your code and build projects from the application) also built on Lua. You spend most of your time in the application, writing code, creating tilesets and animations, and organizing things inside Game Objects and Collections. You still build your pre-existing assets in whichever tool you choose, but once inside Defold there are more GUI affordances for manipulating and integrating them.

Here is an excerpt from an avatar's update routine:

```lua
function update(self, dt)
  ...

  local anim = self.current_anim
  local dx, dy = axis_to_vec(self.input)
  local moving = (dx ~= 0 or dy ~= 0)

  -- Update facing direction and animation when moving
  if dx < 0 then
    anim = hash("left")
    self.facing_direction = vmath.vector3(-1, 0, 0)
  elseif dx > 0 then
    anim = hash("right")
    self.facing_direction = vmath.vector3(1, 0, 0)
  elseif dy > 0 then
    anim = hash("back")
    self.facing_direction = vmath.vector3(0, 1, 0)
  elseif dy < 0 then
    anim = hash("front")
    self.facing_direction = vmath.vector3(0, -1, 0)
  else
    -- When stopped, switch to idle only if facing front, otherwise keep current animation
    if self.facing_direction == vmath.vector3(0, -1, 0) then
      anim = hash("idle")
    else
      anim = self.current_anim
    end
  end

  ...
end
```

## PROGRESS THUS FAR

After almost two months of this experiment, and many hours put into both tools, it's hard to say one is a clear winner. They both use Lua, so there's no real difference there. Love2D is more of a "write code and run compiler on command line" flow, whereas Defold is an "open project, tinker, (re)-build" flow. They both run quickly and allow for quick iteration. Defold having built-in tilesource/tilemap support so you can easily build sprite-based levels is nice. However, I'm still getting tripped up on its collection/game object organization scheme. Love2D feels closer to Pico-8, which I've used a lot, but it's missing the latter's sprite/music editors (as is Defold).

Basically, this point in the project is still mainly learning tooling and trying to form muscle memory for the basic foundational things, so progress consists largely of going through tutorials, tweaking them, and spending a lot of time in Google/Wikis/Ollama. It's not all fun, and often frustrating, but that's part of the journey.

For now, I'm enjoying spending time messing around with various prototypes here and there and then doing a bi-weekly checkin with Matt on the podcast. It's almost like recording a development team's standup. I also started a "blog" of sorts which just consists of notes about each checkin, so we have a record of what we did each meeting, and can look back on progress.

## FOR THE ROAD

Hopefully all of this coalesces into a single project that we share and iterate on, but for now it's just the wild west of gamedev, baby.
