// import * as Distance from "tonal-distance";
// import * as Scale from "tonal-scale";
// import {fromSemitones, simplify} from "tonal-interval";

var Tonal = require('tonal')

const DEF_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
const NOT_FRETTED_NUMBER = -1000;   //Number.MIN_SAFE_INTEGER;

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
function normalizeFrets(frets) {

    console.log(frets);

    // "X02210" --> [X, 0, 0, 2, 2, 1, 0]
    // "X 0 2 2  1 0" --> [X, 0, 0, 2, 2, 1, 0]

    if (Array.isArray(frets)) return frets;

    let fs = frets.toUpperCase();
    let f;
    if (fs.indexOf(" ") >= 0) {
        f = fs
            .replace(/\s+/g, " ")       // replace multiples blanks with one space
            .split(" ")                 // split by strings
    } else {
        f = Array.from(fs);
    }

    let n = f.map(e => e === "X" ? NOT_FRETTED_NUMBER : parseInt(e, 10));

    // let min = Math.min(...n);
    let min = minFret(n);
    console.log('min fret is', min, n);

    return n.map(e => e === NOT_FRETTED_NUMBER ? NOT_FRETTED_NUMBER : (e - min));
    // return Array.from(shape.frets.toUpperCase()).map(e => e === "X" ? NOT_FRETTED_NUMBER : parseInt(e, 10));
}

/**
 * Returns fret position on string (index) for note
 * @param string
 * @param note
 * @param tuning
 * @returns {*}
 */
function fret(string, note, tuning) {
    // console.log(`fret(${string}, ${note}, ${tuning})`);
    // console.log("tuning[string - 1]", tuning[string - 1]);
    // console.log("note", note);
    return Tonal.Distance.semitones(tuning[string], note);
}


// returns index of lowest fretted string
function lowestString(shape) {

    // STRINGS ARE 0-INDEXED

    // let i = shape.frets.findIndex(f => f !== "X");
    let i = shape.frets.findIndex(f => f !== NOT_FRETTED_NUMBER);
    return i;
}



// In music theory, scale degree refers to the position of a particular note on a scale[3] relative to the tonic,
// the first and main note of the scale from which each octave is assumed to begin.
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
        root_string = n_strings - shape.root;   // get 0-index of string    //TODO
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



class Shape {

    //constructor(shape, {tuning = DEF_TUNING, id} = {}) {
    constructor(shape) {
        Object.assign(this, shape);
        // this.id = id;
        // this.tuning = tuning;
        this.frets = normalizeFrets(this.frets);

        console.log('normalized', this.frets);

        // this.fingers = [];

        //TODO: check that frets attribute is specified

        this.computeTuningIntervals();

        if (!this.hasOwnProperty("root")) {
            this.root = {};
            this.root['string'] = this.lowestString();
            this.root['fret'] = this.frets[this.root.string];
        }

        if (!shape.hasOwnProperty('intervals ')) {
            // console.log('*', this.tuning, this);
            // this.intervals = intervals(this, this.tuning);
            this.computeIntervals();
        }

        if (!shape.hasOwnProperty('notes')) {
            this.computeNotes();
        }

    }


    /**
     * Reset frets.
     */
    reset() {
        // TODO
        return this;
    }

    getTuning() {
        return this.tuning;
    }

    setTuning(tuning) {
        this.tuning = tuning;
    }

    /**
     * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ '1P', '4P', '4P', '4P', '3M', '4P' ]
     */
    computeTuningIntervals() {
        this.tuningIntervals = Array(this.tuning.length).fill(null);
        // let t = this.tuning[0];
        for(let i = 0; i < this.tuning.length; i++) {
            this.tuningIntervals[i] = Tonal.Distance.interval(this.tuning[i > 0 ? (i-1) : 0], this.tuning[i]);
        }
        console.log("this.tuningIntervals", this.tuningIntervals);
    }

    /**
     * Returns -1 if no string is fretted
     * @returns {number} Number (1-based) of the lowest-pitched fretted string
     */
    lowestString() {
        // if (typeof chord_shape.frets === 'string') {
        // let i = Array.from(this.frets.toUpperCase()).findIndex(s => s !== "X");
        // } else {
        //     let i = chord_shape.find(f => f !== "X");
        // }
        let i = this.frets.findIndex(f => f > NOT_FRETTED_NUMBER);
        // return i > -1 ? (i + 1) : 0;
        return i;
    }

