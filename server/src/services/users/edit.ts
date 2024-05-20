import UserSchema from '../../schemas/users';
import { IUser } from '../../interfaces/user';
import logger from '../../utils/logger';

export default async function editUser(id: string, data: IUser) {
    try {
        const updatedUser = await UserSchema.findOneAndUpdate({ id }, data, { new: true });

        return updatedUser;
    } catch (error) {
        logger.error(error);
    }
}
