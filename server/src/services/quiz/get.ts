import { IQuizResponse, IQuizSearch } from '../../interfaces/quiz';
import QuizSchema from '../../schemas/quiz';
import logger from '../../utils/logger';

export default async function getQuizzes(
    search?: IQuizSearch
): Promise<IQuizResponse[] | undefined> {
    try {
        const query = search || {};

        const quizzes = (await QuizSchema.find(query)) as IQuizResponse[] | undefined;

        if (!quizzes) {
            return undefined;
        }

        return quizzes;
    } catch (error) {
        logger.error(error);
    }
}
