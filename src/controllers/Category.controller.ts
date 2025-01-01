import { Request, Response } from 'express';
import { Category } from '../models/Category.model';
import { ICategoryDocument } from '../models/Category.model';

export class CategoryController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const category: ICategoryDocument = new Category({
        name: req.body.name,
        description: req.body.description,
        user: req.user?.id,
      });

      await category.save();
      res.status(201).json(category);
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
      const categories = await Category.find({ user: req.user?.id });
      res.json(categories);
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
