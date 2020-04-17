export function bufferConcat(arr: Uint8Array[]) {
    const len = arr.reduce((s, v) => s + v.length, 0);
    const buf = new Uint8Array(len);
    let offset = 0;
    arr.forEach(u8a => {
      buf.set(u8a, offset);
      offset += u8a.length;
    });
    return buf;
  }