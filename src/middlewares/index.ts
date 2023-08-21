import handleErrors from "./handleErrors.middlewares";
import validateEmailExists from "./validateEmailExists.middlewares";
import validateBody from "./validateBody.middlewares";
import verifyToken from "./verifyToken.middlewares";
import validateIdExists from "./validateIdExists.middlewares";
import verifyAdmin from "./verifyAdmin.middlewares";

export default {
  handleErrors,
  validateEmailExists,
  validateBody,
  verifyToken,
  validateIdExists,
  verifyAdmin,
};
