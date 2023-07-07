import * as jwt from "jsonwebtoken";

export function jwtSign(data: any) {
  const EXP =
    process.env.MODE === "DEV"
      ? null
      : { expiresIn: process.env.JWT_ACTIVE_DURATION };
  return jwt.sign({ ...data }, process.env.JWT_SECRET, EXP);
}
