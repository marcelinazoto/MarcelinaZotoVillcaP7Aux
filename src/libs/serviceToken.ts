import jwt from "jsonwebtoken";
import moment from "moment";

export const createToken = (id: string) => {
  const params = {
    id,
    iat: moment().unix(),
    exp: moment().add(1, "month").unix(),
  };
  return jwt.sign(params, "palabrasClave");
};
