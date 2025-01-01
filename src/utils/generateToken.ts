import jwt from 'jsonwebtoken';
import CONFIGURATION from '../config/config';
import { IUserDocument } from '../models/User.model';
import { TokenPayload } from '../types/express';

export const generateToken = () => ({
  new: (user: IUserDocument) => {
    const jwtdata: TokenPayload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(jwtdata, CONFIGURATION.jwtSecret!, {
      expiresIn: '1 year',
    });

    return token;
  },
});
