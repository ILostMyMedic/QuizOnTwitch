import messageQueue from './mq';
import expressApp from './server';
import socketApp from './socket';

export const app = {
    express: () => expressApp(),
    socket: (server: any) => socketApp(server),
    messageQueue: () => messageQueue(),
};
