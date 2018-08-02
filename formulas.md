
# Fretboard formulas

Conventions:

- Strings are numbered from 0 to N, with 0 being the lowest pitched string

### Tuning

The default guitar tuning is:

    [E2, A2, D3, G3, B3, E4]

There are (strings - 1) intervals:

    [4P, 4P, 4P, 3M, 4P]

in semitones:

    [5, 5, 5, 4, 5] = 24 semitones = 2 octaves  


## Given a tuning t, define the following formulas:

### note = f(string, fret)

    note = tuning[string] + semitone * fret    

### interval = f(fromString, fromFret, toString, toFret)

TODO

    interval = tuning[toString] - tuning[fromString] + toFret - fromFret
    
    f(0, 8, 3, 1) = G3 - E2 + 1 - 0 = 
    

### fret = f(note, string)

    condition: note >= tuning[string]
    
    fret = (note - tuning[string]) / semitone

### fret = f(fromFret, fromString, toString)

TODO
