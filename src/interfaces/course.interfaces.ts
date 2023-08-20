import { QueryResult } from "pg";
import { z } from "zod";
import { courseCreateSchema, courseReadSchema, courseSchema } from "../schemas";
import {
  userCourseCreateSchema,
  userCourseSchema,
} from "../schemas/course.echemas";

type Course = z.infer<typeof courseSchema>;
type CourseCreate = z.infer<typeof courseCreateSchema>;
type CourseRead = z.infer<typeof courseReadSchema>;
type CourseResult = QueryResult<Course>;

type UserCourse = z.infer<typeof userCourseSchema>;
type UserCourseCreate = z.infer<typeof userCourseCreateSchema>;
type UserCourseResult = QueryResult<UserCourse>;

export {
  Course,
  CourseCreate,
  CourseRead,
  CourseResult,
  UserCourse,
  UserCourseResult,
  UserCourseCreate,
};
