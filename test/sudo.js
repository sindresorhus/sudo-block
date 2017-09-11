import fs from 'fs';
import test from 'ava';
import sinon from 'sinon';
import importFresh from 'import-fresh';

test.before(() => {
	process.getuid = () => 0;
	fs.statSync = sinon.stub(fs, 'statSync');
	fs.statSync.withArgs('/.dockerenv').throws('ENOENT, no such file or directory \'/.dockerenv\'');
	sinon.stub(process, 'exit');
	sinon.stub(console, 'error');
});

test.after(() => {
	fs.statSync.restore();
	process.exit.restore();
	console.error.restore();
});

test('should prevent sudo', t => {
	importFresh('..')();
	t.true(process.exit.calledOnce);
	t.true(process.exit.calledWith(77));
	t.true(console.error.calledOnce);
	t.true(console.error.calledWithMatch(/You are not allowed/));
});

test('should accept custom messages', t => {
	importFresh('..')('Thou shalt not sudo!');
	t.true(console.error.calledWithMatch(/Thou shalt not sudo!/));
});
