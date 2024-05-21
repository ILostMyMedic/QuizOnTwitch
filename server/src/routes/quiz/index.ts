import { Router } from 'express';
import createQuiz from './create';
import deleteQuiz from './delete';
import editQuiz from './edit';

const router = Router();
router.use('/', createQuiz);
router.use('/', deleteQuiz);
router.use('/', editQuiz);

export default router;
