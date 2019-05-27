import {firstPlayedFret, firstPlayedString, normalizeInputFormat} from "./utils";
import {N} from "./types";

interface Position {
    string: number,
    fret: number
}

/**
 * A shape describe a set of fretted notes on a fretboard.
 *
 * It can includes informations such as:
 * - fingering
 * - intervals names
 * - position of the root note
 * - tuning of the strings
 * - notes names
 *
 * Strings are numbered starting at 0 and from lowest pitched to the highest pitched.
 * For a standard tuning, strings are 0=E, 1=A, 2=D, 3=G, 4=B, 5=E
 *
 * Frets are numbered starting at 0 and from the head of the neck towards the bridge.
 * Fret number 0 is the nut, or the "zero fret" installed close the the nut on some guitars.
 *
 * For frets, the value `null` means a non-played string.
 */
interface Shape {
    /**
     * First dimensions is strings, second dimension is frets.
     */
    frets?: N[][],
    /**
     * First dimensions is strings, second dimension is frets.
     */
    fingers?: N[][],    //fixme: for non played position, leave empty array position instead of null value?
    /**
     * Position of the root note of the shape.
     *
     * User specified or auto-computed.
     *
     * By default, if not specified, this will be the position of the first fretted note of the first played string.
     */
    root?: Position,
    /**
     * Position of the shape.
     *
     * User specified or auto-computed.
     *
     * Position is absolute (relative to the fretboard); position is only the fret number. position is always for the first played string.
     *
     * By default, if not specified, this will be the position of the first fretted note of the first played string.
     */
    position?: Position,
    /**
     * Added when played
     */
    tuning?: string[],
    /**
     * Computed when played
     */
    intervals?: string[][],
    /**
     * Computed when played
     */
    notes?: string[][],
    /**
     * Computed when played
     */
    intervalsSimple?: string[],
    /**
     * Computed when played
     */
    notesSimple?: string[]
}

export function create(s: string): Shape;
export function create(arr: number[]): Shape;
export function create(obj: object): Shape;
export function create(shape: any): Shape {

    let o: Shape = {frets:[[]]};

    if ((typeof shape === 'string') || Array.isArray(shape)) {

        o.frets = normalizeInputFormat(shape);
        // o.frets = [[0], [2], [2], [1], [0], [0]];
        // o.fingers = null;
        o.root = {string: 0, fret: 0};

    } else if (typeof shape === 'object') {

        // Assert.hasProperty('frets', shape);

        // if (shape.frets) {
        //     o.frets = normalizeInputFormat(shape.frets);
        // }

        // o.fingers = normalizeInputFormat(shape.fingers);

        o = {
            // ...o,
            frets: normalizeInputFormat(shape.frets),
            fingers: normalizeInputFormat(shape.fingers),
            position: shape.position,
            root: shape.root
        }

        // ['frets', 'fingers'].map(p => o[p] = normalizeInputFormat(shape[p]));
        // ['position', 'root'].map(p => o[p] = shape[p]);

        // } else {
        //     throw new Error("InvalidArgumentException");    // TODO: return a more helpful message
    }

    // console.log(o.frets);



    if (!o.frets || (o.frets.length === 0)) {     // this allows the creation of empty shapes
        return o;
    }

    if (!o.root) {
        // by default takes the first fretted note on the first played string
        let firstString = firstPlayedString(o.frets);
        o.root = {
            string: firstString,
            fret: firstPlayedFret(o.frets[firstString])
        };
    }

    return o;
}

