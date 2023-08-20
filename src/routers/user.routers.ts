import { Router } from "express";
import userControllers from "../controllers/user.controllers";

const userRouter: Router = Router();

userRouter.get("", userControllers.read);
userRouter.get("/:userId/courses", userControllers.retrieve);
userRouter.post("", userControllers.create);

export default userRouter;
