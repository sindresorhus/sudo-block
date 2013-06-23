/*global describe, it */
'use strict';
var assert = require('assert');
var sinon = require('sinon');
var sudoBlock = require('./sudo-block');

describe('sudo-block', function () {
	it('should prevent sudo', function () {
		process.getuid = function () {
			return 0;
		};

		process.exit = sinon.spy();
		console.error = sinon.spy();

		sudoBlock('test');
		assert(process.exit.calledOnce);
		assert(process.exit.calledWith(1));

		assert(console.error.calledOnce);
		assert(console.error.calledWithMatch(/You are running/));
	});

	it('should not prevent users', function () {
		process.getuid = function () {
			return 1000;
		};

		process.exit = sinon.spy();
		console.error = sinon.spy();

		sudoBlock('test');
		assert(!process.exit.called);
		assert(!console.error.called);
	});
});
