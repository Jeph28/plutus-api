declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export interface TokenPayload {
  id: string;
  email: string;
}
