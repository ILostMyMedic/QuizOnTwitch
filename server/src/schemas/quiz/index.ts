import mongoose, { Schema } from 'mongoose';

const QuizSchema = new Schema(
    {
        ownerId: {
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

const Quiz = mongoose.model('Quizzes', QuizSchema);
export default Quiz;
