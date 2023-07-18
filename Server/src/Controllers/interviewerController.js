import { db } from "../Database/database.js";
import { allStudents, interiewersById, student } from "./queries.js";

// fetches all students
export const getAllStudents = async (req, res) => {
  try {
    const results = await db.query(allStudents);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR Fetching Students" });
  }
};

// fetches students by id
export const getStudentByID = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const results = await db.query(student, [id]);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Student Not Found" });
  }
};

// fetches interviewers by id
export const getInterviewerById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const results = await db.query(interiewersById, [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Interviewer" });
  }
};
