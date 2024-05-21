import QuizSchema from '../../schemas/quiz';
import logger from '../../utils/logger';

export default async function deleteQuiz(ids: string[]) {
    try {
        const quiz = await QuizSchema.updateMany({ _id: { $in: ids } }, { deleted: true });
        return quiz;
    } catch (error) {
        logger.error(error);
    }
}
