import Assert from "assert-js";
import {firstPlayedString, normalizeInputFormat} from "./utils";

/**
 *
 * @param shape
 * @returns {{frets, fingers, root, position, intervals, notes, intervalsSimple, notesSimple}}
 */
export const create = (shape) => {

    let o = {
        frets: null,           // user specified
        fingers: null,         // user specified
        root: null,            // user specified or auto-computed; root is absolute (relative to the fretboard)
        position: null,        // user specified or auto-computed; position is absolute (relative to the fretboard); position is only the fret number. position is always for the first played string.
        tuning: null,          // added when played
        intervals: null,       // computed when played
        notes: null,           // computed when played
        intervalsSimple: null, // computed when played
        notesSimple: null      // computed when played
    };

    if ((typeof shape === 'string') || Array.isArray(shape)) {

        o.frets = normalizeInputFormat(shape);

    } else if (typeof shape === 'object') {

        Assert.hasProperty('frets', shape);

        ['frets', 'fingers'].map(p => o[p] = normalizeInputFormat(shape[p]));
        ['position', 'root'].map(p => o[p] = shape[p]);

    } else {
        throw new Error("InvalidArgumentException");    // TODO: return a more helpful message
    }

    if (!o.root) {
        // by default takes the first fretted note on the first played string
        let f = firstPlayedString(o.frets);
        o.root = {
            string: f,
            fret: o.frets[f][0]
        };
    }

    return o;
};


/**
 *
 * @param shape
 * @returns {boolean | string[] | *}
 */
export const isPlayed = (shape) => {
    return shape.hasOwnProperty('tuning') && Array.isArray(shape.tuning) && shape.tuning.length > 0;
};


/**
 *
 * @param shape
 * @returns {*}
 */
export const position = (shape) => {
    return (shape.position === undefined || shape.position === null)
        ? shape.frets[firstPlayedString(shape.frets)][0]
        : shape.position;
};
