import { Schema } from 'mongoose';

const QuizSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        questions: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        deleted: {
            type: Boolean,
            required: true,
            default: false,
        },
        ratings: {
            type: Number,
            required: false,
            default: 0,
        },
        private: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default QuizSchema;
