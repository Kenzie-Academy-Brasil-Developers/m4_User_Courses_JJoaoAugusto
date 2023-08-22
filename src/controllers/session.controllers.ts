import { Request, Response } from "express";
import { sessionServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const token = await sessionServices.create(req.body);
  return res.status(200).json({ token });
};

export default { create };
