import { Response } from 'express';

interface IResponse {
  error: boolean;
  message: string | string[];
  code: number;
  data: unknown;
}

export const defaultResponse = () => {
  const resultErrorObject: IResponse = {
    error: true,
    message: '',
    code: 400,
    data: null,
  };

  const resultSuccessObject: IResponse = {
    error: false,
    message: '',
    code: 200,
    data: {},
  };

  return {
    /**
     * failure function
     * * */
    error: (error: Error, res: Response, status = 500) => {
      resultErrorObject.error = true;
      resultErrorObject.message = error.message;
      resultErrorObject.code = status;
      res.status(status).json(resultErrorObject);
    },

    /**
     * success function OR successfully response back
     * * */

    success: (
      message: string,
      response: unknown,
      res: Response,
      status: number,
    ) => {
      resultSuccessObject.error = false;
      resultSuccessObject.message = message;
      resultSuccessObject.code = status;
      resultSuccessObject.data = response;
      res.status(status).json(resultSuccessObject);
    },
  };
};
