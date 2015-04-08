'use strict';
var fs = require('fs');
var chalk = require('chalk');
var isRoot = require('is-root');

function inDocker() {
	try {
		fs.statSync('/.dockerinit');
		return true;
	} catch (err) {
		return false;
	}
}

module.exports = function (message) {
	var defaultMessage = chalk.red.bold('You are not allowed to run this app with root permissions.') + '\nIf running without ' + chalk.bold('sudo') + ' doesn\'t work, you can either fix your permission problems or change where npm stores global packages by putting ' + chalk.bold('~/npm/bin') + ' in your PATH and running:\n' + chalk.blue('npm config set prefix ~/npm') + '\n\nSee: ' + chalk.underline('https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md');

	if (isRoot() && !inDocker()) {
		console.error(message || defaultMessage);
		process.exit(77);
	}
};
