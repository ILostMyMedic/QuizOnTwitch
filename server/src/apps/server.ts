import express, { Application } from 'express';
import cluster from 'cluster';
import os from 'os';
import cors, { CorsOptions } from 'cors';
import logger from '../utils/logger';
import * as dotenv from 'dotenv';
dotenv.config();
import * as localSettings from '../../local.settings.json';
import Routes from '../routes';
import socketServer from './socket';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerjsdoc from 'swagger-jsdoc';

const expressApp = () => {
    const numCPUs = os.cpus().length / 2;
    const corsOptions: CorsOptions = {
        origin: '*',
    };

    // if (cluster.isPrimary) {
    // for (let i = 0; i < numCPUs; i++) {
    //     cluster.fork();
    // }
    // cluster.on('exit', (worker, code, signal) => {
    //     console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    //     cluster.fork();
    // });

    // } else {
    const app: Application = express();
    const server = http.createServer(app);

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'QuizOnTwitch API',
                version: '1.0.0',
                description: 'QuizOnTwitch API',
            },
            servers: [
                {
                    url: 'http://localhost:3005',
                },
            ],
        },
        apis: ['./src/routes/**/*.ts'],
    };

    const swaggerDocs = swaggerjsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    socketServer(server);

    // all routes
    app.use('/api', Routes);

    server.listen(process.env.PORT || 3000, () => {
        logger.info(`Server running on port ${process.env.PORT || 3000}`);
    });

    return app;
    // }
};

export default expressApp;
