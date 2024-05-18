import { Schema } from 'mongoose';

const ResultSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        quiz: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
