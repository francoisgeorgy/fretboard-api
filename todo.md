

### create Shape from:

- frets
- intervals
- notes
- scale

### Tuning

    Define tuning as:
        - fixed set of notes
        - function(from-string, to-string)
        - function(to-string)
  
### Shape property:

    ADD option to display non played string as 'X' or nothing
    ADD option to set root as single number (string) or set {string,fret}. Second format is important for scales and arpeggios

    barre : strings to barre with first finger. First string can be specified, otherwise is implied.
    fretboard : pointer to parent
    stackedIntervals       

### Shape methods:

    diff(shape) 
    highlight(interval)
    only(interval)
    add(interval)
    octave(n)

examples:

    highlight('3m')
    hightlight(octave(1))
    
Q: return a new Shape or modify in-place ? if return new Shape, add-it (or replace old) in the parent Fretboard ?

Q: do CAGED forms work with other tunings?    
    
### create from Shape:

    cadenza(shape)
    groupsOf(n)
    
    
    
    
    
    
    

