export class BufferWriter {
  buf: ArrayBuffer;

  private dv: DataView;

  private u8a: Uint8Array;

  private _offset = 0;

  get offset() {
    return this._offset;
  }

  constructor(buf: ArrayBuffer) {
    this.buf = buf;
    this.dv = new DataView(buf);
    this.u8a = new Uint8Array(buf);
  }

  write(buf: ArrayBuffer | ArrayLike<number>) {
    const array = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
    const length = array.length;

    if (length > 0) {
      this.u8a.set(array, this._offset);
      this._offset += length;
    }
    return this;
  }

  writeString(str: string) {
    if (str && str.length > 0) {
      this.write(str.split("").map(c => c.charCodeAt(0)));
    }
    return this;
  }

  writeInt8(value: number) {
    this.dv.setInt8(this._offset, value);
    this._offset += 1;
    return this;
  }

  writeInt16(value: number, littleEndian?: boolean) {
    this.dv.setInt16(this._offset, value, littleEndian);
    this._offset += 2;
    return this;
  }

  writeInt32(value: number, littleEndian?: boolean) {
    this.dv.setInt32(this._offset, value, littleEndian);
    this._offset += 4;
    return this;
  }

  writeUint8(value: number) {
    this.dv.setUint8(this._offset, value);
    this._offset += 1;
    return this;
  }

  writeUint16(value: number, littleEndian?: boolean) {
    this.dv.setUint16(this._offset, value, littleEndian);
    this._offset += 2;
    return this;
  }

  writeUint32(value: number, littleEndian?: boolean) {
    this.dv.setUint32(this._offset, value, littleEndian);
    this._offset += 4;
    return this;
  }

  skip(length: number) {
    this._offset += length;
    return this;
  }
}
