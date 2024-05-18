import { Request, Response, Router } from 'express';
import { HttpStatusCodes } from '../../constants/StatusCodes';

const router = Router();

// GET /search
router.get('/', (req: Request, res: Response) => {
    res.status(HttpStatusCodes.OK).send('Hello from search!');
});

export default router;
