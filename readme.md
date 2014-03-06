# sudo-block [![Build Status](https://travis-ci.org/sindresorhus/sudo-block.png?branch=master)](https://travis-ci.org/sindresorhus/sudo-block)

> Block users from running your app with root permissions

![](screenshot.png)


## Install

```bash
$ npm install --save sudo-block
```


## Example

```js
var sudoBlock = require('sudo-block');
sudoBlock();
```


## API

### sudoBlock(message)

When a file containing this function is run with root permissions it will exit and show an error message telling the user how to fix the problem so they don't have to run it with `sudo`

#### message

Type: `String`

Accepts a custom message.


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
