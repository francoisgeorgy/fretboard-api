import {Shape} from "./Shape";
import {Distance, Interval, Note, Scale} from "tonal";
import {Tuning} from "./Tuning";
import stringify from "json-stringify-pretty-compact";
import Assert from "assert-js";

/**
 *
 */
export class Fretboard {

    /**
     *
     * @param tuning
     * @param frets
     */
    constructor({tuning = Tuning.guitar.standard, frets = 24} = {}) {

        //TODO: allow to specify tuning and number of strings (subset of tuning)

        this.tuning = tuning;
        // this.tuningPitchClasses = tuning;
        this.numberOfStrings = this.tuning.length;
        this.minFret = 0;
        this.maxFret = frets;
        this.shapes = [];
        this.nextID = 0;
        this.computeTuningIntervals();
        this.computeTuningPitchClasses();
    }

    /**
     * TODO: make private
     * @returns {number}
     */
    uniqueId() {
        return this.nextID++;
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
/*
        this.shapes.forEach(function(s) {
            //TODO: only change shape's tuning if the shape was created WITH a tuning.
            s.setTuning(tuning);
        });
*/
    }

    /**
     * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ '1P', '4P', '4P', '4P', '3M', '4P' ]
     */
    computeTuningIntervals() {
        this.tuningIntervals = Array(this.tuning.length).fill(null);
        for (let i = 0; i < this.tuning.length; i++) {
            let simple = Interval.simplify(
                Distance.interval(
                    this.tuning[(i -1 + this.tuning.length) % this.tuning.length],
                    this.tuning[i]
                )
            );
            this.tuningIntervals[i] = simple === '-1P' ? '1P' : simple;
        }
    }

    /**
     * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ 'E', 'A', 'D', 'G', 'B', 'E' ]
     */
    computeTuningPitchClasses() {
        this.tuningPitchClasses = this.tuning.map(Note.pc);
    }

    /**
     *
     * @param shape
     * @param frets
     * @param string
     * @returns {Shape}
     */
    addShape(frets, {string, fret} = {}) {
        let shape = new Shape(frets, {fretboard: this});
        shape.id = this.uniqueId();
        let s = shape.position.string;
        if ((string !== undefined) && string >= 0) {
            shape.moveToString(s);
        }
        let f = shape.position.string;
        if ((fret !== undefined) && fret >= 0) {
            shape.moveToFret(f);
        }
        this.shapes.push(shape);
        return shape;
    }

    /**
     * Alias to addShape()
     * @param pattern
     * @param fret
     * @param string
     * @returns {Shape}
     */
    addPattern(pattern, {string, fret} = {}) {
        return this.addShape(pattern, {string, fret})
    }

    /**
     *
     * @param chordShape
     * @param fret
     * @param string
     * @returns {Shape}
     */
    addChord(chordShape, {string, fret} = {}) {

        //TODO: verify that we have at most one note per string

        return this.addShape(chordShape, {string, fret})
    }

    /**
     *
     * @param scaleShape
     * @param fret
     * @param string
     * @returns {Shape}
     */
    addScale(scaleShape, {string, fret} = {}) {

        //TODO: allow more than one note per string

        return this.addShape(scaleShape, {string, fret})
    }

    /**
     *
     * @param idOrShape
     * @returns {Fretboard}
     */
    removeShape(idOrShape) {
        let id = typeof idOrShape === 'number' ? idOrShape : idOrShape.id;
        let i = this.shapes.findIndex(e => e.id === id);
        if (i > -1) {
            this.shapes.splice(i, 1);
        }
        return this;
    }

    replaceAllShapes(replacement = null) {
        this.shapes = [];
        this.nextID = 0;
        if (replacement) this.addShape(replacement);
    }

    /**
     *
     * @param string 0-indexed string number
     * @param fret
     * @returns {*}
     */
    note(string, fret) {
        return Distance.transpose(this.tuning[string], Interval.fromSemitones(fret));
    }

    /**
     *
     * @param fromString
     * @param fromFret
     * @param toString
     * @param toFret
     * @returns {number}
     */
    semitones(fromString, fromFret, toString, toFret) {
        return Distance.semitones(this.tuning[fromString], this.tuning[toString]) + toFret - fromFret;
    }

