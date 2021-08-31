export class BitStream {
  protected _bytes: Uint8Array;
  protected _bitIndex = 0;
  protected _bitLen: number;

  get bitsLeft() {
    return this._bitLen - this._bitIndex;
  }

  get position() {
    return this._bitIndex;
  }

  constructor(bytes: Uint8Array) {
    this._bytes = bytes;
    this._bitLen = 8 * bytes.byteLength;
  }

  getBits(len: number): number {
    this._checkLen(len);

    if (len > 32) {
      throw new Error(`unsupport get bits length(${len}) > 32`);
    }

    const index = Math.floor(this._bitIndex / 8);
    const bitUsed = this._bitIndex % 8;
    const bitRemain = 8 - bitUsed;
    // 当前字节内剩余的值
    const remainData = this._bytes[index] & ((1 << bitRemain) - 1);
    if (len <= bitRemain) {
      this._bitIndex += len;
      return remainData >>> (bitRemain - len);
    }

    const low = len - bitRemain;
    this._bitIndex += bitRemain;
    return ((remainData << low) | this.getBits(low)) >>> 0;
  }

  skipBits(len: number) {
    this._checkLen(len);

    this._bitIndex += len;
  }

  getBytes(len: number) {
    this._checkLen(len * 8);

    if (this._bitIndex % 8 !== 0) {
      throw new Error(
        `can't get bytes from mid-byte: bit index=${this._bitIndex}`
      );
    }

    const index = Math.floor(this._bitIndex / 8);
    this._bitIndex += len * 8;
    return this._bytes.subarray(index, index + len);
  }

  _checkLen(len: number) {
    if (len > this.bitsLeft) {
      throw new Error(
        `Do not have enough data for read: ${len} > ${this.bitsLeft}`
      );
    }
  }
}
