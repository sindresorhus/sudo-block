'use strict';
var colors = require('colors');

function defaultMessage(packageName) {
	return ('You are running ' + packageName.bold + ' with root permissions.').red;
}

module.exports = function (packageName, message) {
	if (process.getuid && process.getuid() === 0) {
		console.error(message || defaultMessage(packageName));
		process.exit(1);
	}
};
