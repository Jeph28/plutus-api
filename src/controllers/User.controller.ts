import { Request, Response } from 'express';
import { User } from '../models/User.model';
import { IUserDocument } from '../models/User.model';
import { defaultResponse } from '../utils/defaultResponse';

export class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user: IUserDocument = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find({});
      defaultResponse().success('Users found', users, res, 200);
    } catch (error) {
      defaultResponse().error(new Error('Users not found'), res, 404);
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        defaultResponse().error(new Error('User not found'), res, 404);
        return;
      }
      defaultResponse().success('User found', user, res, 200);
    } catch (error) {
      defaultResponse().error(new Error('User not found'), res, 404);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}
