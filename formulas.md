
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
    
    f(0, 8, 3, 1) = G3 - E2 + 1 - 0 = 8
    

### fret = f(note, string)

    fret = (note - tuning[string]) / semitone

### fret = f(fromFret, fromString, toString)

    fret = fret(note(fromFret, fromString), toString);

## Moving accross strings

Which corrections (frets +/-) we need to do if we move a shape to another string?

#### brainstorms...

first try:

    for each fretted note:
        interval_1 = note(string_to) - note(string_from)
        interval_2 = tuning(string_to) - tuning(string_from)
        correction = interval_2 - interval_1 
    
    A MAJ:

    tuning  note     semitones tuning-->note
    ------  -------  -----------------------
    E       A        5
    B       E        5
    G          C#    6
    D             A  7 
    A             E  7
    E       A        5

    tuning  note     semitones tuning-->note
    ------  -------  -----------------------
    E       A        5 
    B          F     6  must be corrected to F#
    G             D  7
    D             A  7 
    A       D        5
    E       A        5

    G - C# is tranformed in B - F
    6 semitones are transformed in 6 semitones
    
    F - C# = 8 semitones
    B - G = 8
    
    C# - F = 4
    G - B = 4

second try:

semitones from the root
    
    A MAJ:

    tuning  note     note index     
    ------  -------  -----------------------
    E       0        5
    B       7        4
    G          4     3 
    D             0  2 
    A             7  1  E
    E       R        0

    tuning  note     note index
    ------  -------  -----------------------
    E       7        4 
    B          3     3 must be corrected to 4     
    G             0  2
    D             7  1  A
    A       R        0
    E       7        5

    tuning  note     note index
    ------  -------  -----------------------
    E          3     3 must be corrected to 4 
    B            11  2 must be corrected to 12 (0)    
    G             7  1
    D       R        0 
    A       7        5
    E          3     4 must be corrected to 4

    semitones(index_from, index_to) 
    
    0-1 : 7
    0-2 : 0
    0-3 : 4
    0-4 : 7
    0-5 : 0
        
    0-1 : 7
    0-2 : 0
    0-3 : 3 --> must be corrected
    0-4 : 7
    0-5 : 7 --> unison string --> copy 
        
    0-1 : 7
    0-2 : 11 --> must be corrected 
    0-3 : 3  --> must be corrected
    0-4 : 3  --> unison string --> copy
    0-5 : 7 
    
    start from the root note string
    move the root to its new string
    for each string:
        if new string in unison: copy
        else:
            for each fretted note:
                if root note: skip
                get semitones from root to current note in original shape     
                get semitones from root to current note in new shape
                compare and correct if needed
    
