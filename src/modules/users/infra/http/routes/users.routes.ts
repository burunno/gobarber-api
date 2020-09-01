import { Router } from 'express';
import 'express-async-errors';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateUserController from '../controllers/CreateUserController';
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post('/', createUsersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.update,
);

export default usersRouter;
