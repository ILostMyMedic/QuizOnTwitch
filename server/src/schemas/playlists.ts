import { Schema } from 'mongoose';

const PlaylistSchema = new Schema(
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
        quizzes: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        deleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default PlaylistSchema;
