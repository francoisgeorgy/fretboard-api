import {Fretboard} from "../../src";


let f = new Fretboard();

let s1 = f.buildScale("major", "A", {octaves: 2});

// let s2 = f.buildScale("major", {string: 1, fret: 3});

let s2 = f.buildScale("minor", "E3", {octaves: 2});
