'use strict';
var colors = require('colors');

function defaultMessage(packageName) {
	return ('You are running ' + packageName.bold + ' with root permissions.').red;
}

function block(options) {
	var packageName = typeof options === 'string' ? options : options.packageName;
	var message = options.message;
	console.error(message || defaultMessage(packageName));
	process.exit(1);
}

function sudoBlock(options) {
	if (sudoBlock.isRoot) {
		block(options);
	}
}

Object.defineProperty(sudoBlock, 'isRoot', {
	get: function () {
		return process.getuid && process.getuid() === 0;
	}
});

module.exports = sudoBlock;
