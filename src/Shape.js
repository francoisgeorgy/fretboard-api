// import Tonal from "tonal";
import { Distance, interval, Interval, Note } from "tonal";
import {normalizeFrets, firstString} from "./utils.js";
import {DEF_TUNING, NOT_FRETTED_NUMBER} from "./conf";
import {normalizeFretsFormat, normalizeFretsPosition} from "./utils";
import Assert from "assert-js";
import enharmonics from "enharmonics";


/**
 * Build a shape from a partial or complete definition.
 *
 * The final shape will have, at least, the following properties:
 *
 * - frets : array of one element per string
 * - intervals
 * - simpleIntervals
 * - stackedIntervals (from low to high notes)              TODO
 * - reverseStackedIntervals (from high to low notes)       TODO
 * - position : first fret of the first played string
 * - notes
 * - simpleNotes
 * - root.string
 * - root.fret
 * - firstFret : the lowest fret number (>= 0)              TODO
 * - firstString : the lowest fret number (> 0)             TODO
 *
 * It can also have, if specified during the creation:
 *
 * - fingers
 *
 * It will also have the following properties that are used internally but may be useful:
 *
 * - tuning
 * - tuningIntervals (from low string to high string)
 *
 * Moving and tranposing:
 *
 * - moving (moveTo, translate...) do not change the shape. The intervals may change depending on the tuning.
 * - transposing do change the intervals. The shape may change depending on the tuning.
 */
export class Shape {

    //TODO: - construct Shape by frets : DONE
    //TODO: - construct Shape by intervals
    //TODO: - construct Shape by notes

    /**
     *
     * @param shape
     */
    constructor(shape, normalizePosition = false) {

        Assert.hasProperty('frets', shape);

        Object.assign(this, shape);

        // TUNING:

        if (!this.hasOwnProperty('tuning')) {
            this.tuning = DEF_TUNING;
        }

        this.computeTuningIntervals();

        // FRETS:

        this.frets = normalizeFretsFormat(this.frets);

        if (normalizePosition) this.frets = normalizeFretsPosition(this.frets);

        this.computePosition();

        // ROOT:

        // TODO: normalize root if given as a string
        if (!this.hasOwnProperty("root")) {
            this.root = {};
            // by default takes the first fretted note on the first played string
            // this.root['string'] = this.lowestString();
            // this.root['fret'] = this.frets[this.root.string][0];
            this.root['string'] = this.position.string;
            this.root['fret'] = this.position.fret;
        }

        // INTERVALS:

        if (!shape.hasOwnProperty('intervals ')) {      // necessary? or can we just override any provided intervals attribute?
            this.computeIntervals();
        }

        // NOTES:

        if (!shape.hasOwnProperty('notes')) {           // necessary? or can we just override any provided notes attribute?
            this.computeNotes();
        }

    }

    /**
     *
     */
    update() {
        this.computePosition();
        this.computeIntervals();
        this.computeNotes();
    }

    /**
     * Reset frets.
     */
    reset() {
        // TODO
        return this;
    }

    /**
     *
     * @returns {*}
     */
    getTuning() {
        return this.tuning;
    }

    /**
     *
     * @param tuning
     */
    setTuning(tuning) {
        this.tuning = tuning;
    }

    /**
     * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ '1P', '4P', '4P', '4P', '3M', '4P' ]
     */
    computeTuningIntervals() {
        this.tuningIntervals = Array(this.tuning.length).fill(null);
        for(let i = 0; i < this.tuning.length; i++) {
            this.tuningIntervals[i] = interval(this.tuning[i > 0 ? (i-1) : 0], this.tuning[i]);
        }
    }

    /**
     * Returns -1 if no string is fretted
     * @returns {number} Number (1-based) of the lowest-pitched fretted string
     */
/*
    lowestString() {
        let i = this.frets.findIndex(f => f.length > 0);
        return i;
    }
*/
    computePosition() {
        let f = firstString(this.frets);
        this.position = {
            string: f,
            fret: this.frets[f][0]
        }
    }

