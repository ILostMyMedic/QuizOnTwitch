import { IQuizResponse, IQuizDiscover } from '../../interfaces/quiz';
import QuizSchema from '../../schemas/quiz';
import UserResultSchema from '../../schemas/quiz/userResults';
import GameResultSchema from '../../schemas/quiz/gameResults';
import logger from '../../utils/logger';
import { ObjectId } from 'mongodb';

const transformDocumentToQuizResponse = (doc: any): IQuizResponse => ({
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    private: doc.private,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    ownerId: doc.ownerId.toString(),
    questions: doc.questions.map((q: ObjectId) => q.toString()),
});

export default async function getDiscovery(
    filter?: IQuizDiscover
): Promise<IQuizResponse[] | undefined> {
    try {
        let { query = {}, limit = 8, ownerId, sort } = filter || {};
        let quizzes;

        switch (sort) {
            case 'newest':
                quizzes = await QuizSchema.find(query).sort({ createdAt: -1 }).limit(limit);
                break;
            case 'popular':
                quizzes = await QuizSchema.find(query).sort({ ratings: -1 }).limit(limit);
                break;
            case 'lastPlayed':
                if (ownerId) {
                }

                break;
            default:
                break;
        }

        if (!quizzes) {
            return undefined;
        }

        quizzes = quizzes.map(transformDocumentToQuizResponse);

        return quizzes;
    } catch (error) {
        logger.error(error);
    }
}
