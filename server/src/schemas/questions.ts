import { Schema } from 'mongoose';

const QuestionSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        answers: {
            type: [String],
            required: true,
        },
        correct: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default QuestionSchema;
