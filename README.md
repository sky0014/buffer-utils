# sky-buffer-utils

Some utils that make you handle ArrayBuffer easier.

## Install

```bash
npm install sky-buffer-utils
```

## Usage

```js
import { BufferReader, BufferWriter } from "sky-buffer-utils";

// 假设某一协议：4字节字符串'flag' + 4字节包长度（大端）+ 1字节版本 + payload

function decode(buffer) {
  const reader = new BufferReader(buffer);
  const flag = reader.readString(4); // 'flag'
  const size = reader.readUint32(false); // littleEndian=false
  const ver = reader.readUint8();
  const data = reader.read(size); // ArrayBuffer
  return data;
}

function encode(data) {
  const size = data.byteLength;
  const buffer = new ArrayBuffer(4 + 4 + 1 + size);
  const writer = new BufferWriter(buffer);
  // 支持链式操作
  writer
    .writeString("flag")
    .writeUint32(size, false) // littleEndian=false
    .writeUint8(1) // ver=1
    .write(data);
  return buffer;
}
```
