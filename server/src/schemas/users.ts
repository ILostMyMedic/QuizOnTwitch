import { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
        },
        level: {
            type: Number,
            required: true,
            default: 1,
        },
        experience: {
            type: Number,
            required: true,
            default: 0,
        },
        badges: {
            type: [Schema.Types.ObjectId],
            required: false,
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

export default UserSchema;
