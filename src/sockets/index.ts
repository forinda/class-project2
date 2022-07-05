import { createServer } from 'http';
import moment from 'moment';
import { socketEvents } from '@blog-api-constants/appEvents';
import { socketLogger } from '@blog-api-logger';
import { Server, Socket } from 'socket.io';

type ServerType = ReturnType<typeof createServer>;

export default ({ server }: { server: ServerType }) => {
	const io = new Server(server, {
		cors: {
			methods: ['POST', 'GET'],
			origin: '*',
		},
	});
	io.on(socketEvents.connection, (socket: Socket) => {
		socketLogger.info(
			JSON.stringify({
				id: socket.id,
				message: 'New client connected',
				time: moment().format('LLL'),
			}),
		);
		socket.emit('message', 'Welcome to the chat app');
		socket.on(socketEvents.disconnect, (socket) => {
			socketLogger.info(
				JSON.stringify({
					id: socket.id,
					message: 'Client disconneected',
					time: moment().format('LLL'),
				}),
			);
		});
		socket.on(socketEvents.reconnect, (socket) => {
			socketLogger.info(
				JSON.stringify({
					id: socket.id,
					message: 'Client re-conneected',
					time: moment().format('LLL'),
				}),
			);
		});
	});

	return server;
};
