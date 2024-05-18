import mongoose from 'mongoose';
import userSchema from '../../schemas/users';
import logger from '../../utils/logger';

const users = mongoose.model('users', userSchema);

const getLeaderboard = async (page: number, limit: number) => {
    try {
        const leaderboard = await users
            .find()
            .sort({ score: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('username avatar experience');
        return leaderboard;
    } catch (error) {
        logger.error(`Error in getLeaderboard: ${error}`);
        throw error;
    }
};

export default getLeaderboard;
