import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { UserResult } from "../interfaces";
import { AppError } from "../errors";

const validateEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) return next();

  const queryResult: UserResult = await client.query(
    `SELECT * FROM "users" WHERE "email" = $1;`,
    [email]
  );

  if (queryResult.rows[0]) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};

export default validateEmailExists;
