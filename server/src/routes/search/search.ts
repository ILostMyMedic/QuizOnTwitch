import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import { IQuizSearch } from '../../interfaces/quiz';
import logger from '../../utils/logger';
import getQuizzes from '../../services/quiz/get';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const search = req.query as IQuizSearch;

        const query = {
            ...search,
            deleted: false,
            private: false,
        };

        const quizzes = await getQuizzes(query || {});
        res.status(HttpStatusCodes.OK).send(quizzes);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });

        logger.error(error);
    }
});

export default router;
