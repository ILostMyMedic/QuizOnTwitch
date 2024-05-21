import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../../constants/StatusCodes';
import logger from '../../../utils/logger';
import getQuizzes from '../../../services/quiz/get';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const ownerId = req.query.ownerId as string;

        if (!ownerId) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Missing required fields.',
            });
        }

        const quizzes = await getQuizzes({ ownerId, deleted: false });
        res.status(HttpStatusCodes.OK).send(quizzes);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });

        logger.error(error);
    }
});

export default router;
