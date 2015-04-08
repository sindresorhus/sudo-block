'use strict';
var assert = require('assert');
var fs = require('fs');
var sinon = require('sinon');
var clearRequire = require('clear-require');

describe('sudo mode', function () {
	var sudoBlock;

	beforeEach(function () {
		clearRequire.all();
		sudoBlock = require('./');

		process.getuid = function () {
			return 0;
		};

		fs.statSync = sinon.stub(fs, 'statSync');
		fs.statSync.withArgs('/.dockerinit').throws('ENOENT, no such file or directory \'/.dockerinit\'');

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	afterEach(function () {
		fs.statSync.restore();
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
	var sudoBlock;

	beforeEach(function () {
		clearRequire.all();
		sudoBlock = require('./');

		process.getuid = function () {
			return 1000;
		};

		fs.statSync = sinon.stub(fs, 'statSync');
		fs.statSync.withArgs('/.dockerinit').throws('ENOENT, no such file or directory \'/.dockerinit\'');

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	afterEach(function () {
		fs.statSync.restore();
	});

	it('should not prevent users', function () {
		sudoBlock();
		assert(!process.exit.called);
		assert(!console.error.called);
	});
});

describe('docker mode', function () {
	var sudoBlock;

	beforeEach(function () {
		clearRequire.all();
		sudoBlock = require('./');

		process.getuid = function () {
			return 0;
		};

		fs.statSync = sinon.stub(fs, 'statSync');
		fs.statSync.withArgs('/.dockerinit').returns({});

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	afterEach(function () {
		fs.statSync.restore();
	});

	it('should not prevent users', function () {
		sudoBlock();
		assert(!process.exit.called);
		assert(!console.error.called);
	});
});
