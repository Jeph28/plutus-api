import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { defaultResponse } from '../utils/defaultResponse';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return defaultResponse().error(
          new Error('Validation failed'),
          res,
          400,
        );
      }
      return defaultResponse().error(
        new Error('Internal server error'),
        res,
        500,
      );
    }
  };
};
