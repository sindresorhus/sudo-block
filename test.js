/*global describe, it, beforeEach */
'use strict';
var assert = require('assert');
var sinon = require('sinon');
var sudoBlock = require('./sudo-block');

describe('sudo mode', function () {
	beforeEach(function () {
		process.getuid = function () {
			return 0;
		};

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	it('should prevent sudo', function () {
		sudoBlock();
		assert(process.exit.calledOnce);
		assert(process.exit.calledWith(77));

		assert(console.error.calledOnce);
		assert(console.error.calledWithMatch(/You are not allowed/));
	});

	it('should accept custom messages', function () {
		sudoBlock('Thou shalt not sudo!');
		assert(console.error.calledWithMatch(/Thou shalt not sudo!/));
	});

	it('should have isRoot', function () {
		assert(sudoBlock.isRoot);
	});
});

describe('user mode', function () {
	beforeEach(function () {
		process.getuid = function () {
			return 1000;
		};

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	it('should not prevent users', function () {
		sudoBlock();
		assert(!process.exit.called);
		assert(!console.error.called);
	});

	it('should have !isRoot', function () {
		assert(!sudoBlock.isRoot);
	});
});
