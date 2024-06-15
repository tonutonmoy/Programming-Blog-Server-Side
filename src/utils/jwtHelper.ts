import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

const generateToken = async (
  payload: { userId: number },
  secret: Secret,
  expires: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expires });
  return token;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.jwt.secret as string) as {
      userId: number;
    };
    return userData;
  } catch (err) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
