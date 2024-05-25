import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import { editQuiz } from '../../services/quiz';
import logger from '../../utils/logger';

const router = Router();

router.put('/', async (req: Request, res: Response) => {
    try {
        const rawData = req.body;
        // const { questions, ...data } = req.body;

        if (!rawData) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Missing required fields.',
            });
        }

        const quiz = await editQuiz(rawData);
        res.status(HttpStatusCodes.OK).send(quiz);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });

        logger.error(error);
    }
});

export default router;
