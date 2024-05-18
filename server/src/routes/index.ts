import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../constants/StatusCodes';
import { logs } from '../middleware/log';

// ROUTES ===============================================
import AuthRoutes from './auth';
import DiscoveryRoutes from './discovery';
import LeaderboardRoutes from './leaderboard';
import QuizRoutes from './quiz';
import SearchRoutes from './search';
// ======================================================

const router = Router();

router.use(logs);

router.get('/healthcheck', (req: Request, res: Response) => {
    res.status(HttpStatusCodes.OK).send('OK');
});

router.use('/auth', AuthRoutes);
router.use('/discovery', DiscoveryRoutes);
router.use('/leaderboard', LeaderboardRoutes);
router.use('/quiz', QuizRoutes);
router.use('/search', SearchRoutes);

export default router;
