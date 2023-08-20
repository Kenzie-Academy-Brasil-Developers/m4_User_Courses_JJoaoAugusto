import { compare } from "bcryptjs";
import { client } from "../database";
import { AppError } from "../errors";
import { SessionCreate, User, UserResult } from "../interfaces";
import { SessionReturn } from "../interfaces/session.interfaces";
import { sign } from "jsonwebtoken";

const create = async (payload: SessionCreate): Promise<SessionReturn> => {
  console.log(payload);
  const query: UserResult = await client.query(
    `SELECT * FROM "users" WHERE "name" = $1;`,
    [payload.name]
  );

  if (query.rowCount === 0) {
    throw new AppError("Username or password is incorrect", 401);
  }

  const user: User = query.rows[0];
  const samePassword: boolean = await compare(payload.password, user.password);

  if (!samePassword) {
    throw new AppError("Username or password is incorrect", 401);
  }

  const token: string = sign(
    { name: user.name, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

export default { create };
