import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (data) => {
  const token = jwt.sign(
    { id: data.id, firstName: data.first_name, lastName: data.last_name },
    process.env.INTERVIEWER_TOKEN,
    {
      expiresIn: "1d",
    }
  );
  return token;
};
