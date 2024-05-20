import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import createQuestions from '../../services/quiz/questions/create';
import createQuiz from '../../services/quiz/create';
import { IQuizRequest, IQuestions, IQuizResponse, IOptions } from '../../interfaces/quiz';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const data: IQuizRequest = req.body;

        if (!data) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Missing required fields.',
            });
        }

        const questions: IQuestions[] = data.questions;

        // for every question, validate if it has 1-4 options
        for (const question of questions) {
            if (question.options.length < 1 || question.options.length > 4) {
                return res.status(HttpStatusCodes.BAD_REQUEST).send({
                    message: 'Question must have 1-4 options.',
                });
            } else {
                // for every question, validate if it has 1 or more correct option
                const correctOptions = question.options.filter(
                    (option: IOptions) => option.isCorrect
                );
                if (correctOptions.length < 1) {
                    return res.status(HttpStatusCodes.BAD_REQUEST).send({
                        message: 'Question must have 1 or more correct options.',
                    });
                }
            }
        }

        const questionIds = await createQuestions(questions);

        if (!questionIds) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Failed to create questions.',
            });
        }

        const quizObject: IQuizResponse = {
            ...data,
            questions: questionIds,
        };

        const quiz = await createQuiz(quizObject);
        res.status(HttpStatusCodes.OK).send(quiz);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });
    }
});

export default router;
