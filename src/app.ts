import express, { Application, json } from "express";
import { courseRouter, sessionRouter, userRouter } from "./routers";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/courses", courseRouter);

app.use(middlewares.handleErrors);

export default app;
