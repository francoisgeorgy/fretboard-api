import { CAGED, OCTAVES } from '../src/data';
import {Shape} from "../src/Shape";
import {normalizeFretsFormat} from "../src/utils";

// console.log(CAGED);
// console.log(OCTAVES);

let testShapes = [
    "022100",
    "8 10 10 9 8 8",
    "5X565X",
    "5 X 5 6 5 X",
    "24,124,134,134,24,12",
    "3 5, 2 3 5, 2 4 5, 2 4 5, 3 5, 2 3",
    "5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5",
    "6 8, 5 6 8, 5 7 8, 5 7 8, 6 8, 5 6",
    "7 9, 6 7 9, 6 8 9, 6 8 9, 7 9, 6 7",
    "8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"
];

for (let s of testShapes) {
    console.log(`--- ${s} ---`);
    console.log(new Shape({frets:s}));
    console.log();
}

