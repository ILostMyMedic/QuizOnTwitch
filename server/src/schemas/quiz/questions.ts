import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: [
            {
                option: {
                    type: String,
                    required: true,
                },
                isCorrect: {
                    type: Boolean,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model('Questions', QuestionSchema);
export default Question;
