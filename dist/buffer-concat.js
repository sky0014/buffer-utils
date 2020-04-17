"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferConcat = bufferConcat;

function bufferConcat(arr) {
  var len = arr.reduce(function (s, v) {
    return s + v.length;
  }, 0);
  var buf = new Uint8Array(len);
  var offset = 0;
  arr.forEach(function (u8a) {
    buf.set(u8a, offset);
    offset += u8a.length;
  });
  return buf;
}