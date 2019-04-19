/**
Block users from running your app with root permissions. When a file containing this function is run with root permissions it will exit and show an error message telling the user how to fix the problem, so they don't have to run it with `sudo`.

@param message - Custom message.

@example
```
import sudoBlock = require('sudo-block');

sudoBlock();
```
*/
declare function sudoBlock(message?: string): void;

export = sudoBlock;
