import dotenv from 'dotenv';
import SocketServer from './config/socket-server.js';

dotenv.config();

const server = new SocketServer();

server.listen();
