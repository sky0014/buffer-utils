export class BufferReader {
  private buf: ArrayBuffer;

  private dv: DataView;

  private _offset = 0;

  get offset() {
    return this._offset;
  }

  constructor(buf: ArrayBuffer) {
    this.buf = buf;
    this.dv = new DataView(buf);
  }

  read(length?: number) {
    if (length === undefined) {
      length = this.buf.byteLength - this._offset;
    }
    const v = this.buf.slice(this._offset, this._offset + length);
    this._offset += length;
    return v;
  }

  readString(length?: number) {
    const v = this.read(length);
    return String.fromCharCode.apply(null, new Uint8Array(v));
  }

  readInt8() {
    const v = this.dv.getInt8(this._offset);
    this._offset += 1;
    return v;
  }

  readInt16(littleEndian?: boolean) {
    const v = this.dv.getInt16(this._offset, littleEndian);
    this._offset += 2;
    return v;
  }

  readInt32(littleEndian?: boolean) {
    const v = this.dv.getInt32(this._offset, littleEndian);
    this._offset += 4;
    return v;
  }

  readUint8() {
    const v = this.dv.getUint8(this._offset);
    this._offset += 1;
    return v;
  }

  readUint16(littleEndian?: boolean) {
    const v = this.dv.getUint16(this._offset, littleEndian);
    this._offset += 2;
    return v;
  }

  readUint32(littleEndian?: boolean) {
    const v = this.dv.getUint32(this._offset, littleEndian);
    this._offset += 4;
    return v;
  }

  skip(length: number) {
    this._offset += length;
  }
}
