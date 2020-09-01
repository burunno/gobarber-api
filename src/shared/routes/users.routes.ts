import { Router } from 'express';
import 'express-async-errors';
import multer from 'multer';

import CreateUserService from '../../modules/users/services/CreateUserService';
import UpdateUserAvatarService from '../../modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../../modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '../../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { id } = request.user;
    const updateuserAvatar = new UpdateUserAvatarService();

    const user = await updateuserAvatar.execute({
      user_id: id,
      filename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
