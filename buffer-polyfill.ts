// buffer-polyfill.js

import { Buffer } from 'buffer';

// 如果全局环境中没有 Buffer 对象，则将其赋值为 buffer 的 Buffer 对象
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
  console.log('Buffer polyfill loaded successfully!');
}