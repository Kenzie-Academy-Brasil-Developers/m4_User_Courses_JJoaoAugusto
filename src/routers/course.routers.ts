import { Router } from "express";
import courseControllers from "../controllers/course.controllers";
import middlewares from "../middlewares";
import { courseCreateSchema } from "../schemas";
import { userCourseCreateSchema } from "../schemas/course.echemas";

const courseRouter: Router = Router();

courseRouter.get("", courseControllers.read);

courseRouter.get(
  "/:courseId/users",
  middlewares.validateIdExists,
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  courseControllers.retrieve
);

courseRouter.post(
  "",
  middlewares.validateBody(courseCreateSchema),
  middlewares.validateIdExists,
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  courseControllers.create
);

courseRouter.post(
  "/:courseId/users/:userId",
  middlewares.validateIdExists,
  middlewares.validateBody(userCourseCreateSchema),
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  courseControllers.registerUser
);

courseRouter.delete(
  "/:courseId/users/:userId",
  middlewares.validateIdExists,
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  courseControllers.destroyRegisterUser
);

export default courseRouter;
