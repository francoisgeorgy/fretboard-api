# fretboard-api

Usage:

1) Instantiate a *Fretboard*. The fretboard will define:
    - number of strings
    - tuning
    - number of frets
2) Place _*Shape*_ on the Fretboard. A _shape_ is a collection of played positions. This can be a chord, an interval, a scale, etc.
3) Shapes can then be moved and transposed.

When _*moving*_ a shape, the shape's *form* never changes. If the shape is moved to a different string, then the shape's intervals 
are changed depending on the tuning.

When _*transposing*_ a shape, the shape's *intervals* never changes. If the shape is transposed to a different string, then the shape's frets 
are changed depending on the tuning.

### Assumptions

- western tonal music: 12 semitones

## Conventions

### Strings numbering

#### for the user

For the user: strings are numbered starting at 1 and from the lowest pitched to the highest pitched.

For a standard tuning, strings are 1=E, 2=A, 3=D, 4=G, 5=B, 6=E

#### for the coder (implementation)

Implementation: strings are in an 0-indexed array.

### Frets numbering

Frets are numbered starting at 0 and from the head of the neck towards the bridge.

Fret number 0 is the nut, or the "zero fret" installed close the the nut on some guitars.

## `frets` and `fingers` format

The canonical format is a two-dimensional array:

- 1st dimension is strings
- 2nd dimension is frets

A muted string is represented by an empty frets array.

Example2:

C major scale:

    [ [8, 10], 
      [7, 8, 10], 
      [7, 9, 10], 
      [7, 9, 10], 
      [8, 10] 
      [7, 8] ]
    
A7 chord:    
    
    [ [5], [], [5], [6], [5] [] ]

#### Allowed input formats:

Frets and fingers can be specified as strings or arrays. They will always be normalized as arrays.

`X` or `x` define a explicitely non-played (muted) string.

`-` define a ignored string.

'0' denote a played open-string.

With only one played note per string:

    "022100" --> [ [0], [2], [2], [1], [0], [0] ]
    
    "5X565X" --> [ [5], [], [5], [6], [5] [] ]
    
space are allowed, useful for frets > 9:

    "8 10 10 9 8 8" --> [8, 10, 10, 9, 8, 8]        
    
When there are more than one played note per string, use a comma to separate the strings:

    "24,124,134,134,24,12" --> [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]
    
    "8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8" --> [[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10] [7, 8]]
    

## Frets normalization

*TODO*: normalize relative to the root ? That is, some fret will be negative.

Examples:

one played note per string:

    [8, 10, 10, 9, 8, 8] --> [[0], [2], [2], [1], [0], [0]]

more than one played note per string:

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
        root: 5,            // string number of the root note                   --> by default take the lowest pitched played string
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
        
- root: by default the first played note on the lowest pitched played string will be considered as the root.


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

# API

## Conventions

### Method parameters

The format is method(mandatoryParam1, mandatoryParam2, ... mandatoryParamN, {optionalParams})

All _mandatory_ parameters are passed as normal parameters.

All _optional_ parameters are passed as an object.

If the method does not require any _mandatory_ parameter and only has _optional_ parameters, than the method has
only one object parameter.

### Parameters order

When a method require both a string number and a fret number, then the order is always string, fret. 

    
# Tests

All tests:

    yarn test
    
One specific test:
            
    yarn test Fretboard.test.js
    
    
# Resources:

- https://en.wikipedia.org/wiki/Guitar_tunings
- https://en.wikipedia.org/wiki/Stringed_instrument_tunings    
- https://en.wikipedia.org/wiki/Scientific_pitch_notation
