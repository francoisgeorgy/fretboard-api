import {Fretboard} from "../../src/Fretboard";

let f = new Fretboard();

let s = f.addShape("5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5");

console.log(s);

let s2= f.addShape("7 9, 6 7 9, 6 8 9, 6 8 9, 7 9, 6 7");

console.log(s2);

let s3= f.addShape("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8 10");

console.log(s3);


