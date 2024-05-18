import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import createQuiz from '../../services/quiz/create';
import { IQuiz } from '../../interfaces/quiz';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const data: IQuiz = req.body;

        if (!data) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Missing required fields.',
            });
        }

        const quiz = await createQuiz(data);
        res.status(HttpStatusCodes.OK).send(quiz);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });
    }
});

export default router;
