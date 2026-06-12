import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../utils";
import { ValidationError } from "sequelize";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof ValidationError) {
    res.status(422).json({
      error: {
        message: err.message,
        details: err.errors.map((error) => ({
          message: error.message,
          path: error.path,
          value: error.value,
        })),
      },
    });
    return;
  }
  res.status(500).json({ error: getErrorMessage(err) });
  next();
};

export default errorHandler;