    /**
     *
     * @returns {Shape}
     */
    computeIntervals() {

        this.intervals = [];
        this.simpleIntervals = [];

        for (let string = 0; string < this.frets.length; string++) {  // strings

            let intervals = [];

            if (this.frets[string].length === 0) {
                this.simpleIntervals.push(intervals);
                continue;
            }

            // get number of semitones from the root string to this string:
            let semitones_from_root = Distance.semitones(this.tuning[this.root.string], this.tuning[string]);     // Get the distance between two notes in semitones:

            // console.log(`string semitones_from_root=${semitones_from_root}`);

            for (let fret = 0; fret < this.frets[string].length; fret++) {  // frets

                // console.log(`string ${i} fret ${f}`);

                // get interval name between this shape's note and the shape's root note:
                let interval_from_root = Interval.fromSemitones(semitones_from_root + this.frets[string][fret] - this.root.fret);   // Get interval name from semitones number:

                // console.log(`string ${i} fret ${f} : interval_from_root=${interval_from_root}`);

                intervals.push((string === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root);

                // this.intervals[i] = (i === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root;

                // get the simplified name of this interval:
                let si = Interval.simplify(interval_from_root);       // Get the simplified version of an interval:
                if ((si === "1P") || (si === "8P")) si = "R";
                if (!this.simpleIntervals.includes(si)) {
                    this.simpleIntervals.push(si);          // ! simpleIntervals are not sorted
                }
            }

            this.intervals.push(intervals);
        }

        return this;
    }

    /**
     *
     * @returns {Shape}
     */
    computeNotes() {

        this.notes = [];
        this.simpleNotes = [];

        let rootNote = Distance.transpose(this.tuning[this.root.string], Interval.fromSemitones(this.root.fret));
        let rootTokens = Note.tokenize(rootNote);
        // let rootAccidental = rootTokens[1];
        let previousAccidental = rootTokens[1];

        for (let string = 0; string < this.frets.length; string++) {  // strings

            let notes = [];

            if (this.frets[string].length === 0) {
                this.notes.push(notes);
                continue;
            }

            for (let fret = 0; fret < this.frets[string].length; fret++) {  // frets

                // get the note name:
                let note = Distance.transpose(this.tuning[string], Interval.fromSemitones(this.frets[string][fret]));

                //
                // We try to have the same kind of accidental across all notes.
                //
                // Example with Shape({frets: "5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5"})
                //
                // without correction: A2 B2 C#3 D3 E3 F#3 Ab3 A3 B3 Db4 D4 E4 F#4 G#4
                // with correction:    A2 B2 C#3 D3 E3 F#3 G#3 A3 B3 C#4 D4 E4 F#4 G#4
                //                                         ^^^       ^^^
                // with the correction, Ab3 is changed to G#3 and Dd4 to C#4.
                //
                // Same with "7 9, 6 7 9, 6 8 9, 6 8 9, 7 9, 6 7"
                //
                // before correction: B2 C#3 Eb3 E3 F#3 Ab3 Bb3 B3 Db4 Eb4 E4 F#4 G#4 Bb4 B4
                // after correction:  B2 C#3 D#3 E3 F#3 G#3 A#3 B3 C#4 D#4 E4 F#4 G#4 Bb4 B4
                //                           ^^^        ^^^ ^^^    ^^^ ^^^

                let t = Note.tokenize(note);
                // if (t[1] !== rootAccidental) {
                if (t[1] !== previousAccidental) {
                    for (let h of enharmonics(note)) {
                        let k = Note.tokenize(h);
                        // if (k[1] === t[1]) {
                        //     note = h;
                        //     break;
                        // }
                        if (k[1] === previousAccidental) {
                            note = h;
                            break;
                        }
                    }
                }

                t = Note.tokenize(note);
                if (t[1] !== '') previousAccidental = t[1];

                notes.push(note);

                // get the note name without the octave:
                let pc = Note.pc(note);
                if (!this.simpleNotes.includes(pc)) {
                    this.simpleNotes.push(pc);          // ! simpleNotes are not sorted
                }

            }

            this.notes.push(notes);
        }

        return this;
    }

    /*
        transpose(semitones) {
            //return Array.from(shape.frets.toUpperCase()).map(f => f === 'X' ? 'X' : parseInt(f, 10) + semitones);
            return this.frets.map(f => f === NOT_FRETTED_NUMBER ? NOT_FRETTED_NUMBER : f + semitones);
        }

        key(root) {
            return this.transpose(fret(this.lowestString(), root, this.tuning));
        }
    */

    /**
     * The position is for the first fretted note of the first played string
     * The "shape" is not changed. The intervals may change depending on the tuning.
     * @param fret
     * @param string
     * @param boolean when moving by string, string 6 is moved to string 1, etc...
     * @returns {Shape}
     */
    moveTo({fret = -1, string = -1, rollover = true} = {}) {

        //FIXME: re-implement with new canonical format

        let changed = false;

        if (fret >= 0) {

            let delta = fret - this.position.fret;

            if (delta !== 0) {
                this.root.fret += delta;
                for (let s = 0; s < this.frets.length; s++) {  // strings
                    for (let f = 0; f < this.frets[s].length; f++) {  // frets
                        this.frets[s][f] += delta;
                    }
                }
                changed = true;
            }
        }


        if (string >= 0) {

            //TODO: move across strings

            changed = true;
        }

        if (changed) this.update();

        return this;
    }

    /**
     * Similar to moveTo(frets)
     * @param frets
     */
    translateHorizontalBy(frets) {
        this.moveTo({fret: this.position.fret + frets});
        return this;
    }

    /**
     * Similar to moveTo(strings)
     * The "shape" is not changed. The intervals may change depending on the tuning.
     * @param strings
     */
    translateVerticalBy(strings) {

        if (strings === 0) return this;

        if (strings < 0) {
            for (let i=0; i>strings; i--) {
                let first = this.frets.shift();
                this.frets.push(first);
            }
        } else {
            for (let i=0; i<strings; i++) {
                let last = this.frets.pop();
                this.frets.unshift(last);
            }
        }

        this.root.string += strings;

        this.update();

        return this;
    }

    /**
     * Transpose across strings.
     * The intervals are not changed. The shape may change depending on the tuning.
     * @param string positive for transposing towards high, negative tor transposing towards low.
     */
    transposeVertical(strings, rollover=false) {

        if (strings === 0) return this;

        if (strings < 0) {
            for (let i=0; i>strings; i--) {
            }
        } else {
            // first, just translate the shape as is:
            for (let i=0; i<strings; i++) {
                let last = this.frets.pop();
                this.frets.unshift(last);
            }

            this.root.string += strings;

            console.log(this.frets);

            // then, adapt the frets to keep the intervals as they are:
            // for (let string = 0; string < this.frets.length; string++) {

            // we do not change the first fretted string
            // therefore we have frets.length-1 strings to adapt

            //
            //  7   8                   8     10               C       D
            //      8     10            8     10  11           G       A   Bb
            //  7      9  10        7      9  10           D       E   F
            //  7      9  10        7   8     10           A   Bb      C
            //  7   8     10       (7)  8     10          (E)  F       G
            //      8     10       (7) (8)   (10)             (C)     (D)
            //

            let correction = 0;

            for (let i = 1; i < this.frets.length; i++) {

                let currentString = (i + strings) % this.tuning.length;

                // let toString = (fromString + strings) % this.tuning.length;

                let precedingString = (currentString + this.tuning.length - 1) % this.tuning.length;

                // let intervalChange = Distance.semitones(this.tuning[fromString], this.tuning[toString]);
                let d = Distance.semitones(this.tuning[precedingString], this.tuning[currentString]);

                //TODO: rollover

                let currentStringBefore = (i - 1 + strings) % this.tuning.length;
                let precedingStringBefore = (currentStringBefore + this.tuning.length - 1) % this.tuning.length;
                let dBefore = Distance.semitones(this.tuning[precedingStringBefore], this.tuning[currentStringBefore]);

                // let correction = Math.abs((d - dBefore) % 12);
                correction += (dBefore - d) % 12;

                console.log(`strings ${precedingString} --> ${currentString} d=${d} dBefore=${dBefore} correction=${correction} frets=${this.frets[currentString]}`);

                this.frets[currentString].forEach((element, index, array) => array[index] = element + correction);



                // console.log((i + strings) % this.tuning.length, intervalChange, this.tuningIntervals);
            }

            this.frets[0] = [];

        }

        // this.root.string += strings;

        this.update();

        return this;
    }

    /**
     * First, transpose across frets, then across strings if needed.
     * The intervals are not changed. The shape may change depending on the tuning.
     * @param interval
     */
    transposeHorizontalBy(interval) {
        //TODO
        return this;
    }

    /**
     * First, transpose across strings, then across frets if needed.
     * The intervals are not changed. The shape may change depending on the tuning.
     * @param interval
     */
    transposeVerticalBy(interval) {
        //TODO
        return this;
    }

    setRoot({fret, string}) {
        //TODO
        return this;
    }

} // Shape

