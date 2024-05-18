import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const socketServer = (server: any) => {
    const port = process.env.SOCKET_PORT || 3005;
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        socket.on('send_message', (message) => {
            socket.broadcast.emit('receive_message', message);
        });

        // create a room
        socket.on('join_room', (room) => {
            socket.join(room);
        });
    });

    return io;
};

export default socketServer;
