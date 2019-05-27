import { Distance, Interval, Note } from "tonal";
import {firstPlayedString, normalizeInputFormat, normalizeFretsPosition} from "./utils";
import Assert from "assert-js";
import {Fretboard} from "./Fretboard";
import stringify from "json-stringify-pretty-compact";

/**
 * Build a shape from a partial or complete definition.
 *
 * If a Shape is created directly, that is, without using a Fretboard method, than the Shape will instantiate its own
 * Fretboard object. Later on, the shape can be added to a Fretboard and its own fretboard object will be replaced by
 * the one she's being attached to.
 *
 * The final shape will have, at least, the following properties:
 *
 * - name: name of this shape                               TODO
 * - type: "scale", "chord", "free"                         TODO  useful?
 * - root.string : define the shape's position on the fretbard (with root.fret)
 * - root.fret : define the shape's position on the fretbard (with root.string)
 * - frets : array of one element per string
 * - intervals : for each played note, the interval from the root. For non played string, an empty array.
 * - chromas : for each played note, the chroma of the note. For non played string, an empty array.
 * - simpleIntervals : intervals with simplified names; simpleIntervals are not sorted
 * - stackedIntervals (from low to high notes)              TODO
 * - reverseStackedIntervals (from high to low notes)       TODO
 * - position : first fret of the first played string
 * - notes
 * - simpleNotes
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

    //TODO: - construct Shape by frets as string : DONE
    //TODO: - construct Shape by frets as array : DONE
    //TODO: - construct Shape by intervals
    //TODO: - construct Shape by notes
    //TODO: - attachToFretboard() (or, simpler: setFretboard() or placeOnFretboard())
    //TODO: simplify 8P,15P,... to 1P ?
    //TODO: set/update "minor" property automatically; do the same for other qualities (for chord)

    /**
     *
     * @param shape
     * @param fretboard
     * @param normalizePosition
     */
    constructor(shape, {fretboard = null, normalizePosition = false} = {}) {

        if ((typeof shape === 'string') || Array.isArray(shape)) {
            this.frets = shape;
        } else if (typeof shape === 'object') {
            Assert.hasProperty('frets', shape);
            Object.assign(this, shape);
        } else {
            throw new Error("InvalidArgumentException");    // TODO: return a more helpful message
        }

        this.onlyPositiveIntervals = true;  //TODO

        // FRETBOARD:

        if (fretboard === null) {
            // we create or own fretboard instance if we don't receive one
            this.fretboard = new Fretboard();   //TODO: tuning parameter
        } else {
            this.fretboard = fretboard;
        }

        // FRETS:

        this.frets = normalizeInputFormat(this.frets);
        if (this.fingers) this.fingers = normalizeInputFormat(this.fingers);

        if (normalizePosition) this.frets = normalizeFretsPosition(this.frets);

        // number of played string not greater than number of strings in tuning?:
        Assert.true(this.frets.length <= this.fretboard.tuning.length);

        // add missing strings if needed:
        while (this.frets.length < this.fretboard.tuning.length) {
            this.frets.push([]);
        }

        this.computePosition();

        // ROOT:

        // TODO: normalize root if given as a string
        if (!this.hasOwnProperty("root")) {
            this.root = {};
            // by default takes the first fretted note on the first played string
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
        return this;
    }

    /**
     * Reset frets.
     */
    reset() {
        // TODO: reset()
        return this;
    }

    /**
     *
     * @param fretboard
     */
    setFretboard(fretboard) {
        this.fretboard = fretboard;
        this.update();
        return this;
    }

    /**
     *
     * @param fret
     * @param string
     * @returns {Shape}
     */
    setRoot(string, fret) {

        //TODO: test me

        this.root.string = string;
        this.root.fret = fret;
        this.update();
        return this;
    }

    /**
     *
     * @param note
     * @param minString
     * @param minFret
     * @returns {Shape}
     */
    setRootNote(note, {minString = -1, minFret = -1} = {}) {
        //TODO
        return this;
    }

    /**
     * The position is given by the first fret on the first played string.
     * @returns {Shape}
     */
    computePosition() {

        //TODO: test me

        let f = firstPlayedString(this.frets);
        this.position = {
            string: f,
            fret: this.frets[f][0]
        };
        return this;
    }

    /**
     * Add intervals, chromas and simpleIntervals properties
     * @returns {Shape}
     */
    computeIntervals() {

        //TODO: use Internal.props() to simplify the code

        this.intervals = [];        // one array per string; empty array for non-played strings
        this.chromas = [];          // one array per string; empty array for non-played strings
        this.simpleIntervals = [];

        for (let string = 0; string < this.frets.length; string++) {  // strings

            let intervals = [];
            let chromas = [];
            // let intervalsSimple = [];

            if (this.frets[string].length === 0) {
                this.intervals.push(intervals);
                this.chromas.push(chromas);
                continue;
            }

            for (let fret of this.frets[string]) {

                // get interval name between this shape's note and the shape's root note:
                let interval_from_root = this.fretboard.interval(this.root.string, this.root.fret, string, fret);

                // transform negative interval to positive intervals: (take the inversion)
                if (this.onlyPositiveIntervals && interval_from_root.startsWith('-')) {
                    let i = Interval.semitones(interval_from_root);
                    while (i < 0) i += 12;
                    interval_from_root = Interval.fromSemitones(i);
                }

                let simple = Interval.simplify(interval_from_root);       // Get the simplified version of an interval:

                if (Interval.ic(simple) === 0) simple = '1P';   //TODO: document this simplification

                // intervals.push((string === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root);
                // intervalsSimple.push((string === this.root.string) && (interval_from_root === "1P") ? "R" : simple);
                intervals.push(interval_from_root);
                chromas.push(Interval.chroma(interval_from_root));

                // get the simplified name of this interval:
                // if ((si === "1P") || (si === "8P")) si = "R";
                if (!this.simpleIntervals.includes(simple)) {
                    this.simpleIntervals.push(simple);          // ! simpleIntervals are not sorted
                }
            }

            this.intervals.push(intervals);
            this.chromas.push(chromas);
        }

        return this;
    }

    /**
     *
     * @returns {Shape}
     */
    computeNotes() {
        let rootNote = Distance.transpose(this.fretboard.tuning[this.root.string], Interval.fromSemitones(this.root.fret));
        this.notes = this.intervals.map(string => string.map(interval => Distance.transpose(rootNote, interval)));
        this.simpleNotes = this.simpleIntervals.map(interval => Note.pc(Distance.transpose(rootNote, interval)));
        return this;
    }

/*
    transpose(semitones) {
        //return Array.from(shape.frets.toUpperCase()).map(f => f === 'X' ? 'X' : parseInt(f, 10) + semitones);
        return this.frets.map(f => f === NOT_FRETTED_NUMBER ? NOT_FRETTED_NUMBER : f + semitones);
    }

    key(root) {
        return this.transpose(fret(this.lowestString(), root, this.fretboard.tuning));
    }
*/

    /**
     * The position is for the first played note of the first played string
     * The "shape" is not changed. The intervals may change depending on the tuning.
     * @param fret
     * @param string
     * @param boolean when moving by string, string 6 is moved to string 1, etc...
     * @returns {Shape}
     */
    moveTo(string, fret, {rollover = true} = {}) {

        Assert.greaterThanOrEqual(0, string);
        Assert.greaterThanOrEqual(0, fret);

        let changed = false;

        if (fret !== this.position.fret) {

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

        if (string !== this.position.string) {

            //TODO: move across strings

            changed = true;
        }

        if (changed) this.update();

        return this;
    }

    /**
     *
     * @param string
     * @returns {Shape}
     */
    moveToString(string) {
        return this.moveTo(string, this.position.fret)
    }

    /**
     *
     * @param fret
     * @returns {Shape}
     */
    moveToFret(fret) {
        return this.moveTo(this.position.string, fret)
    }

    /**
     * Similar to moveTo(frets)
     * @param frets
     */
    translateHorizontalBy(frets) {
        this.moveToFret(this.position.fret + frets);
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
            for (let i = 0; i > strings; i--) {
                let first = this.frets.shift();
                this.frets.push(first);
            }
        } else {
            for (let i = 0; i < strings; i++) {
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
     *
     * The intervals are not changed. The shape may change depending on the tuning.
     *
     * THE RELATIVE INTERVALS ARE CONSERVED.
     *
     * We can not simply transpose the root and then re-compute the frets positions from the intervals
     * because intervals can be sometimes have two possible positions. Therefore, since we want to
     * keep the shape as close to its original form as possible, we will adjust the frets string by
     * string depending on the tuning.
     *
     * @param strings positive for transposing towards high, negative tor transposing towards low.
     */
    transposeByStrings(strings, {autocorrectRoot = true, rollover = false} = {}) {

        //TODO: what to do with the fingering ?

        strings = strings % this.fretboard.tuning.length;   //FIXME: never mutate a function argument

        if ((strings % this.fretboard.tuning.length) === 0) return this;

        if (strings < 0) {
            // -1 --> +4
            strings = strings + this.fretboard.tuning.length - 1;
        }

        for (let t = 0; t < strings; t++) {

            // start from the root note string
            // move the root to its new string
            // for each string:
            //     if new string in unison: copy
            //     else:
            //         for each fretted note:
            //             if root note: skip
            //             get semitones from root to current note in original shape
            //             get semitones from root to current note in new shape
            //             compare and correct if needed

            // first, just translate the shape as is:

            // let new_frets = this.frets.slice(0, -1);     // copy references !
            // new_frets.unshift(this.frets[this.frets.length-1]);

            // we can not use slice because slice copy references if the array contains objects or arrays

/*
// copy references !
            let v;
            let new_frets = [];
            v = this.frets[this.frets.length - 1];
            new_frets.push(v);
            for (let s = 0; s < this.frets.length - 1; s++) {
                v = this.frets[s];
                new_frets.push(v);
            }
*/
            // let new_frets = Object.assign(this.frets);   // copy references !
            // let [...new_frets] = this.frets;    // copy references !
            let new_frets = JSON.parse(JSON.stringify(this.frets));
            let v = new_frets[new_frets.length - 1];
            new_frets.pop();
            new_frets.unshift(v);

            // console.log(`A: ${this.frets} - ${new_frets}`);

            // this.root.string = (this.root.string + 1) % this.fretboard.tuning.length;
            let new_root_string = (this.root.string + 1) % this.fretboard.tuning.length;
            // console.log(this.root.string);

            let root_from = this.fretboard.note(this.root.string, this.root.fret);
            let root_to = this.fretboard.note(new_root_string, this.root.fret);

            // FIXME: if root move to unison string, move it to lowest (pitched) unison string

            // console.log(`root from ${root_from} to ${root_to}`);

            // for each string
            for (let i = 0; i< this.frets.length; i++) {        // for each string...

                let string_from = (this.root.string + i) % this.fretboard.tuning.length;
                let string_to = (string_from + 1) % this.fretboard.tuning.length;

                let tuning_from = this.fretboard.tuning[string_from];
                let tuning_to = this.fretboard.tuning[string_to];

                let tuning_change = Distance.semitones(tuning_from, tuning_to) % 12;

                // console.log(`string ${string_from} --> ${string_to} tuning ${tuning_from} --> ${tuning_to} change=${tuning_change}`);

                if (tuning_change === 0) {
                    // console.log(`   strings in unison, copy ${this.frets[string_from]}`);
                    new_frets[string_to] = new_frets[string_from];
                    continue;
                }

                // for each fretted note on the current string:
                for (let k = 0; k < this.frets[string_from].length; k++) {        // for each fretted note...

                    if ((string_from === this.root.string) && (k = this.root.fret)) {
                        // console.log('   root note, skip');
                        continue;
                    }

                    let note_from = this.fretboard.note(string_from, this.frets[string_from][k]);
                    let note_to = this.fretboard.note(string_to, new_frets[string_to][k]);

                    let semi_from = Distance.semitones(root_from, note_from);
                    let semi_to = Distance.semitones(root_to, note_to);

                    // let note_change = Distance.semitones(note_from, note_to);
                    // console.log(`   note: ${note_from} --> ${note_to} : ${note_change} / semitones: ${semi_from} --> ${semi_to}`);

                    if (semi_to !== semi_from) {
                        new_frets[string_to][k] = (new_frets[string_to][k] + semi_from - semi_to) % 12;
                    }

                }

            }

            // console.log(`${this.frets} --> ${new_frets}`);

            this.frets = new_frets;

            this.root.string = new_root_string;

            this.update();

            if (autocorrectRoot) {
                if (this.root.string > Math.floor(this.fretboard.tuning.length / 2)) {
                    this.autocorrectRoot();
                    this.update();
                }
            }

        }

        return this;
    }

    /**
     * Transpose the shape so that the root is on the specified string
     * @param stringTo
     * @param rollover
     */
    transposeToString(rootString, {rollover = false} = {}) {
        return this.transposeByStrings(rootString - this.root.string, {rollover});
    }

    /**
     * Set the root to the lowest pitched string possible (find the lowest string with a unison interval to the current root)
     */
    autocorrectRoot() {
        let stop = false;
        for (let string = 0; string< this.intervals.length; string++) {        // for each string...
            // for each fretted note on the current string:
            for (let fret = 0; fret < this.intervals[string].length; fret++) {        // for each fretted note...
                // let d = Interval.semitones(this.intervals[string][fret]);
                // console.log(`${string} ${this.frets[string][fret]} : ${this.intervals[string][fret]} : ${d}`);
                if ((Interval.semitones(this.intervals[string][fret]) % 12) === 0) {
                    this.root.string = string;
                    this.root.fret = this.frets[string][fret];
                    stop = true;
                    break;
                }
            }
            if (stop) break;
        }
        return this;
    }

    /**
     *
     * The intervals are not changed. The shape may change depending on the tuning.
     * @param interval
     */
    transposeByFrets(interval) {
        //TODO
        return this;
    }

    /**
     * First, transpose across frets, then across strings if needed.
     * The intervals do not change. The frets are re-positionned.
     * @param string
     * @param fret
     * @returns {Shape}
     */
    transposeTo(string, fret) {
        //TODO
        return this;
    }

    /**
     * Returns the printable representation of this shape data structure
     * @returns {string}
     */
    toString() {
        let {fretboard, tuning, id, onlyPositiveIntervals, ...o} = this;   // do not print some attributes
        return stringify(o);
    }

} // Shape
