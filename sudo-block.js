'use strict';
var chalk = require('chalk');

function sudoBlock(message) {
	var defaultMessage = chalk.red.bold('You are not allowed to run this app with root permissions.') + '\nIf running without ' + chalk.bold('sudo') + ' doesn\'t work, you can either fix your permission problems or change where npm stores global packages by putting ' + chalk.bold('~/npm/bin') + ' in your PATH and running:\n' + chalk.blue('npm config set prefix ~/npm');

	if (sudoBlock.isRoot) {
		console.error(message || defaultMessage);
		process.exit(77);
	}
}

Object.defineProperty(sudoBlock, 'isRoot', {
	get: function () {
		return process.getuid && process.getuid() === 0;
	}
});

module.exports = sudoBlock;
