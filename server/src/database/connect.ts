import mongoose from 'mongoose';
import logger from '../utils/logger';

import env from '../utils/env';

const MongoDB = {
    connect: () => {
        try {
            const dbTable = !env.isProduction ? 'QuizOnTwitch--DEV' : 'QuizOnTwitch';

            mongoose.connect(`${process.env.MONGO_URL}` || '', {
                dbName: dbTable,
            });
            const db = mongoose.connection;

            db.on('error', (error) => {
                logger.error(`MongoDB connection error:\n ${error}`);
            });
            db.once('open', () => {
                logger.info('MongoDB connected');
            });

            return db;
        } catch (error) {
            const err = JSON.stringify(error, Object.getOwnPropertyNames(error));
            logger.error(`MongoDB connection error:\n ${err}`);
            process.exit(1);
        }
    },
    disconnect: () => {
        try {
            mongoose.disconnect();
            logger.info('MongoDB disconnected');
        } catch (error) {
            const err = JSON.stringify(error, Object.getOwnPropertyNames(error));
            logger.error(`MongoDB disconnection error:\n ${err}`);
            process.exit(1);
        }
    },
};

export default MongoDB;