    /**
     *
     * @param fromString
     * @param fromFret
     * @param toString
     * @param toFret
     * @returns {*}
     */
    interval(fromString, fromFret, toString, toFret) {
        return Interval.fromSemitones(this.semitones(fromString, fromFret, toString, toFret));
    }

    /**
     *
     * @param note
     * @param fromString
     * @param fromFret
     * @param toString
     * @param toFret
     * @returns {{string: number, fret: number}}
     */
    /*
    findPosition(note, {fromString=0, fromFret=0, toString=this.numberOfStrings, toFret=this.maxFret} = {}) {
        //TODO: implement findPosition() with search including octave or not
        let string = 0;
        let fret = 0;

        return {string, fret}
    }
    */

    /**
     * Find a position
     *
     * Syntaxe 1: fret(note, string)
     * Syntaxe 2: fret(fromString, fromFret, toString, toFret, minFret, maxFret)
     * @returns {*}
     */
    fret() {

        //TODO: re-implement or discard

        if (arguments.length === 2) {
            let note = arguments[0];
            let string = arguments[1];
            return Distance.semitones(this.tuning[string], note);
        }

        if (arguments.length > 2) {
            let fromString = arguments[0];
            let fromFret = arguments[1];
            let toString = arguments[2];
            let minFret = arguments.length > 3 ? arguments[3] : this.minFret;
            let maxFret = arguments.length > 4 ? arguments[4] : this.maxFret;

            let f = this.fret(this.note(fromString, fromFret), toString);

            //TODO: try to simplify the following corrections

            while (f < minFret) f += 12;

            while (
                (f >= minFret) &&
                (
                    ((Math.abs(f - fromFret) > 0) && (f >= (minFret + 12))) ||
                    (f > maxFret))
                ) f -= 12;

            if ((f < (fromFret - 6)) && (maxFret >= (f+12))) f += 12;

            while (
                (
                    (fromFret - f) > 12) ||
                    (f < minFret)
                ) f += 12;

            return f;
        }

        throw new Error("InvalidArgumentException");    // TODO: return a more helpful message
    }

    /**
     *
     * @param fromString
     * @param fromFret
     * @param toString
     * @returns {*}
     */
    fretLow(fromString, fromFret, toString) {
        return this.fret(fromString, fromFret, toString, 0, fromFret);
    }

    /**
     *
     * @param fromString
     * @param fromFret
     * @param toString
     * @returns {*}
     */
    fretHigh(fromString, fromFret, toString) {
        return this.fret(fromString, fromFret, toString, fromFret, 0);
    }

    /**
     *
     * @param note : string, can be pitch (with octave) or pitch-class (without octave)
     * @param fromString : number
     * @param toString : number, value -1 means no limit (use all strings)
     * @param minFret : number
     * @param maxFret : number, value -1 means no limit (up to fretboard.maxFret)
     * @returns {*}
     */
    find(note, {fromString = 0, toString = this.numberOfStrings - 1, minFret = 0, maxFret = this.maxFret} = {}) {

        Assert.true(fromString >= 0);

        if (fromString >= this.numberOfStrings) return null;

        // Assert.true(fromFret >= 0);
        Assert.true(minFret >= 0);
        Assert.true(minFret <= maxFret);
        // Assert.true(fromFret <= maxFret);

        const withOctave = Note.oct(note) !== null;
        const t = withOctave ? this.tuning : this.tuningPitchClasses;

        let string = fromString;
        let fret = -1;
        while (true) {

            let d = Distance.semitones(t[string], note);

            if (d < 0) {    // should only occurs when using octaves
                break;
            }

            // if (!withOctave && (string === fromString) && (d < fromFret)) {
            //     while (d < fromFret) d += 12;    // add one octave
            // }
            if (!withOctave && (string === fromString) && (d < minFret)) {
                while (d < minFret) d += 12;    // add one octave
            }

            if (d > maxFret) {
                string++;
                if (string > toString) break;
                continue;
            }

            // if (string === fromString) {
            //     if (d >= fromFret) {
            //         fret = d;
            //         break;
            //     }
            // } else {
                if (d >= minFret) {
                    fret = d;
                    break;
                } else {
                    string++;
                    if (string > toString) break;
                    continue;
                }
            // }

            break;

        }
        return fret < 0 ? null : {string, fret, note: this.note(string, fret)};
    }

