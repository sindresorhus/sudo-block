import fs from 'fs';
import test from 'ava';
import sinon from 'sinon';
import importFresh from 'import-fresh';

test.before(() => {
	process.getuid = () => 1000;
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

test('should not prevent users', t => {
	importFresh('..')();
	t.false(process.exit.called);
	t.false(console.error.called);
});
