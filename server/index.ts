import database from './src/database';
import { app } from './src/apps';
import logger from './src/utils/logger';
database.connect();

logger.init();
app.express();

// const MQ = app.messageQueue();
// MQ.connect();
