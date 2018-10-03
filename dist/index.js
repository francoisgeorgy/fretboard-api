'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fretboard = exports.Shape = exports.Tuning = undefined;

var _shape = require('./shape');

var Shape = _interopRequireWildcard(_shape);

var _fretboard = require('./fretboard');

var Fretboard = _interopRequireWildcard(_fretboard);

var _Tuning = require('./Tuning.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import * as Compute from './compute';
exports.Tuning = _Tuning.Tuning;
exports.Shape = Shape;
exports.Fretboard = Fretboard; /*
                               import { Fretboard } from './Fretboard.js';
                               import { Shape } from './Shape.js';
                               import { Tuning } from './Tuning.js';
                               import * as Utils from './utils.js';
                               import * as SHAPES from './data/index.js';
                               import * as Humanizer from './humanizer.js';
                               export { Fretboard, Shape, Tuning, Utils, SHAPES, Humanizer };
                               */