# fretboard-api

### Strings numbering

Strings are numbered starting at 1 and from the lowest pitched to the highest pitched.

For a standard tuning, strings are 1=E, 2=A, 3=D, 4=G, 5=B, 6=E

### Frets numbering

Frets are numbered starting at 0 and from the head of the neck towards the bridge.

Fret number 0 is the nut, or the "zero fret" installed close the the nut on certain guitars.

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
    