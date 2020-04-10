"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferReader = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BufferReader = /*#__PURE__*/function () {
  _createClass(BufferReader, [{
    key: "offset",
    get: function get() {
      return this._offset;
    }
  }]);

  function BufferReader(buf) {
    _classCallCheck(this, BufferReader);

    _defineProperty(this, "buf", void 0);

    _defineProperty(this, "dv", void 0);

    _defineProperty(this, "_offset", 0);

    this.buf = buf;
    this.dv = new DataView(buf);
  }

  _createClass(BufferReader, [{
    key: "read",
    value: function read(length) {
      if (length === undefined) {
        length = this.buf.byteLength - this._offset;
      }

      var v = this.buf.slice(this._offset, this._offset + length);
      this._offset += length;
      return v;
    }
  }, {
    key: "readString",
    value: function readString(length) {
      var v = this.read(length);
      return String.fromCharCode.apply(null, new Uint8Array(v));
    }
  }, {
    key: "readInt8",
    value: function readInt8() {
      var v = this.dv.getInt8(this._offset);
      this._offset += 1;
      return v;
    }
  }, {
    key: "readInt16",
    value: function readInt16(littleEndian) {
      var v = this.dv.getInt16(this._offset, littleEndian);
      this._offset += 2;
      return v;
    }
  }, {
    key: "readInt32",
    value: function readInt32(littleEndian) {
      var v = this.dv.getInt32(this._offset, littleEndian);
      this._offset += 4;
      return v;
    }
  }, {
    key: "readUint8",
    value: function readUint8() {
      var v = this.dv.getUint8(this._offset);
      this._offset += 1;
      return v;
    }
  }, {
    key: "readUint16",
    value: function readUint16(littleEndian) {
      var v = this.dv.getUint16(this._offset, littleEndian);
      this._offset += 2;
      return v;
    }
  }, {
    key: "readUint32",
    value: function readUint32(littleEndian) {
      var v = this.dv.getUint32(this._offset, littleEndian);
      this._offset += 4;
      return v;
    }
  }, {
    key: "skip",
    value: function skip(length) {
      this._offset += length;
    }
  }]);

  return BufferReader;
}();

exports.BufferReader = BufferReader;