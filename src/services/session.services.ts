import { compare, hash } from "bcryptjs";
import { client } from "../database";
import { AppError } from "../errors";
import { SessionCreate, User, UserResult } from "../interfaces";
import { SessionReturn } from "../interfaces/session.interfaces";
import { sign } from "jsonwebtoken";

const create = async (payload: SessionCreate): Promise<String> => {
  const query: UserResult = await client.query(
    `SELECT * FROM "users" WHERE "email" = $1;`,
    [payload.email]
  );

  const user: User = query.rows[0];

  if (!user) {
    throw new AppError("Wrong email/password", 401);
  }

  const samePassword: boolean = await compare(payload.password, user.password);

  if (!samePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { expiresIn: process.env.EXPIRES_IN!, subject: user.id.toString() }
  );

  return token;
};

export default { create };
