import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import { getLeaderboard } from '../../services/leaderboard';

const router = Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10);
        const limit = parseInt(req.query.limit as string, 10);
        if (!page || !limit) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: 'Invalid request' });
        }

        const leaderboard = await getLeaderboard(page, limit);

        res.status(HttpStatusCodes.OK).send({ leaderboard });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });
    }
});

export default router;
