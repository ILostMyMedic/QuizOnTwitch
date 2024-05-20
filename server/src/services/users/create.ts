import UserSchema from '../../schemas/users';
import { IUser } from '../../interfaces/user';
import logger from '../../utils/logger';

export default async function createUser(data: IUser) {
    try {
        const user = await UserSchema.create(data);
        return user;
    } catch (error) {
        logger.error(error);
    }
}
