import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import middlewares from "../middlewares";
import { userCreateSchema } from "../schemas";

const userRouter: Router = Router();

userRouter.get("", middlewares.verifyToken, userControllers.read);
userRouter.get(
  "/:userId/courses",
  middlewares.validateIdExists,
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  userControllers.retrieve
);
userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.validateEmailExists,
  userControllers.create
);

export default userRouter;
