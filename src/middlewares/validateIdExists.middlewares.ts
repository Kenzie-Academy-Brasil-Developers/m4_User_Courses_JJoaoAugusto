import { NextFunction, Request, Response } from "express";
import { CourseResult, UserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const validateIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  const { courseId } = req.params;

  if (userId) {
    const queryUser: UserResult = await client.query(
      `SELECT * FROM "users" WHERE "id" = $1`,
      [userId]
    );

    if (queryUser.rowCount === 0) {
      throw new AppError("User not found", 404);
    }
  }

  if (courseId) {
    const queryCourse: CourseResult = await client.query(
      `SELECT * FROM "courses" WHERE "id" = $1`,
      [courseId]
    );

    if (queryCourse.rowCount === 0) {
      throw new AppError("Course not found", 404);
    }
  }

  return next();
};

export default validateIdExists;
