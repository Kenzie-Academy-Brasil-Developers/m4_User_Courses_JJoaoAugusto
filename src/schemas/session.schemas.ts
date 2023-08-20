import { userSchema } from "./user.schemas";

const sessionCreate = userSchema.pick({
  name: true,
  password: true,
});

export { sessionCreate };
