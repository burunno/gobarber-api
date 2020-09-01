import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SessionService from '@modules/users/services/SessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionService = container.resolve(SessionService);

    const { user, token } = await sessionService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
