import { Router } from "express";
import { sessionServices } from "../services";

const sessionRouter: Router = Router();

sessionRouter.post("", sessionServices.create);

export default sessionRouter;
