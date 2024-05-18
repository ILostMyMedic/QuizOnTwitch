import mongoose from 'mongoose';
import { IQuiz } from '../../interfaces/quiz';
import QuizSchema from '../../schemas/quiz';
import logger from '../../utils/logger';

const Quiz = mongoose.model('Quizzes', QuizSchema);

export default async function createQuiz(data: IQuiz) {
    try {
        const quiz = await Quiz.create(data);
        return quiz;
    } catch (error) {
        logger.error(error);
    }
}
