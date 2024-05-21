import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import MyQuizRoutes from './MyQuiz';
import SearchRoutes from './search';
const router = Router();

router.use('/', SearchRoutes);
router.use('/myquiz', MyQuizRoutes);

export default router;
