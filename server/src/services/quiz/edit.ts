import { IQuiz } from '../../interfaces/quiz';
import QuizSchema from '../../schemas/quiz';
import logger from '../../utils/logger';

export default async function editQuiz(quiz: IQuiz) {
    try {
        const { id, ...data } = quiz;

        const updatedQuiz = await QuizSchema.findByIdAndUpdate(id, data, {
            new: true,
        });

        return updatedQuiz;
    } catch (error) {
        logger.error(error);
    }
}
