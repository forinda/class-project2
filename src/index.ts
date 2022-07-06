import app from './app';
import chalk from 'chalk';
import { createServer } from 'http';
import moment from 'moment';
import { port } from './config';
import socketServer from './socket-server';

const server = socketServer({ server: createServer(app) });

server.listen(port, () => {
	const msg = JSON.stringify({
		message: 'Server is running',
		host: app.get('host'),
		time: moment().format('LLLL'),
	});
	console.info(
		chalk.bold.yellow(
			`Server started on ${`http://${app.get('host')}:${port}`}`,
		),
	),
	console.info(
		chalk.bgBlack.bold.white(`Starter at ${moment().format('LLLL')}`),
	);
	console.info(msg);
});
