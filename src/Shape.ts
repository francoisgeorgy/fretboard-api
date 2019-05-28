/**
 * Fret number.
 * null means non-played.
 */
export type Fret = number|null;

/**
 * Finger number.
 * 0 means open-string.
 */
export type Finger = number;

export interface Position {
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
export interface Shape {
    /**
     * First dimensions is strings, second dimension is frets.
     */
    frets: Fret[][],
    /**
     * First dimensions is strings, second dimension is frets.
     */
    fingers?: Finger[][],    //fixme: for non played position, leave empty array position instead of null value?
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

export function create(frets: string): Shape;
export function create(frets: Fret[]): Shape;
export function create(shape: object): Shape;
export function create(shape: any): Shape {

    let s: Shape = {frets:[[]]};

    // if (typeof shape === 'string') {                    // we use two distinct tests to help Typescript.
    //
    //     o.frets = normalizeInputFormat(shape);
    //     // o.frets = [[0], [2], [2], [1], [0], [0]];
    //     // o.fingers = null;
    //     o.root = {string: 0, fret: 0};
    //
    // } else if (Array.isArray(shape)) {
    if ((typeof shape === 'string') || Array.isArray(shape)) {

        s.frets = normalizeInputFormat(shape);

        // console.log(JSON.stringify(s));

        // o.frets = [[0], [2], [2], [1], [0], [0]];
        // o.fingers = null;
        // o.root = {string: 0, fret: 0};

    } else if (typeof shape === 'object') {

        // Assert.hasProperty('frets', shape);

        // if (shape.frets) {
        //     o.frets = normalizeInputFormat(shape.frets);
        // }

        // o.fingers = normalizeInputFormat(shape.fingers);

        s = {
            // ...s,
            frets: normalizeInputFormat(shape.frets),
            fingers: normalizeFingers(shape.fingers),
            position: shape.position,
            root: shape.root
        }

        // ['frets', 'fingers'].map(p => o[p] = normalizeInputFormat(shape[p]));
        // ['position', 'root'].map(p => o[p] = shape[p]);

        // } else {
        //     throw new Error("InvalidArgumentException");    // TODO: return a more helpful message
    }

    // console.log(o.frets);

    if (!s.frets || (s.frets.length === 0)) {     // this allows the creation of empty shapes
        return s;
    }

    if (!s.root) {
        // by default takes the first fretted note on the first played string
        let firstString = firstPlayedString(s);

        // console.log("firstString", firstString);

        s.root = {
            string: firstString,
            // fret: firstPlayedFret(o.frets[firstString])
            fret: firstPlayedFret(s)
        };

        // console.log("root", JSON.stringify(s));

    }

    return s;
}

/**
 *
 * @param shape The Shape
 */
function firstPlayedString(shape: Shape): number {
    return shape.frets.findIndex(string => string.length > 0 && string[0] !== null);
    // return 0;
}

/**
 * Returns first played fret (non null)
 * @param shape The Shape
 */
// export function firstPlayedFret(frets: Fret[]): number {
function firstPlayedFret(shape: Shape): number {

    // console.log("firstPlayedFret", shape, firstPlayedString(shape), shape.frets[0]);

    // return frets.findIndex(f => f.length > 0 && f[0] !== null);
    const f = shape.frets[firstPlayedString(shape)].find(fret => fret !== null);

    if (!f) {
        throw new Error('no played position found');
    } else {
        return f;
    }

    // return f ? f : null;
    // return 0;
}

/**
 * In string definition, use 'X' to denote a non-played string.
 * In number[] definition, use 'null' to denote a non-played string.
 * "022100" --> [[0], [2], [2], [1], [0], [0]]
 * "8 10 10 9 8 8" --> [[8], [10], [10], [9], [8], [8]]
 * [8, 10, 10, 9, 8, 8] --> [[8], [10], [10], [9], [8], [8]]
 * "24,124,134,134,24,12" --> [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]
 * "8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8" --> [[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10], [7, 8]]
 * @param {?(array|string)} frets - frets.
 * @return {array} array of fret numbers.
 */
// export function normalizeInputFormat(frets: string): Fret[][]|undefined;
// export function normalizeInputFormat(frets: number[]): Fret[][]|undefined;
export function normalizeInputFormat(frets: string|Fret[]): Fret[][] {

    if (!frets) {
        //TODO: throw an error instead?
        return [];
    }

    if (Array.isArray(frets)) {
        return frets.map(s => [s]);
    }

    // replace multiples blanks with one space:
    let fs = frets.toUpperCase().replace(/\s+/g, ' ');

    if (fs.indexOf(',') < 0) {
        // only one fretted note per string
        let a = fs.indexOf(' ') >= 0
            ? fs.split(' ')     // "8 10 ..." --> ["8", "10", ...]
            : Array.from(fs);   // "022100" --> ["0", "2", "2", "1", "0", "0"]
        return a.map((s: string) => {
            if (s.toUpperCase() === 'X') return [null];     // value "null" means non-played string
            // if (s === '-') return [];       // nothing played on this string
            return [parseInt(s, 10)]
        });
    } else {
        // more than one fretted note per string
        let a: string[] = fs.replace(/,\s*/g, ',').split(',');    // "8 10, 7 8 10, ..." --> ["8 10", "7 8 10", ...]
        return a.map((s: string) => {
            if (s.toUpperCase() === 'X') return [null];     // value "null" means non-played string
            // if (s === '' || s === '-') return [];           // nothing played on this string
            return (s.indexOf(' ') >= 0
                    ? s.split(' ')              // ["8 10", ...] --> [["8", "10"], ...]
                    : Array.from(s)             // ["24", "124", ...] --> [["2", "4"], ["1", "2", "4"], ...]
            ).map(s => {
                if (s.toUpperCase() === 'X') throw new Error('invalid format');
                // if (s === '-') throw new Error('invalid format');
                return parseInt(s, 10)
            });
        });
    }

}


export function normalizeFingers(fingers: string|Finger[]): Finger[][] {

    // if (typeof frets !== 'string') return frets;

    // if ((frets === undefined) || (frets === null)) {    //FIXME: simplify this test
    if (!fingers) {
        //TODO: throw an error instead?
        return [];
    }

    if (Array.isArray(fingers)) {
        return fingers.map(s => {
            return [s];
        });
    }

    let fs = fingers.toUpperCase().replace(/\s+/g, ' ');  // replace multiples blanks with one space

    if (fs.indexOf(',') < 0) {
        // only one fretted note per string
        let a = fs.indexOf(' ') >= 0
            ? fs.split(' ')     // "8 10 ..." --> ["8", "10", ...]
            : Array.from(fs);   // "022100" --> ["0", "2", "2", "1", "0", "0"]
        return a.map((s: string) => {
            if (s.toUpperCase() === 'X') return [0];     // value 0 means non-played string
            // if (s === '-') return [];                       // nothing played on this string
            return [parseInt(s, 10)]
        });
    } else {
        let a: string[] = fs.replace(/,\s*/g, ',').split(',');    // "8 10, 7 8 10, ..." --> ["8 10", "7 8 10", ...]
        return a.map((s: string) => {
            if (s.toUpperCase() === 'X') return [0];
            // if (s === '' || s === '-') return [];   // nothing played on this string
            return (s.indexOf(' ') >= 0
                    ? s.split(' ')              // ["8 10", ...] --> [["8", "10"], ...]
                    : Array.from(s)             // ["24", "124", ...] --> [["2", "4"], ["1", "2", "4"], ...]
            ).map(s => {
                if (s.toUpperCase() === 'X') throw new Error('invalid format');
                // if (s === '-') throw new Error('invalid format');
                return parseInt(s, 10)
            });
        });
    }

}

