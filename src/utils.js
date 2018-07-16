import Tonal from "tonal";
import {NOT_FRETTED_NUMBER} from "./conf";

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
    return frets.reduce(function (acc, v) {
        return (v === NOT_FRETTED_NUMBER || acc < v ? acc : v);
    }, Math.max(...frets));
}

/**
 * Normalize the format and the position of the shape:
 * 1. Transform a string into an array : "022100" --> [0, 2, 2, 1, 0, 0]
 * 2. Translate the shape so that the lowest fret has position 0 : [8, 10, 10, 9, 8, 8] --> [0, 2, 2, 1, 0, 0]
 * @param {?(array|string)} frets - frets.
 * @return {array} array of fret numbers.
 */
export function normalizeFrets(frets) {

    //TODO: add option to disable position normalisation (123 --> 012)

    let n;
    if (Array.isArray(frets)) {
        n = frets;
    } else {

        let fs = frets.toUpperCase().replace(/,/g, '');
        let f;
        if (fs.indexOf(" ") >= 0) {
            f = fs
                .replace(/\s+/g, ' ')       // replace multiples blanks with one space
                .split(" ")                 // split by strings
        } else {
            f = Array.from(fs);
        }

        n = f.map(e => e === "X" ? NOT_FRETTED_NUMBER : parseInt(e, 10));
    }

    let min = minFret(n);

    return n.map(e => e === NOT_FRETTED_NUMBER ? NOT_FRETTED_NUMBER : (e - min));
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


/*
function lowestString(shape) {

    // STRINGS ARE 0-INDEXED

    // let i = shape.frets.findIndex(f => f !== "X");
    let i = shape.frets.findIndex(f => f !== NOT_FRETTED_NUMBER);
    return i;
}
*/

// In music theory, scale degree refers to the position of a particular note on a scale[3] relative to the tonic,
// the first and main note of the scale from which each octave is assumed to begin.
/*
function intervals(shape, tuning) {

    // STRINGS ARE 0-INDEXED

    // console.log(`intervals(${shape}, ${tuning})`);
    // console.log('intervals: ', shape.frets);
    // console.log(shape.name);

    let n_strings = tuning.length;
    console.log(`${n_strings} strings`);

    // init the result
    let shape_intervals = Array(n_strings).fill(null);

    //let frets = fret_numbers(shape);
    let frets = shape.frets;
    console.log(`frets: ${frets}`);

    // where is the root?
    let root_string;
    if (shape.hasOwnProperty("root")) {
        root_string = n_strings - shape.root;   // get 0-index of string
        console.log(`root defined on string index ${root_string}`);
    } else {
        root_string = lowestString(shape);
        console.log(`root found on string index ${root_string}, fret number ${frets[root_string]}`);
    }

    let root_offset = frets[root_string];
    console.log(`root fret offset is ${root_offset}`);

    // let offset = shape.hasOwnProperty("offset") ? shape.hasOwnProperty("offset") : 0;
    // console.log(`frets offset is ${offset}`);

    let r = tuning[root_string];
    console.log(`note of root string is ${r} (string index ${root_string})`);

    // console.log(`go from string index ${0} to string index ${n_strings-1}`);
    for (let i = 0; i < n_strings; i++) {

        if (frets[i] === NOT_FRETTED_NUMBER) {
            // console.log(`string ${i} is not fretted`);
            continue;
        }

        // string tuning
        let string_note = tuning[i];

        let semitones_from_root = Tonal.Distance.semitones(r, string_note);

        let interval_from_root = Tonal.Interval.fromSemitones(semitones_from_root + frets[i] - root_offset);

        let simple_interval = Tonal.Interval.simplify(interval_from_root);

        // shape_intervals[i] = i === root_string ? "R" : simple_interval;   // CORRECT TEST
        // shape_intervals[i] = simple_interval === "1P" ? "R" : simple_interval;     // do not do, will mark octave as R
        shape_intervals[i] = (i === root_string) && (simple_interval === "1P") ? "R" : simple_interval;

        let note = Tonal.Distance.transpose(string_note, Tonal.Interval.fromSemitones(frets[i]));

        console.log(`string index ${i}: tuned to ${string_note}, interval from root string is ${semitones_from_root}, add ${frets[i]} fret: interval is ${simple_interval}; note is ${note}`);
    }

    return shape_intervals;
}
*/