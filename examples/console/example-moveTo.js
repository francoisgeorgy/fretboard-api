import {Shape} from "../src/Shape";

let s = new Shape({frets:"5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5"});
console.log(s);

s.moveToFret(8);
console.log(s);

s.moveToFret(0);
console.log(s);

console.log('--------');

s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s);

s.translateHorizontalBy(-3);
console.log(s);

s.translateHorizontalBy(3);
console.log(s);

console.log('--------');

s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s.frets);
console.log();

s.translateVerticalBy(1);
console.log(s.frets);
console.log();

console.log();

s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s.frets);
console.log();

s.translateVerticalBy(-1);
console.log(s.frets);
console.log();

console.log();

s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s.frets);
console.log();

s.translateVerticalBy(6);
console.log(s.frets);
console.log();

console.log();

s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s.frets);
console.log();

s.translateVerticalBy(-6);
console.log(s.frets);
console.log();

console.log();

s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s);
console.log();

s.translateVerticalBy(2);
console.log(s);
console.log();


console.log();

s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s);
console.log();

s.translateVerticalBy(-2);
console.log(s);
console.log();
