'use strict';
var colors = require('colors');

function defaultMessage(packageName) {
	return ('You are running ' + packageName.bold + ' with root permissions.').red;
}

module.exports = function (options) {
	var packageName = typeof options === 'string' ? options : options.packageName;
	var message = options.message;

	if (process.getuid && process.getuid() === 0) {
		console.error(message || defaultMessage(packageName));
		process.exit(1);
	}
};
