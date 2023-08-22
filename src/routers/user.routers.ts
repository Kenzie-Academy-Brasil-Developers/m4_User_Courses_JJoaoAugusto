import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import middlewares from "../middlewares";
import { userCreateSchema } from "../schemas";
import verifyAdmin from "../middlewares/verifyAdmin.middlewares";

const userRouter: Router = Router();

userRouter.get("", middlewares.verifyToken, verifyAdmin, userControllers.read);
userRouter.get(
  "/:userId/courses",
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
