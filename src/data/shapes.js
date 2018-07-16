const OCTAVES = {
    octave: {
        name: 'Octave form',    // octave string 1
        frets: '0 X X X X 0'
    },
    octave_c: {
        name: 'Octave C form',  // octave string 2
        frets: 'X 3 X X 1 X'
    },
    octave_a: {
        name: 'Octave A form',  // octave string 2
        frets: 'X 0 X 2 X X'
    },
    octave_g_1: {
        name: 'Octave 1 G form',    // octave string 1
        frets: '3 X X 0 X X'
    },
    octave_g_2: {
        name: 'Octave 2 G form',    // octave string 4
        frets: 'X X X 0 X 3'
    },
    octave_e_1: {
        name: 'Octave 1 E form',    // octave string 1
        frets: '0 X 2 X X X'
    },
    octave_e_2: {
        name: 'Octave 2 E form',    // octave string 3
        frets: 'X X 2 X X 0'
    },
    octave_d: {
        name: 'Octave D form',      // octave string 3
        frets: 'X X 0 X 3 X'
    }
};

const CAGED = {
    caged_c: {
        name: 'CAGED C form',
        frets: 'X 3 2 0 1 0',
        fingers: '',
        // root: {string: 0, fret: 0}
    },
    caged_a: {
        name: 'CAGED A form',
        frets: 'X 0 2 2 2 0',
        fingers: '',
        // root: {string: 0, fret: 0}
    },
    caged_g: {
        name: 'CAGED G form',
        frets: '3 2 0 0 0 3',
        fingers: '',
        // root: {string: 0, fret: 0}
    },
    caged_e: {
        name: 'CAGED E form',
        frets: '0 2 2 1 0 0',
        fingers: '',
        // root: {string: 0, fret: 0}
    },
    caged_d: {
        name: 'CAGED D form',
        frets: 'X X 0 2 3 2',
        fingers: '',
        // root: {string: 0, fret: 0}
    }
};

export const SHAPES = Object.assign({}, OCTAVES, CAGED);