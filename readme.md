# sudo-block

> Block users from running your app with root permissions

<img src="screenshot.png" width="660">

## Install

```
$ npm install sudo-block
```

## Usage

```js
import sudoBlock from 'sudo-block';

sudoBlock();
```

## API

### sudoBlock(message?)

When a file containing this function is run with root permissions it will exit and show an error message telling the user how to fix the problem, so they don't have to run it with `sudo`.

#### message

Type: `string`

Custom message.
