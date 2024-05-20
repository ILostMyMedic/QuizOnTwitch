import { IQuiz } from '../../interfaces/quiz';
import QuizSchema from '../../schemas/quiz';
import logger from '../../utils/logger';

export default async function createQuiz(data: IQuiz) {
    try {
        const quiz = await QuizSchema.create(data);
        return quiz;
    } catch (error) {
        logger.error(error);
    }
}
