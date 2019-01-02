//

import { NextFunction, Request, RequestHandler, Response } from "express";

//

// Inspired by https://www.npmjs.com/package/express-async-handler
export const asyncMiddleware = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
