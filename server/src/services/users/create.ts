import mongoose from 'mongoose';
import UserSchema from '../../schemas/users';
import { IUser } from '../../interfaces/user';
import logger from '../../utils/logger';

const User = mongoose.model('User', UserSchema);

export default async function createUser(data: IUser) {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        logger.error(error);
    }
}
