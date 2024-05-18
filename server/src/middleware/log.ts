import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const logs = (req: Request, res: Response, next: NextFunction) => {
    // Log the request
    logger.API(`${req.method} ${req.originalUrl}`);

    next();
};
