import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import { deleteQuiz } from '../../services/quiz';
import logger from '../../utils/logger';

const router = Router();

router.delete('/', async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;

        if (!ids) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Missing required fields.',
            });
        }

        const quiz = await deleteQuiz(ids);

        if (!quiz) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Failed to delete quiz.',
            });
        }

        res.status(HttpStatusCodes.OK).send(quiz);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });

        logger.error(error);
    }
});

export default router;
