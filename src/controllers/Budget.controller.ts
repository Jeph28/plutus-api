import { Request, Response } from 'express';
import { Budget } from '../models/Budget.model';
import { IBudgetDocument } from '../models/Budget.model';

export class BudgetController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const budget: IBudgetDocument = new Budget({
        user: req.user?.id,
        name: req.body.name,
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        account: req.body.account,
      });

      await budget.save();
      res.status(201).json(budget);
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
      const budgets = await Budget.find({ user: req.user?.id });
      res.json(budgets);
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
