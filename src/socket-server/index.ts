import { createServer } from 'http';
import sockets from '@blog-api-sockets';

export default ({ server }: { server: ReturnType<typeof createServer> }) => {
	const io = sockets({ server });

	return io;
};
