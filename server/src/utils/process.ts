import logger from './logger';

process.stdin.resume(); // so the program will not close instantly

async function exitHandler(options: any, exitCode: any) {
    if (options.cleanup) logger.server('📡 Closing down...');
    if (exitCode || exitCode === 0) logger.error(exitCode);
    if (options.exit) process.exit();
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

// check for unhandled rejections and uncaught exceptions
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});

// check for uncaught exceptions
process.on('uncaughtExceptionMonitor', (error, origin) => {
    logger.error(`Uncaught Exception: ${error.message} at ${origin}`);
    process.exit(1);
});

// check for warnings
process.on('warning', (warning) => {
    logger.warn(`Warning: ${warning.name}, ${warning.message}`);
});
