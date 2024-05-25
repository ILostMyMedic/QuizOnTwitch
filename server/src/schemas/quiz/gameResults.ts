import mongoose, { Schema } from 'mongoose';

const GameResultSchema = new Schema(
    {
        quiz: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        userResults: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        gameStatus: {
            type: String,
            required: true,
        },
        gameCode: {
            type: String,
            required: true,
        },
        gameMode: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const GameResults = mongoose.model('GameResults', GameResultSchema);

// // create
// GameResults.create({
//     quiz: '664c9dc3c3cfaf9020a409db',
//     userResults: ['664f59625b2ece4e2d396404', '664f596b11e8881821307ff9'],
//     gameStatus: 'completed',
//     gameCode: '123456',
//     gameMode: 'multiplayer',
// });
export default GameResults;
