import format from "pg-format";
import { Course, CourseCreate, CourseRead } from "../interfaces";
import { client } from "../database";
import { courseReadSchema, courseSchema } from "../schemas";
import { AppError } from "../errors";
import {
  UserCourse,
  UserCourseCreate,
  UserCourseResult,
} from "../interfaces/course.interfaces";

const create = async (payload: CourseCreate): Promise<Course> => {
  const queryFormat: string = format(
    `INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult = await client.query(queryFormat);
  return courseSchema.parse(queryResult.rows[0]);
};

const read = async (): Promise<CourseRead> => {
  const queryResult = await client.query(`SELECT * FROM "courses";`);
  return courseReadSchema.parse(queryResult.rows);
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
  FROM "users" AS "u"
  JOIN "userCourses" AS "uc"
  ON "u"."id" = "uc"."userId"
  JOIN  "courses" AS "c"
  ON "c"."id" = "uc"."courseId" 
  WHERE "c"."id" = $1;
  `;
  const queryResult: UserCourseResult = await client.query(queryTemplate, [id]);
  console.log(queryResult.rows);
  return queryResult.rows;
};

const registerUser = async (payload: UserCourseCreate) => {
  const queryFormat: string = format(
    `INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult = await client.query(queryFormat);

  if (queryResult.rowCount === 0) {
    throw new AppError("deu errado");
  }

  return queryResult.rows;
};

export default { create, read, retrieve, registerUser };
