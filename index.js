import chalk from 'chalk';
import isRoot from 'is-root';
import isDocker from 'is-docker';

export default function sudoBlock(message) {
	const defaultMessage = chalk`
{red.bold You are not allowed to run this app with root permissions.}
If running without {bold sudo} doesn't work, you can either fix your permission problems or change where npm stores global packages by putting {bold ~/npm/bin} in your PATH and running:
{blue npm config set prefix ~/npm}

See: {underline https://github.com/sindresorhus/guides/blob/main/npm-global-without-sudo.md}`;

	if (isRoot() && !isDocker()) {
		console.error(message || defaultMessage);
		process.exit(77); // eslint-disable-line unicorn/no-process-exit
	}
}
