# fretboard-api

    c = new Chord('C')

### Strings numbering

For the user: strings are numbered starting at 1 and from the lowest pitched to the highest pitched.

Implementation: strings are in an array 0-index.

For a standard tuning, strings are 1=E, 2=A, 3=D, 4=G, 5=B, 6=E

### Frets numbering

Frets are numbered starting at 0 and from the head of the neck towards the bridge.

Fret number 0 is the nut, or the "zero fret" installed close the the nut on certain guitars.

## `frets` and `fingers` format

The canonical format is a two-dimensional array:

- 1st dimension is strings
- 2nd dimension is frets

A muted string is represented by an empty frets array.

Example2:

C major scale:

    [[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10] [7, 8]]
    
A7 chord:    
    
    [[5], [], [5], [6], [5] []]

#### Allowed input formats:

Frets and fingers can be specified as strings or arrays. They will always be normalized as arrays.

`X` or `x` must be used to define a non-played (muted) string.

With only one fretted note per string:

    "022100" --> [[0], [2], [2], [1], [0], [0]]
    
    "5X565X" --> [[5], [], [5], [6], [5] []]
    
space are allowed, useful for frets > 9:

    "8 10 10 9 8 8" --> [8, 10, 10, 9, 8, 8]        
    
When more than one fretted note per string use a comma to separate the strings:

    "24,124,134,134,24,12" --> [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]
    
    "8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8" --> [[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10] [7, 8]]
    

## Frets normalization

*TODO*: normalize relative to the root ? That is, some fret will be negative.

Examples:

one fretted note per string:

    [8, 10, 10, 9, 8, 8] --> [[0], [2], [2], [1], [0], [0]]

more than one fretted note per string:

    [[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10] [7, 8]] --> [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4] [1, 2]]

root:

    root: "0 1" --> {string: 0, fret: 1}


## Chord

The mandatory attributes are `name` and `frets`:

    {
        name: "E major shape",
        frets: "022100"
    }

With all optional attributes:

    {
        name: "E major shape",
        quality: "",        // minor or lowercase m, or the symbols ° or + for diminished and augmented chords; quality is usually omitted for major chords
        suffix: "",         // all other characteristics
        bass: "",           // for slash chords                                 --> is it possible to determine the bass automatically?
        inversion: 0,       // 0 for no inversion, 1 for first inversion, ...   --> is it possible to determine the inversion automatically?
        root: 5,            // string number of the root note                   --> by default take the lowest pitched fretted string
        CAGED: "E",         // index of the pattern shape for this chord shape
        frets: "022100",    // X means string muted
        fingers: "032100"   // 0 means no finger on that string but the string should be played
    }

- root: by default the lowest pitched played string will be considered as the root.

## Scale

The mandatory attributes are `name` and `frets`:

    {
        name: "E shape major scale",
        frets: "1 3, 0 1 3, 0 2 3, 0 2 3, 1 3, 0 1 3"
    }

With all optional attributes:

    {
        name: "E shape major scale",
        CAGED: "E",
        frets: "1 3, 0 1 3, 0 2 3, 0 2 3, 1 3, 0 1 3",
        fingers: "2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4",
        root: "0 1"    // string index 0, fret 1   format: "<string> <fret>"
    }
        
- root: by default the first fretted note on the lowest pitched played string will be considered as the root.


## Free shape

    {
        name: "Minor pentatonic octave 1",
        minor: true,
        CAGED: "E",
        frets: "0 3,0 2,0 2",
        fingers: "1 4,1 3,1 3",
        root: "1 0"    // string 1, fret 0   format: "<string> <fret>"
        // offset: 1,       --> determined if lowest root has fret > 0
    }
    
# Resources:

- https://en.wikipedia.org/wiki/Guitar_tunings
- https://en.wikipedia.org/wiki/Stringed_instrument_tunings    
- https://en.wikipedia.org/wiki/Scientific_pitch_notation
