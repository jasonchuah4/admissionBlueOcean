import { generateToken } from "../Authorization/auth.js";
import { db } from "../Database/database.js";
import { emailCheck, login } from "./queries.js";

export const logUserIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json({ message: "Provide Email and Password" });
    }

    const results = await db.query(login, [email]);
    if (results.rowCount === 0 || results.rows[0].password !== password) {
      return res.status(400).json({ message: "Incorrect Email or Password" });
    }

    const token = generateToken(results.rows[0]);

    res.status(200).json({
      results: {
        id: results.rows[0].id,
        student_id: results.rows[0].student_id,
        first_name: results.rows[0].first_name,
        last_name: results.rows[0].last_name,
        email: results.rows[0].email,
      },
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Logging User In" });
  }
};
