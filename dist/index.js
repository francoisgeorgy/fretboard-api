"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Tuning", {
  enumerable: true,
  get: function get() {
    return _Tuning.Tuning;
  }
});
exports.Fretboard = exports.Shape = exports.Humanizer = exports.SHAPES = void 0;

var SHAPES = _interopRequireWildcard(require("./data/index.js"));

exports.SHAPES = SHAPES;

var Humanizer = _interopRequireWildcard(require("./humanizer.js"));

exports.Humanizer = Humanizer;

var Shape = _interopRequireWildcard(require("./shape"));

exports.Shape = Shape;

var Fretboard = _interopRequireWildcard(require("./fretboard"));

exports.Fretboard = Fretboard;

var _Tuning = require("./Tuning.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }