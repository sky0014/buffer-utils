"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitStream = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BitStream = /*#__PURE__*/function () {
  function BitStream(bytes) {
    _classCallCheck(this, BitStream);

    _defineProperty(this, "_bytes", void 0);

    _defineProperty(this, "_bitIndex", 0);

    _defineProperty(this, "_bitLen", void 0);

    this._bytes = bytes;
    this._bitLen = 8 * bytes.byteLength;
  }

  _createClass(BitStream, [{
    key: "bitsLeft",
    get: function get() {
      return this._bitLen - this._bitIndex;
    }
  }, {
    key: "position",
    get: function get() {
      return this._bitIndex;
    }
  }, {
    key: "getBits",
    value: function getBits(len) {
      this._checkLen(len);

      if (len > 32) {
        throw new Error("unsupport get bits length(".concat(len, ") > 32"));
      }

      var index = Math.floor(this._bitIndex / 8);
      var bitUsed = this._bitIndex % 8;
      var bitRemain = 8 - bitUsed; // 当前字节内剩余的值

      var remainData = this._bytes[index] & (1 << bitRemain) - 1;

      if (len <= bitRemain) {
        this._bitIndex += len;
        return remainData >>> bitRemain - len;
      }

      var low = len - bitRemain;
      this._bitIndex += bitRemain;
      return (remainData << low | this.getBits(low)) >>> 0;
    }
  }, {
    key: "skipBits",
    value: function skipBits(len) {
      this._checkLen(len);

      this._bitIndex += len;
    }
  }, {
    key: "getBytes",
    value: function getBytes(len) {
      this._checkLen(len * 8);

      if (this._bitIndex % 8 !== 0) {
        throw new Error("can't get bytes from mid-byte: bit index=".concat(this._bitIndex));
      }

      var index = Math.floor(this._bitIndex / 8);
      this._bitIndex += len * 8;
      return this._bytes.subarray(index, index + len);
    }
  }, {
    key: "_checkLen",
    value: function _checkLen(len) {
      if (len > this.bitsLeft) {
        throw new Error("Do not have enough data for read: ".concat(len, " > ").concat(this.bitsLeft));
      }
    }
  }]);

  return BitStream;
}();

exports.BitStream = BitStream;