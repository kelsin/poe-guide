# poe-guide

Small CLI tool to help with Path of Exile Leveling

## Usage

You run the tool once with the location of your game log as the `-l` parameter.
After that it remembers this setting and doesn't require it again. Depending on
your system you might need to run with polling in order for it to accurately
watch your game file.

So run something like this once, with the path to your game log:

```sh
poe-guide.exe -l "D:\SteamLibrary\steamapps\common\Path of Exile\logs\Client.txt"
```

After that you can run without the `-l` parameter. Add the `-p` parameter if
it's not recognizing your zone changes:

```sh
poe-guide.exe -p
```

## Controls

The following keybindings are available when the app is running:

| Key | Use |
|-----|-----|
| b | Go to beginning |
| e | Go to end |
| h | Go backward one act |
| l | Go forward one act |
| k | Go backward one step |
| j | Go forward one step |
| r | Reset death counter |
| q | Quit |

## Changes

Right now I'm sure it isn't perfect but can get me from Act 1 to 10 without
looking at other guides. If you have any suggestions for changes please let me
know either as issues on [github](https://github.com/kelsin/poe-guide/issues).

I would love to eventually provide options where you can turn on or off
different options (Such as "Do trials" or "All quests" or "Only passive quests"
or "No extra quests") but for now it's just hardcoded to include all passive
quests and the easiest of the non passive optionals.
