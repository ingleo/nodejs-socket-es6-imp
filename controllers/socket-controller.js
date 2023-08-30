import { v4 as uuidv4 } from 'uuid';

const socketController = (socket) => {
  console.log('Connected client: ', socket.id);

  //client disconnection
  socket.on('disconnect', () => {
    console.log('Disconnected client: ', socket.id);
  });

  //client message event listener
  socket.on('message-event', (payload, callback) => {
    const messageId = uuidv4();
    callback({ ...payload, messageId });

    socket.broadcast.emit('message-event', payload.message);
    // this.io.emit('message-event', payload);
  });
};

export { socketController };
