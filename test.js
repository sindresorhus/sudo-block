/*global describe, it */
'use strict';
var assert = require('assert');
var spawn = require('child_process').spawn;
var sudo = require('sudo');
var sudoBlock = require('./sudo-block');

describe('sudo-block', function () {
	it('should prevent sudo', function (done) {
		this.timeout(10000);

		var cp = sudo(['node', 'fixture.js']);

		cp.stderr.on('data', function (data) {
			var isSudoMessage = /You are running/.test(data.toString());
			if (isSudoMessage) {
				assert(isSudoMessage);
				done();
			}
		});

		cp.stdout.on('exit', function () {
			done();
		});
	});
});
