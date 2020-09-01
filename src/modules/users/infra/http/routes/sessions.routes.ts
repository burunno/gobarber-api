import { Router } from 'express';
import 'express-async-errors';

import SessionController from '../controllers/SessionController';

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
