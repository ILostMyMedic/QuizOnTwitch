import mongoose, { Schema } from 'mongoose';

const UserResultSchema = new Schema(
    {
        user: {
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

const UserResults = mongoose.model('UserResults', UserResultSchema);

// // create
// UserResults.create({
//     user: '66460b784901e7613d6b5663',
//     score: 0,
// });

export default UserResults;
