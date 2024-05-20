import UserSchema from '../../schemas/users';
import { IUser } from '../../interfaces/user';
import logger from '../../utils/logger';

const deleteUser = async (id: string) => {
    try {
        await UserSchema.deleteOne({ id });
    } catch (error) {
        logger.error(error);
    }
};

export default deleteUser;
