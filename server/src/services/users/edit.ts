import mongoose from 'mongoose';
import userSchema from '../../schemas/users';
import { IUser } from '../../interfaces/user';
import logger from '../../utils/logger';

const User = mongoose.model('User', userSchema);

export default async function editUser(id: string, data: IUser) {
    try {
        const updatedUser = await User.findOneAndUpdate({ id }, data, { new: true });

        return updatedUser;
    } catch (error) {
        logger.error(error);
    }
}
