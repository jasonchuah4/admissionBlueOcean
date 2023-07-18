import { db } from "../Database/database.js";

export const getAllQuestions = async (req, res) => {
  try {
    const results = await db.query(`SELECT * FROM questions`);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Questions" });
  }
};
