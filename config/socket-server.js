import http from 'http';

import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

import { socketController } from '../controllers/socket-controller.js';

export default class SocketServer {
  constructor() {
    //create server with express app
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
    this.port = process.env.PORT;

    this.paths = {};

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();

    //Sockets config
    this.sockets();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //Public directory
    this.app.use(express.static('public'));
  }

  //routes
  routes() {}

  //sockets
  sockets() {
    //socket server listening to client connections
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(process.env.PORT || 3000, () => {
      console.log('Server running on port ', this.port);
    });
  }
}
