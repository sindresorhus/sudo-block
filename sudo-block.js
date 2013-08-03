'use strict';
var chalk = require('chalk');

function defaultMessage(packageName) {
	return chalk.red('You are running ' + chalk.bold(packageName) + ' with root permissions.');
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
