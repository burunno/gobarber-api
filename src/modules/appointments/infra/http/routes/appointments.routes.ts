import { Router } from 'express';
import 'express-async-errors';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
