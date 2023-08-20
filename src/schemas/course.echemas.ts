import { z } from "zod";

const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  description: z.string(),
});

const courseCreateSchema = courseSchema.omit({ id: true });
const courseReadSchema = courseSchema.array();

const userCourseSchema = z.object({
  id: z.number().positive(),
  active: z.boolean().default(true),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});
const userCourseCreateSchema = userCourseSchema.omit({ id: true });

export {
  courseSchema,
  courseCreateSchema,
  courseReadSchema,
  userCourseSchema,
  userCourseCreateSchema,
};
