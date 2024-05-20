import { IQuestions } from '../../../interfaces/quiz';
import QuestionSchema from '../../../schemas/quiz/questions';
import logger from '../../../utils/logger';

export default async function createQuestions(data: IQuestions[]): Promise<string[] | undefined> {
    try {
        const bulkOps = data.map((question) => ({
            insertOne: {
                document: question,
            },
        }));
        const questions = await QuestionSchema.bulkWrite(bulkOps);

        if (questions && questions.insertedIds) {
            const questionIds = Object.values(questions.insertedIds).map((id) => id.toString());
            return questionIds;
        }

        return undefined;
    } catch (error) {
        logger.error(error);
    }
}
