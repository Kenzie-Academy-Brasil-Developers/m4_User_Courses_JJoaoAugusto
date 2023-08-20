import { Router } from "express";
import courseControllers from "../controllers/course.controllers";

const courseRouter: Router = Router();

courseRouter.get("", courseControllers.read);
courseRouter.get("/:courseId/users", courseControllers.retrieve);
courseRouter.post("", courseControllers.create);
courseRouter.post("/:courseId/users/:userId", courseControllers.registerUser);
courseRouter.delete("/:courseId/users/:userId");

export default courseRouter;
