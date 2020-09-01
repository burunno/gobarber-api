import { Response, Request } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UpdateUserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateuserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateuserAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
