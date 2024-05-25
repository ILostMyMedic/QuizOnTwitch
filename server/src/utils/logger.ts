import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { version as typescriptVersion } from 'typescript';
import v8 from 'v8';
import os from 'os';

// create a logger class
class logger {
    private static logger = createLogger({
        format: format.combine(
            format.colorize({
                colors: {
                    error: 'bold red',
                    warn: 'bold yellow',
                    info: 'green italic',
                },
            }),
            format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
                ),
            }),
            new transports.DailyRotateFile({
                filename: 'logs/%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: false,
                maxSize: '20m',
                maxFiles: '14d',
            }),
        ],
    });

    public static info(message: string): void {
        this.logger.info(message);
    }

    public static warn(message: string): void {
        this.logger.warn(message);
    }

    public static error(error: any): void {
        if (!error) {
            this.logger.error('No error provided');
        } else {
            this.logger.error(error.message ? error.message : error);
        }
    }

    public static API(message: string): void {
        // new logger with level 'server'
        const APILogger = createLogger({
            // server with blue color
            levels: {
                API: 0,
            },
            level: 'API',
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: [${process.pid}] ${info.message}`
                )
            ),
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize({ colors: { API: 'bold magenta' } }),
                        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
                    ),
                }),
                new transports.DailyRotateFile({
                    filename: 'logs/%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        });

        APILogger.log('API', message);
    }

    public static server(message: string): void {
        const ServerLogger = createLogger({
            // server with blue color
            levels: {
                SERVER: 0,
            },
            level: 'SERVER',
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: [${process.pid}] ${info.message}`
                )
            ),
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize({ colors: { SERVER: 'bold blue' } }),
                        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
                    ),
                }),
                new transports.DailyRotateFile({
                    filename: 'logs/%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        });

        ServerLogger.log('SERVER', message);
    }

    // returns information about the the process
    public static init(): void {
        const heapMax = (v8.getHeapStatistics().total_available_size / 1024 / 1024).toFixed(2);
        const heapUsed = (v8.getHeapStatistics().used_heap_size / 1024 / 1024).toFixed(2);

        // log process information
        this.info('_____________________________________________________');
        // this.info(`Starting ${name} v${version}`);
        this.info(`Node.js ${process.version}`);
        this.info(`TypeScript v${typescriptVersion}`);
        this.info(`Memory usage: ${heapUsed} MB / ${heapMax} MB`);
        this.info(`Platform: ${os.platform()}`);
        this.info(`CPU: ${os.cpus()[0].model}`);
        this.info(`PID: ${process.pid}`);
        this.info('_____________________________________________________\n');
    }
}

// export
export default logger;
