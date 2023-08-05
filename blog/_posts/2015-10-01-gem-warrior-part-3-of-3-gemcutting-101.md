---

layout: post
title: "Gem Warrior: Part 3 (of 3): Gemcutting 101"
tags: game gaming ruby text adventure gemwarrior gem guide markov yaml audio yaml wrapup
excerpt: "For the most part, Gem Warrior is done. What a blast it has been! I'm not sure I've worked so hard on a project in a long time."

---

(Previous posts [1](/2015/06/08/gem-warrior-part-1-of-who-knows/) and [2](/2015/07/16/gem-warrior-part-2-of-some-indeterminate-number/))

For the most part, [Gem Warrior](https://gw.neb.host) is done. What a blast it has been! I'm not sure I've worked so hard on a project in a long time.

I made a game!

<!--more-->

How do I know I'm done? Besides the relative burnout I feel from working on it for a while, the features I most wanted to implement are in, and all the bugs that have cropped up (that I know ;P) are fixed. There is a world of Jool, a player to control, levels and abilities to attain, items to get and use (and equip if appropriate), monsters to fight, some people to talk to, and a final boss to defeat. It's as complete a game as I'm willing to make it.

Now, for the first time, I'm going to take a little walk through how the game works, both game-wise and code-wise, which will be long and detailed. However, if you are making a game in Ruby (or whatever), I think it may be enlightening.

## Table of Contents

- [What is a Game?](#what-is-a-game)
- [Gem Structure](#gem-structure)
- [Game Structure](#game-structure)
  - [Main Menu](#main-menu)
  - [Main Prompt](#main-prompt)
  - [Debug Mode](#debug-mode)
  - [Battle](#battle)
  - [Merchants](#merchants)
  - [Extra Fun Stuff](#extra-fun-stuff)
    - [Audio Systems](#audio-systems)
    - [Naming and Markov Chains](#naming-and-markov-chains)
    - [Wordnik Word Generator](#wordnik-word-generator)
    - [Grid Cartographer](#grid-cartographer)
  - [Game Over!](#game-over)
- [Overall Difficulties](#overall-difficulties)
  - [Style Consistency](#style-consistency)
  - [Testing](#testing)
  - [Ruby Setup/Deployment](#ruby-setupdeployment)
  - [Interest](#interest)
- [What's Next?](#whats-next)
- [For the Road](#for-the-road)

## What is a Game?

This question may be either overly philosophical or inane, depending on who you ask, but as someone who wanted to make one from the ground up, it was a question I needed to answer.

A game (`Game`), as I defined it, is a digital realm (`World`) that you enter and interact via an avatar (`Player`) of some sort. There is an entrance point (`Location.new('Home')`), a journey of some sort where you travel around (`Location`) and interact (positively and negatively (`Battle`)) with the environment (`Entity`\\`Creature`\\`Person`\\`Monster`), changes to your avatar, and then an exit point (of sorts). All this is facilitated by an interface (`REPL` (Read Evaluate Print Loop)) that allows for certain commands to be parsed. The rest (whether it has a story or graphics or sound or multiplayer or 3D VR is functionally gravy. Hopefully well-made and tasty gravy, but gravy, nonetheless.

## Gem Structure

A neat tree diagram of the overview of the Gem Warrior gem!

{% highlight console %}
├───assets (annotated map of Jool, web graphic header)
├───bin (main Ruby gemwarrior binary)
├───data (world data in YAML, name data in YAML for markov chain name generation)
├───lib
│   └───gemwarrior (game, world, repl, etc.)
│       ├───entities (entity, creature, item, person, monster, etc.)
│       │   ├───armor
│       │   ├───creatures
│       │   ├───items
│       │   ├───monsters
│       │   │   └───bosses
│       │   ├───people
│       │   └───weapons
│       └───misc (auxiliary classes, e.g. audio, name_generator, wordlist, etc.)
{% endhighlight %}

## Game Structure

Using the same neat tree diagramming thingamajig, now you can see the hierachy of objects as they get added to the game:

{% highlight console %}
├───Game
│   ├───GameAssets
│   ├───GameOptions
│   ├───World
│   │   ├───Player
│   │   |   └───Inventory
│   │   |       └───Items
│   │   └───Locations
│   │       └───Location
│   │           ├───Items
│   │           ├───Entities (Creatures, Monsters, Persons, Items, Weapons, Armor)
│   │           └───paths (north, east, south, west)
│   └───Repl
│       └───Evaluator
│           └───commands (and aliases)
{% endhighlight %}

The Gem Warrior gem initally creates a new `Game` instance. The first two things that instantiates are a `GameAssets` module instance (all of the entities in the game for both reference in debug and for a pool to clone from) and a `GameOptions` module instance (all of the various game option).

More importantly, it creates a `World` instance, which has a `Player` instance associated with it, and a bunch of `Location` instances (each of which may have their own set of `Creature`, `Person`, `Monster`, `Weapons`, `Armor`, or `Item` instances). Some of those `Location` instances may also have certain boss `Monster` instances that I place when the game is loaded. Otherwise `Monster` instances are spawned somewhat randomly (although constrained by the `Player` level and the `Location` stats).

Besides all that, there are several dependencies on other gems like `colorize` (string color), `matrext` (string animation), and `bloops` (audio).

Now to walk through the game once it has loaded!

### Main Menu

The `Game` instance has attributes with sane defaults, but they can be overridden by both a `gw_opts` file and command line switches (e.g. `-n` to immediately begin a new game) that further override said options. The first thing you see when the game loads is a main menu (so pro!) which allows you to, among other things, modify some of those options:

{% highlight console %}
/-+-+-+ +-+-+-+-+-+-+-\
|G|E|M| |W|A|R|R|I|O|R|
\-+-+-+ +-+-+-+-+-+-+-/

      GW v0.15.1
=======================
 (R)esume Game
 (N)ew Game
 (A)bout
 (H)elp
 (O)ptions
 (L)og of Attempts
 (C)heck for Updates
 (E)xit
=======================
{% endhighlight %}

From here, you get a few helpful paths to go down (like a pre-game game). You can resume a previous game (if one exists), start a new one, display some basic game info, change the aforementioned game options, check out past attempts, check for updates, or get out. Nothing revolutionary, but learning about the different ways to save and load game data (I opted for one big ol' YAML dump) and even doing some light HTTP API connecting to [Rubygems.org](https://rubygems.org) for gem status were newish to me.

### Main Prompt

Assuming you either start a new game or resume a previous one, you're presented with the following prompt that you'll be using to interact with the game:

{% highlight console %}
[>>> HOME <<<]
The little, unimportant, decrepit shack that you live in. What the place lacks in decisive magnanimity is made up for in cozy squalidness. Your bed covers much of the northern corner. Your beloved family chest sits at the foot of the bed. Next to the bed, on the floor, is a folded-up tent. Atop the chest you notice a curious letter, folded in three.
>> Thing(s):    bed, chest, letter, stone, tent
>> Path(s):     north, east, west

[LV: 1][XP:  0][ROX:300][HP: 30/30 ] [Belyd @ Home]
 GW>
{% endhighlight %}

You start in your home, with nothing on your person, and a few things to interact with in the general vicinity. There are some exit paths, too. Then you notice, below that, your heads-up display of sorts, that shows your level, experience, rox (money), hit points, and a shortcut `name`@`location` widget because you're not always using the `look` command. It's a bar of commonly-noted stats, essentially.

Under all that is your trusty main prompt, which will re-display itself after each command (unless you are in battle or conversation with someone, as they have their own sub-prompts). A light in the dark, a pen on the paper, a sword in your scabbard. It is where you type all the commands that the game understands, just like any good text adventure or Interactive Fiction game or command line utility.

A quick type of `help` will bring up the rest of the commands you should be aware of in Gem Warrior:

{% highlight console %}
GW> help
================================================================================
COMMAND     | ALIAS | DESCRIPTION
================================================================================
character   | c     | Display character information
look        | l     | Look around your current location
rest        | r     | Take a load off and regain HP
take        | t     | Take item
talk        | tk    | Talk to person
inventory   | i     | Look in your inventory
use         | u     | Use item (in inventory or environment)
drop        | d     | Drop item
equip       | eq    | Equip item
unequip     | ue    | Unequip item
go          | g     | Go in a direction
north       | n     | Go north (shortcut)
east        | e     | Go east (shortcut)
south       | s     | Go south (shortcut)
west        | w     | Go west (shortcut)
attack      | a     | Attack a monster (also fight)
breakthru   | br    | Teleport to a location (if you are experienced enough)
change      | ch    | Change attribute
version     | v     | Display game version
checkupdate | cu    | Check for newer game releases
help        | h     | This help menu (also ?)
quit        | q     | Quit w/ confirmation (also exit/x)
quit!       | qq    | Quit w/o confirmation (also exit!/xx)
================================================================================
{% endhighlight %}

I will refrain from going through every single command, as hopefully the menu explains them well enough. In addition, there are many hidden debug commands that only work if the game is in "debug mode". This can be entered through a command line switch when loading the game.

### Debug Mode

{% highlight console %}
================================================================================
 DEBUG COMMANDS
================================================================================
 god         | gd    | Toggle god mode (i.e. invincible)
 beast       | bs    | Toggle beast mode (i.e. super strength)
 constants   | cn    | List all GameAssets
 list        | ls    | List all instances of a specific entity type
 vars        | vs    | List all the variables in the world
 map         | m     | Show a map of the world
 stat        | st    | Change player stat
 global      | gl    | Change world global variable
 teleport    | tp    | Teleport to coordinates (5 0 0) or name ('Home')
 spawn       | sp    | Spawn random monster
 levelbump   | lb    | Bump your character up *n* levels
 restfight   | rf    | Rest, but ensure battle for testing
================================================================================
{% endhighlight %}

A debug mode is pretty common in games, I assume, as the developer really needs to be able to skirt the rules and change statistics at will in order to test, and getting those achievement naturally takes much too long in-game. As features got added, or I found specific bugs that needed more attention, I added more and more debug commands in order to "fast-forward" to those moments.

### Battle

Most games have some kind of conflict-resolution between the `Player` and any other `Entity` that is sentient and both morally and violently opposed. We call this "battle". In Gem Warrior, once battle is instigated, your prompt changes to a battle prompt, with its own commands. You don't return to the regular prompt until you either defeat the monster, run away, or they defeat you.

{% highlight console %}
GW> f alexandrat
*******************************************************************
 BATTLE BEGINS!
*******************************************************************
  You decide to attack alexandrat!
  alexandrat cries out: "Bitey, bitey!"

  BELYD        ::  10 HP
  ALEXANDRAT   :: ??? HP

  What do you do?
  [Fight][Defend][Look][Item][Pass][Run]
  [BATTLE]>
{% endhighlight %}

I wrestled with how to handle this, as different decisions lead to different kinds of games. Games have tried various approaches to this conflict, ranging from the old-school random battles all the time to battles you can avoid by careful maneuvering to battles you can sidestep through diplomacy. Since I did not want to build a complex dialogue tree, I figured that last one was out, but I also did not want to do the first thing because I spammed the fight button enough as a kid during countless random battles.

Thus, what I ended up with is this: enemies, which are either placed strategically in a couple locations to block passage or spawned randomly as you move around, *only fight when attacked*. The only exceptions are one boss monster in a specific, dangerous area and if you rest without a tent. This allows the `Player` to explore safely and instigate battle only when they are ready. More text adventure than RPG, I guess.

One place in the game, called the Arena, allows for an infinite flow of battle, if you want, but it costs money.

### Merchants

There are some people in the game that you can talk to and enter conversations. Some of those people are actually merchants.

{% highlight console %}
Rockney's Hole in the Wall
--------------------------
(1) Herb     - 10 rox
    Green and leafy, this wild herb looks edible.
(2) Dagger   - 150 rox
    Flint that has been sharpened to a point, attached to a block of smooth granite by thin rope. Truly a work of art.
    Attack: +1-3 (current: 1-2)

>> "What are you in need of?"

 1 - Herb   10
 2 - Dagger 150
 x - leave

REMAINING ROX: 300
ITEMS SELECTED:
[ROCKNEY]>?
{% endhighlight %}

When in conversation with a merchant, you get a different prompt, much like battle, with its own commands. Your current money is displayed and compared to the amount of the purchases you put into the "ITEMS SELECTED" *cart*. If you got enough rox upon exit, then you buy its contents.

### Extra Fun Stuff

Embarking on a project of this scope, one is bound to veer off into side projects because of features you want to implement.

#### Audio Systems

Prior to Gem Warrior, I had played around with making sound on the command line with Ruby in various ways. One way that was most versatile was [feep](https://github.com/michaelchadwick/feep). With a simple command, you could make a note (or group of notes, i.e. a chord) play out of your speakers at a certain frequency, volume, and duration. It's fun to play around with, but I found out quickly that its performance is terrible, especially in a more fast-paced game with a battle system. The main issue is that feep creates raw audio files on-the-fly, which is not very fast, and so despite it being threaded, there was still this obvious lag, and sometimes it would even crash the game.

Thus, I needed something better! Something that was more low-level, and most likely written in C or something, and compiled to Ruby. And I found it right away...for Windows. The [win32-sound](https://github.com/djberg96/win32-sound) gem does enough of what I needed to be a replacement, but it would not work on Mac or Unix. Only recently did I find another gem, with the comical name of [bloopsaphone](https://github.com/mental/bloopsaphone), that not only works on Mac and Unix, but also Windows, so it became the default mode for all my bleeps and, uh, bloops. Feep is still an option, but not recommended.

#### Naming and Markov Chains

The game generates a new name for you when you begin. At first I was just choosing random letters from the alphabet to create a novel, unique name. It's lazy, but got the job done. Later, I learned about how you can use sample name data and a [markov chain](https://en.wikipedia.org/wiki/Markov_chain) algorithm to generate unique noms de plume that actually share the characteristics of the names in your sample data. Big props goes out to [donjon's RPG Tools](https://donjon.bin.sh/)'s page, which included, among many other fascinating tools, source code for a [Javascript implementation](https://donjon.bin.sh/code/name/) of this process, which I painstakingly [translated to Ruby](https://github.com/michaelchadwick/gemwarrior/blob/master/lib/gemwarrior/misc/name_generator.rb). In the end, all that hard work just makes the "random" names chosen a lot less random, but I think it was worth it!

#### Wordnik Word Generator

Each creature, besides having a name and description, also has three distinguishing characteristics: face, hands, and mood. I had bigger plans for how these would change depending on certain circumstances, but I only got as far as creating unique ones for each creature.

In order to make them more interesting beyond the words I put in statically, [Wordnik](https://developer.wordnik.com) exposes a public API you can call to get random words to use in your application. If you turn on that option in the main menu (or with a command line switch), these values will be grabbed from Wordnik. The little fortune upon load, as well as some of the descriptions throughout the game will benefit from it, as well.

#### Grid Cartographer

Once Gem Warrior's world of Jool got big enough, I decided I needed to start mapping it out somewhere besides my head. The best tool I found, that is worth every penny, is David Walters's [Grid Cartographer](https://www.davidwaltersdevelopment.com/tools/gridcart/). Easy to use, cross-platform, and featuring just about everything I needed for my small little game, I heartily recommend it.

### Game Over!

Besides navigating the main menu, getting acquainted with the main prompt, entering commands, interacting with things, and engaging in battle with monsters, that's basically the game. There is a specific "end point" you can reach if you get to the right location and interact with your environment in the appropriate manner (i.e. kill the boss, return the magical thingy), but you are still returned to the game after and can then go about doing whatever you want (open world, woo!).

## Overall Difficulties

Of course, there are always some things that come up whenever you code that prove difficult. Figuring out the logic for how to represent and manipulate an idea in a programming language is the fundamental task at hand, and it isn't always easy or efficient. The way you come up with may work, but it may not be the best way.

### Style Consistency

I found as the months went by I kept changing my approach as to how I'd code a specific bit of functionality. Refactoring is a normal process, and it always felt good to replace some gangly chunk of spaghetti into a leaner, smaller chunk of...penne? However, I didn't always change the older pieces that suffered from the *Before Way*, so there's often a mix of paradigms scattered throughout the project, making things look inconsistent.

### Testing
I've never been good at testing my code. TDD and BDD are acronyms I'm familiar with, but I've never gotten beyond doing basic tutorials. I *debug*, but I don't test. My methods to "test" are:

  * print statements
  * using a debugger

These methods are all reactive, as you use them when things have already gone wrong (like you broke your code). Testing is precautionary, as it posits some kind of condition, and then you code something that satisfies it (at least in TDD). My pattern seems to be to dive right into coding the structure and features of a project, and by the time it gets sufficiently complex I'm "too far in" to start writing tests, because I'm not even sure where to begin at that point.

The lesson, yet again? TEST FROM THE BEGINNING. It's fine to outline some pseudo-code skeleton of a project, but once you're actually coding implementation, you'd better be writing tests alongside it, otherwise the weeds take over. Without tests, I spent a significant amount of time with [pry](https://pryrepl.org/) hunting down issues in my code. Implementing new features was always a little bit scary, because even with git branches as backup, you still don't know if what you're adding is breaking things.

### Ruby Setup/Deployment

Getting Ruby set up to work and run your application with all its dependencies is no small task, especially for someone who is not steeped in the development world. I've spent plenty of time getting my own machines into a state that's useable, but some people could not even *load* Gem Warrior, let alone play it because some dependency wouldn't load and/or couldn't be installed. Ruby is a fine language and I enjoy using it for the most part, but it's an interpreter, so you need some finessing to get an application into the mainstream standard of "type this one word and you are playing" or "double-click this icon and you are playing". I tried both [Traveling Ruby](https://phusion.github.io/traveling-ruby/) and [OCRA](https://ocra.rubyforge.org/) but neither ever got me to the one-size-fits-all state I wanted Gem Warrior to be in to easily deploy it to someone else so they could playtest it.

### Interest

Sigh. Unfortunately, this is not a code/design issue, but a marketing one. The second thing is largely dependent on this issue, as without interest, it's kind of moot whether anyone is having trouble getting your game to run. Thankfully, I had a couple testers who helped out a bunch, but it's not a big enough sample size. I used [MailChimp](https://mailchimp.com) for the first time to create a newsletter people could subscribe to, and I'd like to think that made me seem a bit more professional than usual.

## What's Next?

Now that I've proven to myself that I can create a game from scratch, I'd love to make another one. The issue with a text adventure/RPG is that once the engine is done, the meat of the process is really creating **content**. Typing commands into a parser is not amazingly fun (probably why we created GUIs), so you want to be reading interesting things and/or doing something skillful. Gem Warrior is largely a bunch of simple actions and random dice rolls. Creating content is where your creativity and imagination and general life experience come into play. If you've ever written a story or made a movie or penned a composition, you know that this process is hard to pin down and even harder to make **compelling**.

The story in Gem Warrior is pretty standard defeat-boss-and-save-world-boilerplate, although I thought that using rock-related descriptions and such at least gave it a unique identity. However, coming up with new *stuff* to fill the world is tough, and I think my next game project will definitely focus more on the mechanics of a game, perhaps picking a simple one that is fun to play, regardless of the content.

## For the Road

I hope my tale of making my first real game was fun and helpful and maybe even inspirational. It was really, really enjoyable to make, and I look forward to the next challenge.
