
- Shapes can be used without a Fretboard object
- Fretboard object provides tools that help to work with (groups of) shapes
    - Is a Fretboard object really useful ?
    

## Uses cases:

### Shapes only:

    maj = new ChordShape('M')     # Major chord, by default on first string, fret 0. Will use default tuning
    c_maj = maj.root('C')         # set the root
    
    maj = new ChordShape('M', string=2)     # ask for Major shape on string 2
        

### With Fretboard:

1. setup a fretboard with number of strings and tuning. Optionally define the (max) number of frets.
2. place a _shape_ on this fretboard
       a. the shape can represent a chord, a scale, an interval, a CAGED pattern, ...
       b. the position [string, fret] is optional and can be set later on.
       c. if the position is not specified, the shape will be placed so that the minimal fret is 0. 
3. move the _shape_, horizontally, by frets, or vertically, by strings. 
4. at any time, get the notes names, interval names, chord name, ... represented by the shape.

Allow several shapes to be placed on a single fretboard.

    f = new Fretboard(...)
    shape1 = f.addShape(...)    
    shape2 = f.addShape(...)
    shape1.moveTo({fret: 8})
    shape2.moveTo({string: 2, fret:3})
    shape1.reset()

Q: when moving across strings, adapt (update) the shape according to the current fretboard's tuning? 
A: yes, if the shape has a tuning defined, no if the shape was defined without any tuning indication. 



## Implementation:

Would be nice:

- no globals
- pure functions
    - no side effects
    
Maybe:

- Pure functions for transformations.
- Class (object) to encapsulate the pure functions and some globals (tuning, key). 
    
In use:

    f = new Fretboard({tuning: ['E', 'A', 'D', 'G', 'B', 'E']}
    
We must be able to define tuning as:

- array of notes
    - with or without octave
        - without octave: the lib should determine the octaves, if possible
- name of a predefined tuning
- array of intervals
- single interval

Examples:

    f = new Fretboard({tuning: ['E', 'A', 'D', 'G', 'B', 'E']}
    f = new Fretboard({tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']}
    
    c = f.chord({name: "E major shape", frets: "022100"})
    
    c.name --> "E"
    
Make a distinction between chord and chord shape ?

    cs = f.chordshape({name: "E major shape", frets: "022100"})
    
    c = cs.fret(8) --> {frets: "8 10 10 9 8 8", ...}
    c.name --> "C"

    c.frets --> [8, 10, 10, 9, 8, 8]
    c.notes --> ['C', 'G', 'C', 'E', 'G', 'C']
    c.intervals --> ['1P', '5P', '8P', '3M', '5P', '8P'] 

Q: how to get only ['1P', '5P', '3M']

A: put all intervals as a property, gives simple list of intervals with .intervals()

    cs = f.chordshape({name: "E major shape", frets: "022100"})
    
    c = cs.fret(8) 
    
        {
            frets: [8, 10, 10, 9, 8, 8], 
            fingers: [];
            notes: ['C3', 'G3', 'C4', 'E4', 'G4', 'C5'],
            intervals: ['1P', '5P', '8P', '3M', '5P', '8P'],
        }

    c.notes --> ['C', 'E', 'G']
    c.intervals --> ['1P', '3M', '5P'] 

Idea: add a .simple() method to arrays returned by .notes and .intervals

    c.notes --> ['C3', 'G3', 'C4', 'E4', 'G4', 'C5']
     
    c.notes.simple() --> ['C', 'E', 'G']




