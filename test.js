'use strict';
var assert = require('assert');
var fs = require('fs');
var sinon = require('sinon');
var sudoBlock = require('./');

describe('sudo mode', function () {
	beforeEach(function () {
		process.getuid = function () {
			return 0;
		};

		fs.statSync = function () {
			throw new Error("ENOENT, no such file or directory '/.dockerinit'")
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
});

describe('user mode', function () {
	beforeEach(function () {
		process.getuid = function () {
			return 1000;
		};

		fs.statSync = function () {
			throw new Error("ENOENT, no such file or directory '/.dockerinit'")
		};

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	it('should not prevent users', function () {
		sudoBlock();
		assert(!process.exit.called);
		assert(!console.error.called);
	});
});

describe('docker mode', function () {
	beforeEach(function () {
		process.getuid = function () {
			return 0;
		};

		fs.statSync = function () {
			return {};
		};

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	it('should not prevent users', function () {
		sudoBlock();
		assert(!process.exit.called);
		assert(!console.error.called);
	});
});
