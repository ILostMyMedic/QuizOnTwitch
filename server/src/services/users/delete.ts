import mongoose from 'mongoose';
import userSchema from '../../schemas/users';
import { IUser } from '../../interfaces/user';
import logger from '../../utils/logger';

const deleteUser = async (id: string) => {
    const User = mongoose.model('User', userSchema);

    try {
        await User.deleteOne({ id });
    } catch (error) {
        logger.error(error);
    }
};

export default deleteUser;
