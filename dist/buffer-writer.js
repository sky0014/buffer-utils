"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferWriter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BufferWriter = /*#__PURE__*/function () {
  function BufferWriter(buf) {
    _classCallCheck(this, BufferWriter);

    _defineProperty(this, "buf", void 0);

    _defineProperty(this, "dv", void 0);

    _defineProperty(this, "u8a", void 0);

    _defineProperty(this, "_offset", 0);

    this.buf = buf;
    this.dv = new DataView(buf);
    this.u8a = new Uint8Array(buf);
  }

  _createClass(BufferWriter, [{
    key: "offset",
    get: function get() {
      return this._offset;
    }
  }, {
    key: "write",
    value: function write(buf) {
      var array = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
      var length = array.length;

      if (length > 0) {
        this.u8a.set(array, this._offset);
        this._offset += length;
      }

      return this;
    }
  }, {
    key: "writeString",
    value: function writeString(str) {
      if (str && str.length > 0) {
        this.write(str.split("").map(function (c) {
          return c.charCodeAt(0);
        }));
      }

      return this;
    }
  }, {
    key: "writeInt8",
    value: function writeInt8(value) {
      this.dv.setInt8(this._offset, value);
      this._offset += 1;
      return this;
    }
  }, {
    key: "writeInt16",
    value: function writeInt16(value, littleEndian) {
      this.dv.setInt16(this._offset, value, littleEndian);
      this._offset += 2;
      return this;
    }
  }, {
    key: "writeInt32",
    value: function writeInt32(value, littleEndian) {
      this.dv.setInt32(this._offset, value, littleEndian);
      this._offset += 4;
      return this;
    }
  }, {
    key: "writeUint8",
    value: function writeUint8(value) {
      this.dv.setUint8(this._offset, value);
      this._offset += 1;
      return this;
    }
  }, {
    key: "writeUint16",
    value: function writeUint16(value, littleEndian) {
      this.dv.setUint16(this._offset, value, littleEndian);
      this._offset += 2;
      return this;
    }
  }, {
    key: "writeUint32",
    value: function writeUint32(value, littleEndian) {
      this.dv.setUint32(this._offset, value, littleEndian);
      this._offset += 4;
      return this;
    }
  }, {
    key: "skip",
    value: function skip(length) {
      this._offset += length;
      return this;
    }
  }]);

  return BufferWriter;
}();

exports.BufferWriter = BufferWriter;