    /**
     *
     * @param string
     * @param fret
     * @param fromString
     * @param toString
     * @param minFret
     * @param maxFret
     * @returns {*}
     */
    findNext({string, fret}, {toString = this.tuning.length, minFret = 0, maxFret = this.maxFret} = {}) {
        const note = this.note(string, fret);
        let s = string;
        let f = fret+1;
        if (f > maxFret) {
            // start at next string
            f = 0;
            s = s + 1;
        }
        if (s >= toString) return null;
        return this.find(Note.pc(note), {fromString: s, fromFret: f });
    }

    /**
     *
     * @param string
     * @param fret
     * @param toString
     * @param minFret
     * @param maxFret
     * @returns {null}
     */
    findPrev({string, fret}, {toString = 0, minFret = 0, maxFret = this.maxFret} = {}) {
        // TODO: implement findPrev()
        return null;
    }

    /**
     *
     * @param nameOrTonic
     * @param name
     * @param string min string to start from
     * @param fret min fret to start from
     * @param minNotesPerString
     * @param maxNotesPerString
     * @param maxFretDistance
     * @returns {null}
     */
    // getScaleShape(name, {string = 0, fret = 0, minNotesPerString = 1, maxNotesPerString = -1, maxFretDistance = -1} = {}) {
    //
    //     let notes = Scale.intervals(name);
    //
    //     return null;
    // }
    /**
     * If the tonic is specified, than fret is ignored.
     * If the tonic is specified with an octave, then string is the minimum string.
     * The method tries to find the first fret for the tonic on the string specified.
     *
     * Use sensible defaults.
     *
     * If both maxFretsBefore and maxFretsAfter are specified, then maxFretsWidth is ignored
     *
     * @param name Name of the scale "major", "minor", ...
     * @param tonic Tonic "C", "C4", ...
     * @param string
     * @param fret
     * @param minNotesPerString
     * @param maxNotesPerString
     * @param maxFretsBefore relative to the tonic's fret, ignored if null
     * @param maxFretsAfter relative to the tonic's fret, ignored if null
     * @param maxFretsWidth
     * @param octaves
     * @returns {null}
     */

    //buildScale(name, {tonic = null, form = null, string = 0, fret = 0, minNotesPerString = 1, maxNotesPerString = 3, maxFretDistance = 5, octaves = 1} = {}) {
    buildScale(name, tonic, {
        string = 0,
        minNotesPerString = 1,
        maxNotesPerString = 3,
        maxFretsBefore = -1,
        maxFretsAfter = 4,
        // maxFretsWidth = 5,
        octaves = 1} = {}) {

        Assert.number(maxFretsBefore);
        Assert.number(maxFretsAfter);
        // Assert.number(maxFretsWidth);

        // If a tonic with octave is specified, find the first position of this note, taking "string" and "fret" as minimal position.

        // let f = fret;
        let fret;       // tonic's fret
        let s = string;

        // if (tonic) {
            // note = tonic;
            let p = Note.props(tonic);
            if (p.oct === null) {
                // tonic without octave
                // search first position of this note on the string specified:
                fret = this.fret(tonic, string);
            } else {
                // tonic with octave
                fret = this.fret(tonic, string);
            }
        // } else {
        //     // use string and fret parameters
        //     // note = this.note(string, fret);
        // }

        // let note = this.note(s, fret);     // note will now includes the octave if that was not the case before

        // console.log(tonic, note, s, fret);

        let maxWidth = (Number.isInteger(maxFretsBefore) && Number.isInteger(maxFretsAfter)) ? maxFretsAfter - maxFretsBefore : maxFretsWidth;


        let intervals = Scale.intervals(name);

        let runningTonic = this.note(s, fret);  // will now includes the octave if that was not the case before
        let k = 0;
        // let c = 0;  // security
        let o = octaves;  // octave counter
        while (o > 0) {
            let nn = Distance.transpose(runningTonic, intervals[k % intervals.length]);

            // find position for nn
            let ff = this.find(nn, {fromString: string, minFret: fret, maxFret: fret + maxFretDistance});

            if (!ff.note) break;

            console.log(k, nn, ff);

            k = (k + 1) % intervals.length;
            if (k === 0) {
                o--;
                runningTonic = Distance.transpose(runningTonic, "8P");  // next octave
            }
        }

        return null;
    }


    /**
     * Returns the string representation of this fretboard data structure
     * @returns {string}
     */
    toString() {
        return stringify(this);
    }

} // Fretboard
