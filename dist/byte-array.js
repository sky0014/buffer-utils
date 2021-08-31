"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * simulate as3 ByteArray, write and read data as your wish, no need care of size.
 *
 * @author sky-wang@qq.com
 */
var ByteArray = /*#__PURE__*/function () {
  function ByteArray() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        buffer = _ref.buffer,
        _ref$initLength = _ref.initLength,
        initLength = _ref$initLength === void 0 ? 1024 : _ref$initLength,
        _ref$autoClear = _ref.autoClear,
        autoClear = _ref$autoClear === void 0 ? false : _ref$autoClear,
        _ref$increase = _ref.increase,
        increase = _ref$increase === void 0 ? 0 : _ref$increase,
        _ref$littleEndian = _ref.littleEndian,
        littleEndian = _ref$littleEndian === void 0 ? ByteArray.littleEndian : _ref$littleEndian;

    _classCallCheck(this, ByteArray);

    _defineProperty(this, "littleEndian", void 0);

    _defineProperty(this, "increase", void 0);

    _defineProperty(this, "_buffer", void 0);

    _defineProperty(this, "_autoClear", void 0);

    _defineProperty(this, "_rposition", 0);

    _defineProperty(this, "_wposition", 0);

    _defineProperty(this, "_count", 0);

    this._autoClear = autoClear;
    this.increase = increase;
    this.littleEndian = littleEndian;

    if (buffer) {
      this._buffer = buffer;
      this._wposition = buffer.byteLength; // this._buffer = new ArrayBuffer(buffer.byteLength);
      // this.write(buffer);
    } else {
      this._buffer = new ArrayBuffer(initLength);
    }
  }

  _createClass(ByteArray, [{
    key: "buffer",
    get: function get() {
      return this._buffer.slice(0, this._wposition);
    }
  }, {
    key: "byteAvailable",
    get: function get() {
      return this._wposition - this._rposition;
    }
  }, {
    key: "byteLength",
    get: function get() {
      return this._wposition;
    }
  }, {
    key: "bytePosition",
    get: function get() {
      return this._rposition;
    }
  }, {
    key: "read",
    value: function read(size) {
      if (size > this.byteAvailable) {
        throw new Error("[".concat(ByteArray.TAG, "] not enough data for read."));
      }

      var buffer = this._buffer.slice(this._rposition, this._rposition + size);

      this._rposition += size;
      return buffer;
    }
  }, {
    key: "readAll",
    value: function readAll() {
      return this.read(this.byteAvailable);
    }
  }, {
    key: "readUint8",
    value: function readUint8() {
      var dv = new DataView(this.read(1));
      return dv.getUint8(0);
    }
  }, {
    key: "readUint16",
    value: function readUint16() {
      var dv = new DataView(this.read(2));
      return dv.getUint16(0, this.littleEndian);
    }
  }, {
    key: "readUint24",
    value: function readUint24() {
      var array = new Uint8Array(this.read(3));
      if (this.littleEndian) array.reverse();
      return array[0] << 16 | array[1] << 8 | array[2];
    }
  }, {
    key: "readUint32",
    value: function readUint32() {
      var dv = new DataView(this.read(4));
      return dv.getUint32(0, this.littleEndian);
    }
  }, {
    key: "readString",
    value: function readString(size) {
      return String.fromCharCode.apply(null, new Uint8Array(this.read(size)));
    }
  }, {
    key: "write",
    value: function write(buffer) {
      if (buffer && buffer.byteLength > 0) {
        var length = buffer.byteLength;
        var need = this._wposition + length;

        if (need > this._buffer.byteLength) {
          var clearBytes = this._autoClear ? this._rposition : 0;
          var size = need - clearBytes;

          var oldbuffer = this._buffer.slice(clearBytes, this._wposition);

          var newbuffer;

          if (size > this._buffer.byteLength) {
            //need increase
            if (this.increase) size += this.increase;else size = (this.buffer.byteLength + length) * 2; //auto increase two times

            this._count++; // logger.log(`increase to ${size} ${this._count}`);

            newbuffer = new ArrayBuffer(size);
          } else {
            //use old one
            newbuffer = this._buffer;
          }

          var _array = new Uint8Array(newbuffer);

          _array.set(new Uint8Array(oldbuffer), 0);

          this._rposition -= clearBytes;
          this._wposition = oldbuffer.byteLength;
          this._buffer = newbuffer; // logger.log(
          //   `clear bytes: ${clearBytes} ${length} ${this._buffer.byteLength} ${this._buffer.byteLength - this.byteAvailable} ${this._count}`
          // );
        }

        var array = new Uint8Array(this._buffer);
        array.set(buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer, this._wposition);
        this._wposition += length;
      }
    }
  }, {
    key: "peekBytes",
    value: function peekBytes() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.byteAvailable;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (offset + size > this.byteAvailable) {
        throw new Error("[".concat(ByteArray.TAG, "] not enough data for read."));
      }

      return new Uint8Array(this._buffer, this._rposition + offset, size);
    }
  }, {
    key: "skip",
    value: function skip(size) {
      this._rposition += size;
    }
  }, {
    key: "back",
    value: function back(size) {
      this._rposition -= size;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._wposition = 0;
      this._rposition = 0;
    }
  }], [{
    key: "fromArray",
    value: function fromArray(array) {
      var size = 0;
      array.forEach(function (buffer) {
        return size += buffer.byteLength;
      });
      var ba = new ByteArray({
        initLength: size
      });
      array.forEach(function (buffer) {
        return ba.write(buffer);
      });
      return ba;
    }
  }]);

  return ByteArray;
}();

exports.default = ByteArray;

_defineProperty(ByteArray, "TAG", "ByteArray");

_defineProperty(ByteArray, "littleEndian", false);