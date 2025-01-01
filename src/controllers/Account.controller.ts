import { Request, Response } from 'express';
import { Account } from '../models/Account.model';
import { IAccountDocument } from '../models/Account.model';

export class AccountController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const account: IAccountDocument = new Account({
        user: req.user?.id,
        name: req.body.name,
        balance: req.body.balance,
        description: req.body.description,
        account: req.body.account,
      });

      await account.save();
      res.status(201).json(account);
    } catch (error) {
      res
        .status(400)
        .json({
          message:
            error instanceof Error ? error.message : 'Unknown error occurred',
        });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const accounts = await Account.find({ user: req.user?.id });
      res.json(accounts);
    } catch (error) {
      res
        .status(500)
        .json({
          message:
            error instanceof Error ? error.message : 'Unknown error occurred',
        });
    }
  }
}
