import format from "pg-format";
import { User, UserCreate, UserRead, UserResult } from "../interfaces";
import { client } from "../database";
import { hash } from "bcryptjs";
import { userReadSchema, userReturnSchema } from "../schemas";
import { UserReturn } from "../interfaces";
import { AppError } from "../errors";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  payload.password = await hash(payload.password, 10);
  const queryFormat: string = format(
    `INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult = await client.query(queryFormat);
  return userReturnSchema.parse(queryResult.rows[0]);
};

const read = async (): Promise<UserRead> => {
  const queryResult = await client.query(`SELECT * FROM "users";`);
  return userReadSchema.parse(queryResult.rows);
};

const retrieve = async (id: number) => {
  const queryTemplate: string = `
  SELECT
  "u"."id" as "userId",
  "u"."name" as "userName",
  "c"."id" as "courseId",
  "c"."name" as "courseName",
  "c"."description" as "courseDescription",
  "uc"."active" as "userActiveInCourse"
  FROM "courses" AS "c"
  JOIN "userCourses" AS "uc"
  ON "c"."id" = "uc"."courseId"
  JOIN  "users" AS "u"
  ON "u"."id" = "uc"."courseId" 
  WHERE "u"."id" = $1;
    `;
  const queryResult = await client.query(queryTemplate, [id]);

  if (queryResult.rowCount === 0) {
    throw new AppError("No course found", 404);
  }

  return queryResult.rows;
};

export default { create, read, retrieve };
