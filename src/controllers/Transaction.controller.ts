import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction.model';
import { ITransactionDocument } from '../models/Transaction.model';

export class TransactionController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const transaction: ITransactionDocument = new Transaction({
        user: req.user?.id,
        type: req.body.type,
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        account: req.body.account,
      });

      await transaction.save();
      res.status(201).json(transaction);
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
      const transactions = await Transaction.find({ user: req.user?.id })
        .populate('category')
        .populate('account')
        .sort({ date: -1 });
      res.json(transactions);
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
