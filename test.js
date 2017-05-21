/* eslint-env mocha */
'use strict';
const assert = require('assert');
const fs = require('fs');
const sinon = require('sinon');
const clearModule = require('clear-module');

describe('sudo mode', () => {
	let sudoBlock;

	beforeEach(() => {
		clearModule.all();
		sudoBlock = require('.');

		process.getuid = () => 0;

		fs.statSync = sinon.stub(fs, 'statSync');
		fs.statSync.withArgs('/.dockerinit').throws('ENOENT, no such file or directory \'/.dockerinit\'');

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	afterEach(() => {
		fs.statSync.restore();
	});

	it('should prevent sudo', () => {
		sudoBlock();
		assert(process.exit.calledOnce);
		assert(process.exit.calledWith(77));

		assert(console.error.calledOnce);
		assert(console.error.calledWithMatch(/You are not allowed/));
	});

	it('should accept custom messages', () => {
		sudoBlock('Thou shalt not sudo!');
		assert(console.error.calledWithMatch(/Thou shalt not sudo!/));
	});
});

describe('user mode', () => {
	let sudoBlock;

	beforeEach(() => {
		clearModule.all();
		sudoBlock = require('.');

		process.getuid = () => 1000;

		fs.statSync = sinon.stub(fs, 'statSync');
		fs.statSync.withArgs('/.dockerinit').throws('ENOENT, no such file or directory \'/.dockerinit\'');

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	afterEach(() => {
		fs.statSync.restore();
	});

	it('should not prevent users', () => {
		sudoBlock();
		assert(!process.exit.called);
		assert(!console.error.called);
	});
});

describe('docker mode', () => {
	let sudoBlock;

	beforeEach(() => {
		clearModule.all();
		sudoBlock = require('.');

		process.getuid = () => 0;

		fs.statSync = sinon.stub(fs, 'statSync');
		fs.statSync.withArgs('/.dockerinit').returns({});

		process.exit = sinon.spy();
		console.error = sinon.spy();
	});

	afterEach(() => {
		fs.statSync.restore();
	});

	it('should not prevent users', () => {
		sudoBlock();
		assert(!process.exit.called);
		assert(!console.error.called);
	});
});
