import {normalizeInputFormat} from "../../src/utils.js";

// 'X' is a like a fret number
console.log(normalizeInputFormat("0X2"));   // [ [ 0 ], [ 'X' ], [ 2 ] ]
console.log(normalizeInputFormat("0,,2"));  // [ [ 0 ], [], [ 2 ] ]
console.log(normalizeInputFormat("0,-,2")); // [ [ 0 ], [], [ 2 ] ]
console.log(normalizeInputFormat("0-2"));   // [ [ 0 ], [], [ 2 ] ]
console.log(normalizeInputFormat("0,2,,")); // [ [ 0 ], [ 2 ], [], [] ]
console.log(normalizeInputFormat("24,-,134,,X,12"));  // [ [ 2, 4 ], [ 1, 4 ], [ 1, 'X', 4 ], [], [ 'X' ], [ 1, 2 ] ]
console.log(normalizeInputFormat("24,1-4,134,,X,12"));  // Error invalid format
console.log(normalizeInputFormat("24,1,134,X4,X,12"));  // Error invalid format


