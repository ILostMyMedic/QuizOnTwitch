import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';
import { createUser, editUser, deleteUser } from '../../services/users';
import { IUser } from '../../interfaces/user';

const router = Router();

// usage get /auth/create
router.post('/', async (req: Request, res: Response) => {
    try {
        const { id, username, avatar } = req.body;

        if (!id || !username) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Missing required fields',
            });
        }

        const user = await createUser({ id, username, avatar });

        // create user
        res.status(HttpStatusCodes.OK).send(user);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const data: IUser = req.body;

        if (!data) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Missing required fields',
            });
        }

        const user = await editUser(data.id, data);

        // create user
        res.status(HttpStatusCodes.OK).send(user);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                message: 'Missing required fields',
            });
        }

        await deleteUser(id);

        // delete user
        res.status(HttpStatusCodes.OK).send({ message: 'User deleted' });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });
    }
});

export default router;
