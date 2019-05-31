import * as Fretboard from "../../src/fretboard";
import {Tuning} from "../../src/TuningType.js";

console.log(Fretboard.computeTuningIntervals(Tuning.guitar.standard));
console.log(Fretboard.computeTuningPitchClasses(Tuning.guitar.standard));

console.log(Fretboard.computeTuningIntervals(Tuning.guitar.standard));
console.log(Fretboard.computeTuningPitchClasses(Tuning.guitar.standard));

console.log(Fretboard.computeTuningIntervals(Tuning.guitar.drop_d));        // !!! '-2M', '5P', '4P', '4P', '3M', '4P'
console.log(Fretboard.computeTuningPitchClasses(Tuning.guitar.drop_d));

console.log(Fretboard.computeTuningIntervals(Tuning.guitar7.drop_a));
console.log(Fretboard.computeTuningPitchClasses(Tuning.guitar7.drop_a));

console.log(Fretboard.computeTuningIntervals(Tuning.bass5.standard));
console.log(Fretboard.computeTuningPitchClasses(Tuning.bass5.standard));
