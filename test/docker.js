import fs from 'fs';
import test from 'ava';
import sinon from 'sinon';
import importFresh from 'import-fresh';

test.before(() => {
	process.getuid = () => 0;
	fs.statSync = sinon.stub(fs, 'statSync');
	fs.statSync.withArgs('/.dockerenv').returns({});
	sinon.stub(process, 'exit');
	sinon.stub(console, 'error');
});

test.after(() => {
	fs.statSync.restore();
	process.exit.restore();
	console.error.restore();
});

test('doesn\'t prevent docker users', t => {
	importFresh('..')();
	t.false(process.exit.called);
	t.false(console.error.called);
});
