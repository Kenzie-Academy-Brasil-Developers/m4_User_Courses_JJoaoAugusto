import { Request, Response } from "express";
import { courseServices } from "../services";
import { Course, CourseRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const course: Course = await courseServices.create(req.body);
  return res.status(201).json(course);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const courses: CourseRead = await courseServices.read();
  return res.status(200).json(courses);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.courseId);
  const userCourses = await courseServices.retrieve(id);
  return res.status(200).json(userCourses);
};

const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = Number(req.params.userId);
  const courseId = Number(req.params.courseId);
  const payload = {
    userId: userId,
    courseId: courseId,
    active: true,
  };
  const userCourse = await courseServices.registerUser(payload);
  return res.status(201).json(userCourse);
};

export default { create, read, retrieve, registerUser };
