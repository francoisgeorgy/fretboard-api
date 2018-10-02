import Tonal from "tonal";

/**
 * Called if a parameter is missing and
 * the default value is evaluated.
 */
export function mandatory() {
    throw new Error('Missing parameter');
}

/**
 *
 * @param frets
 * @returns {*}
 */
function minFret(frets) {
    let m = 10000;              // start with an arbitrary large number
    for (let s of frets) {      // loop over strings
        for (let f of s) {      // loop over frets of the current string
            if (f < m) m = f;
        }
    }
    return m;

    /*
    return frets.reduce(function (acc, v) {
        return (v === NOT_FRETTED_NUMBER || acc < v ? acc : v);
    }, Math.max(...frets));
    */
}


/**
 * Returns -1 if no string is played
 * @returns {number} Number (1-based) of the lowest-pitched fretted string
 */
export function firstPlayedString(frets) {
    return frets.findIndex(f => f.length > 0);
}

/**
 * "022100" --> [[0], [2], [2], [1], [0], [0]]
 * "8 10 10 9 8 8" --> [[8], [10], [10], [9], [8], [8]]
 * [8, 10, 10, 9, 8, 8] --> [[8], [10], [10], [9], [8], [8]]
 * "24,124,134,134,24,12" --> [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]
 * "8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8" --> [[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10], [7, 8]]
 * @param {?(array|string)} frets - frets.
 * @return {array} array of fret numbers.
 */
export function normalizeInputFormat(frets) {

    // if (typeof frets !== 'string') return frets;

    if ((frets === undefined) || (frets === null)) {
        return null;
    }

    if (Array.isArray(frets)) {
        if (Array.isArray(frets[0])) {
            return frets;
        }
        return frets.map(s => {
            if (typeof s === 'string') {
                return s.toUpperCase() === 'X' ? [] : [parseInt(s, 10)];
            } else {
                return [s];
            }
        });
    }

    let fs = frets.toUpperCase().replace(/\s+/g, ' ');  // replace multiples blanks with one space

    if (fs.indexOf(',') < 0) {
        // only one fretted note per string
        let a = fs.indexOf(' ') >= 0
            ? fs.split(' ')     // "8 10 ..." --> ["8", "10", ...]
            : Array.from(fs);   // "022100" --> ["0", "2", "2", "1", "0", "0"]
        return a.map(s => {
            if (s.toUpperCase() === 'X') return [];
            return [parseInt(s, 10)]
        });
        // return a.map(s => s.toUpperCase() === 'X'
        //         ? []
        //         : Array.from(s).map(e => parseInt(e, 10)));
        //         // : s.split(' ').
        //         //     map(e => parseInt(e, 10)));
    } else {
        let a = fs.replace(/,\s*/g, ',').split(',');    // "8 10, 7 8 10, ..." --> ["8 10", "7 8 10", ...]
        return a.map(s => {
            if (s.toUpperCase() === 'X') return [];
            return (s.indexOf(' ') >= 0
                        ? s.split(' ')              // ["8 10", ...] --> [["8", "10"], ...]
                        : Array.from(s)             // ["24", "124", ...] --> [["2", "4"], ["1", "2", "4"], ...]
                    ).map(e => parseInt(e, 10));    // [[2, 4], [1, 2, 4], ...]
        });
    }

}

/**
 * [[8], [10], [10], [9], [8], [8]] --> [[0], [2], [2], [1], [0], [0]]
 * @param {array} array of fret numbers.
 * @return {array} array of fret numbers.
 */
export function normalizeFretsPosition(frets) {
    let min = minFret(frets);
    return frets.map(s => s.length === 0 ? [] : s.map(f => f - min));
}

/**
 * Returns fret position on string (index) for note
 * @param string
 * @param note
 * @param tuning
 * @returns {*}
 */
function fret(string, note, tuning) {
    return Tonal.Distance.semitones(tuning[string], note);
}
