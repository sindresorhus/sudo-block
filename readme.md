# sudo-block [![Build Status](https://secure.travis-ci.org/sindresorhus/sudo-block.png?branch=master)](http://travis-ci.org/sindresorhus/sudo-block)

Block users from running your tool with root permissions.


## Install

Install with [npm](https://npmjs.org): `npm install --save sudo-block`


## Example

```js
var sudoBlock = require('sudo-block');
sudoBlock('my-module');
```

When the above file is ran with root permissions it will exit and show an error message telling the user how to fix the problem so they don't have to run it with `sudo`.


## License

MIT License • © [Sindre Sorhus](http://sindresorhus.com)
