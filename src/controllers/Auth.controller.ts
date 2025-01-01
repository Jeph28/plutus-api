import { Request, Response } from 'express';
import { User } from '../models/User.model';
import { generateToken } from '../utils/generateToken';
import { defaultResponse } from '../utils/defaultResponse';
import passwordUtil from '../utils/passwordUtil';

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email }).lean();
    if (!user || !password) {
      defaultResponse().error(new Error('Invalid email or password'), res, 401);
      return;
    }

    const isPasswordValid = passwordUtil().validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return defaultResponse().error(
        new Error('Invalid email or password'),
        res,
        401,
      );
    }

    const token = generateToken().new(user);

    return defaultResponse().success(
      'Login successful',
      {
        access_token: token,
        ...user,
      },
      res,
      200,
    );
  }
}
