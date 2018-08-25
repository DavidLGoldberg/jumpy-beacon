# Jumpy-beacon

An Atom package that gives an ocular cue to assist in tab switching.

[1]: https://raw.githubusercontent.com/DavidLGoldberg/jumpy/master/_images/jumpy-beacon.gif

## Install
On command line:
```
apm install jumpy-beacon
```

## Notes

*   Works great with or without [Jumpy](https://github.com/atom/jumpy)!

## Settings

None yet!

### Jumpy-beacon Styles

Note: Styles can be overridden in **'Atom' -> 'Open Your Stylesheet'**
(see examples below)

```less
atom-text-editor {
    .jumpy-beacon {
        // Regular labels
        background-color: black;
        color: white;
        &.high-contrast {
            // High Contrast labels (activated in settings)
            background-color: green;
        }
    }
}
```

## My other Atom package :)

*   [Jumpy](https://atom.io/packages/jumpy)
*   [Qolor](https://atom.io/packages/qolor)
