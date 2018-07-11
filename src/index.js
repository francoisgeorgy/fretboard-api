

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


class Shape {

    constructor({tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'], id} = {}) {
        this.id = id;
        this.tuning = tuning;
        this.frets = [];
        this.fingers = [];
    }

    getTuning() {
        return this.tuning;
    }

    setTuning(tuning) {
        this.tuning = tuning;
    }

} // Shape


class Fretboard {

    constructor({tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']} = {}) {
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

    addShape() {
        let shape = new Shape({tuning: this.tuning, id: this.uniqueId()});
        this.shapes.push(shape);
        return shape;
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
