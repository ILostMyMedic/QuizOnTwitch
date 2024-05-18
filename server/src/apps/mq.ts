import amqplib, { Channel, Connection } from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();
import logger from '../utils/logger';

export const QUEUES = {
    REGISTER_GAME: 'register_game',
};

interface RabbitMQConfig {
    url: string;
}

interface IMessageQueue {
    connect: () => Promise<Channel>;
    createQueue: (channel: Channel, queue: string) => Promise<void>; // Two arguments as expected by the interface
    consumeQueue: (
        channel: Channel,
        queue: string,
        callback: (msg: amqplib.Message) => void
    ) => Promise<void>;
    publishToQueue: (channel: Channel, queue: string, message: string) => Promise<void>;
}

const messageQueue: () => IMessageQueue = () => {
    const config: RabbitMQConfig = {
        url: process.env.MQ_URI || 'amqp://localhost',
    };

    const connect = async (): Promise<Channel> => {
        try {
            const connection: Connection = await amqplib.connect(config.url);
            const channel: Channel = await connection.createChannel();

            logger.info('Message Queue connected');
            return channel;
        } catch (error) {
            logger.error(`Message Queue connection error: ${error}`);
            throw error; // Re-throw the error for better handling
        }
    };

    const createQueue = async (channel: Channel, queue: string): Promise<void> => {
        try {
            await channel.assertQueue(queue, { durable: true }); // Using the provided channel
            logger.info(`Queue created: ${queue}`);
        } catch (error) {
            logger.error(`Queue creation error: ${error}`);
            throw error; // Re-throw the error for better handling
        }
    };

    const consumeQueue = async (
        channel: Channel,
        queue: string,
        callback: (msg: amqplib.Message) => void
    ): Promise<void> => {
        try {
            await channel.consume(queue, (msg) => {
                if (msg) {
                    callback(msg);
                    channel.ack(msg);
                }
            });
            logger.info(`Queue consumed: ${queue}`);
        } catch (error) {
            logger.error(`Queue consumption error: ${error}`);
            throw error; // Re-throw the error for better handling
        }
    };

    const publishToQueue = async (
        channel: Channel,
        queue: string,
        message: string
    ): Promise<void> => {
        try {
            await channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
            logger.info(`Message published to queue: ${queue}`);
        } catch (error) {
            logger.error(`Message publishing error: ${error}`);
            throw error; // Re-throw the error for better handling
        }
    };

    return {
        connect,
        createQueue,
        consumeQueue,
        publishToQueue,
    };
};

export default messageQueue;
