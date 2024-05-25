import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import { IQuizSearch, IQuizDiscover } from '../../interfaces/quiz';
import logger from '../../utils/logger';
import { getQuiz } from '../../services/quiz';
import { getDiscovery } from '../../services/discover';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const search = req.query as IQuizSearch;

        const query = {
            ...search,
            deleted: false,
            private: false,
        };

        const quizzes = await getQuiz(query || {});
        res.status(HttpStatusCodes.OK).send(quizzes);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });

        logger.error(error);
    }
});

router.get('/discover', async (req: Request, res: Response) => {
    try {
        const search = req.query as IQuizDiscover;

        const query = {
            ...search,
            ownerId: '66460b784901e7613d6b5663',
            deleted: false,
            private: false,
        };

        const newestQuizzes =
            (await getDiscovery({
                ...query,
                sort: 'newest',
            })) || [];
        const newestTotal = newestQuizzes?.length || 0;
        const popularQuizzes =
            (await getDiscovery({
                ...query,
                sort: 'popular',
            })) || [];
        const popularTotal = popularQuizzes?.length || 0;
        const lastPlayedQuizzes =
            (await getDiscovery({
                ...query,
                sort: 'lastPlayed',
            })) || [];
        const lastPlayedTotal = lastPlayedQuizzes?.length || 0;

        const response = {
            newest: newestQuizzes,
            popular: popularQuizzes,
            lastPlayed: lastPlayedQuizzes,
            total: newestTotal + popularTotal + lastPlayedTotal,
        };
        res.status(HttpStatusCodes.OK).send(response);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });

        logger.error(error);
    }
});

export default router;
