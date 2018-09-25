

### create Shape from:

- frets
- intervals
- notes
- scale

### Shape property:

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
    
    
    
    
    
    
    

