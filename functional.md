# What we would like
       
    f = fretboard(tuning, 12)       # create a fretboard with a specific tuning and 12 frets

    s = shape(frets)                # create a shape
    
We don't really need to link the shape to a fretboard, because we only need to know the tuning.      
    
    s = shape(frets, tuning)        # create a shape with a specific tuning
    
    
    


# Choices

- store the minimum set of data
- compute all derivated data each time 
    - time these functions. If too compute-heavy, pre-compute and add to the base data-structure.

# Data structures

## Fretboard data structure:

    {
        tuning: [...],
        frets: 12,        
        shapes: [...],
    }

## Shape data structure:

    {
        frets: [...],           # user specified
        fingers: [...]          # user specified
        root: [...],            # user specified or auto-computed
        position: [...]         # user specified or auto-computed
        intervals: [...]        # computed
        notes: [...]            # computed
        intervalsSimple: [...]  # computed
        notesSimple: [...]      # computed
    }

# Functions

## utilities:

    intervals(shape[, tuning]) --> Array
    intervals(frets, root, tuning) --> Array
    
    intervalsSimple(intervals) --> Array

    intervalSimple(interval) --> String

    notes(shape[, tuning]) --> Array
    
    notesSimple(notes) --> Array
    
    noteSimple(note) --> String
    
    chromas(shape[, tuning]) --> Array

## shape creation:

    from(frets[, tuning, root, position]) --> shape

## shape modifiers:

    moveTo(shape, string, fret) --> shape       # shape is not changed; intervals may change depending on the tuning.
    
    moveToString(shape, string) --> shape       # shape is not changed; intervals may change depending on the tuning.
    
    moveToFret(shape, fret) --> shape           # shape is not changed; intervals may change depending on the tuning.

    transposeByString(shape, string[, tuning]) --> shape
    
    