    /**
     *
     * @returns {Shape}
     */
    computeIntervals() {

        this.intervals = Array(this.tuning.length).fill(null);       // "string-indexed"
        this.simpleIntervals = [];

        for (let i = 0; i < this.tuning.length; i++) {

            if (this.frets[i] === NOT_FRETTED_NUMBER) {
                continue;
            }

            // get number of semitones from the root string to this string:
            let semitones_from_root = Tonal.Distance.semitones(this.tuning[this.root.string], this.tuning[i]);     // Get the distance between two notes in semitones:

            // get interval name between this shape's note and the shape's root note:
            let interval_from_root = Tonal.Interval.fromSemitones(semitones_from_root + this.frets[i] - this.root.fret);   // Get interval name from semitones number:

            this.intervals[i] = (i === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root;

            // get the simplified name of this interval:
            let si = Tonal.Interval.simplify(interval_from_root);       // Get the simplified version of an interval:
            if ((si === "1P") || (si === "8P")) si = "R";
            if (!this.simpleIntervals.includes(si)) {
                this.simpleIntervals.push(si);
            }

        }

        return this;
    }

    /**
     *
     * @returns {Shape}
     */
    computeNotes() {

        this.notes = Array(this.tuning.length).fill(null);  // "string-indexed"
        this.simpleNotes = [];

        for (let i = 0; i < this.tuning.length; i++) {

            if (this.frets[i] === NOT_FRETTED_NUMBER) {
                continue;
            }

            // get the note name:
            let note = Tonal.Distance.transpose(this.tuning[i], Tonal.Interval.fromSemitones(this.frets[i]));

            this.notes[i] = note;

            // get the note name without the octave:
            let pc = Tonal.Note.pc(note);
            if (!this.simpleNotes.includes(pc)) {
                this.simpleNotes.push(pc);
            }

        }

        return this;
    }

/*
    fret(string, note, tuning) {
        // console.log(`fret(${string}, ${note}, ${tuning})`);
        // console.log("tuning[string - 1]", tuning[string - 1]);
        // console.log("note", note);
        return Distance.semitones(tuning[string], note);
    }
*/

/*
    transpose(semitones) {
        //return Array.from(shape.frets.toUpperCase()).map(f => f === 'X' ? 'X' : parseInt(f, 10) + semitones);
        return this.frets.map(f => f === NOT_FRETTED_NUMBER ? NOT_FRETTED_NUMBER : f + semitones);
    }

    key(root) {
        return this.transpose(fret(this.lowestString(), root, this.tuning));
    }
*/

    moveTo({fret=-1, string=-1} = {}) {
        if (fret >= 0) {
            let i = this.lowestString();
            let delta = fret - this.frets[i];
            this.frets = this.frets.map(f => f === NOT_FRETTED_NUMBER ? NOT_FRETTED_NUMBER : f + delta);
            console.log(this.frets);
        }

        //TODO: move across strings

        return this;
    }

} // Shape


class Fretboard {

    constructor({tuning = DEF_TUNING} = {}) {
        this.tuning = tuning;
        this.shapes = [];
        this.nextID = 0;
    }

    /* private */
    uniqueId() {
        return this.nextID++;
    }

    getTuning() {
        return this.tuning;
    }

    setTuning(tuning) {
        this.tuning = tuning;
        this.shapes.forEach(function(s) {
            //TODO: only change shape's tuning if the shape was created WITH a tuning.
            s.setTuning(tuning);
        });
    }

    addShape(shape) {
        // let v = shape;
        // Object.assign(v, {tuning: this.tuning, id: this.uniqueId()});
        // let s = new Shape(v);
        // let v = shape;
        let s = new Shape(Object.assign(shape, {tuning: this.tuning, id: this.uniqueId()}));
        //let s = new Shape(shape, {tuning: this.tuning, id: this.uniqueId()});
        this.shapes.push(s);
        return s;
    }

    removeShape(idOrShape) {
        let id = typeof idOrShape === 'number' ? idOrShape : idOrShape.id;
        let i = this.shapes.findIndex(e => e.id === id);
        if (i > -1) {
            this.shapes.splice(i, 1);
        }
        return this;
    }

} // Fretboard

// quick tests:

/*
                                console.log('--- create Fretboard');
var f = new Fretboard();        console.log(f);
                                console.log('--- add shapes');
var shape1 = f.addShape();      console.log(shape1);
var shape2 = f.addShape();      console.log(shape2);
                                console.log(f);
// f.removeShape(shape1.id);       console.log(f);
// f.removeShape(shape2);          console.log(f);
                                console.log('--- change tuning');
f.setTuning(['D2', 'A2', 'D3', 'G3', 'B3', 'D4']);
                                console.log(shape1);
                                console.log(shape2);
                                console.log(f);
*/

// var s = new Shape({frets:'123', fingers:'234', tuning:DEF_TUNING});
// console.log(s);
//
// var f = new Fretboard();
// console.log(f);
// var shape1 = f.addShape({frets:'123', fingers:'234'});
// console.log(f);
// var shape1 = new Shape({frets:'123', fingers:'234', tuning:DEF_TUNING});
// console.log(shape1);
// shape1.moveTo({fret:8});
// console.log(shape1);

// console.log('---');
// var shape2 = new Shape({frets:'8 10 10 9 8 8', fingers:'1 4 3 2 1 1', tuning:DEF_TUNING});
// console.log(shape2);

console.log('---');
// var shape3 = new Shape({frets:'X 3 2 0 1 0', tuning:DEF_TUNING});
var shape3 = new Shape({frets:'X 12 11 9 10 9', tuning:DEF_TUNING});
console.log(shape3);
