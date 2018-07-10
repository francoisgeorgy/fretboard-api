

const NOT_FRETTED_NUMBER = -1000;   //Number.MIN_SAFE_INTEGER;

/**
 * @param {string} frets - frets.
 * @return {array} array of fret numbers.
 */
function normalizeFrets(frets) {

    // "X02210" --> [X, 0, 0, 2, 2, 1, 0]
    // "X 0 2 2  1 0" --> [X, 0, 0, 2, 2, 1, 0]

    let fs = frets.toUpperCase();
    let f;
    if (fs.indexOf(" ") >= 0) {
        f = fs
            .replace(/\s+/g, " ")       // replace multiples blanks with one space
            .split(" ")                 // split by strings
    } else {
        f = Array.from(fs);
    }

    return f.map(e => e === "X" ? NOT_FRETTED_NUMBER : parseInt(e, 10));
    // return Array.from(shape.frets.toUpperCase()).map(e => e === "X" ? NOT_FRETTED_NUMBER : parseInt(e, 10));
}
