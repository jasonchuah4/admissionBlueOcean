import { db } from "../Database/database.js";
import {
  allInterviews,
  interviewsByStudents,
  patchInterviewData,
  postInterview,
} from "./queries.js";

export const getAllInterviews = async (req, res) => {
  try {
    const results = await db.query(allInterviews);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Interviews" });
  }
};

export const getInterview = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query(interviewsByStudents, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Interview Data" });
  }
};

export const updateInterviewData = async (req, res) => {
  try {
    const id = Number(req.params.id);
    let { notes, result } = req.body;

    if (result == undefined) {
      const results = await db.query(patchInterviewData, [notes, result, id]);
      return res.status(200).json(results.rows[0]);
    }

    if (result.toLowerCase() === "pass") {
      result = true;
    } else if (result.toLowerCase() === "fail") {
      result = false;
    } else {
      return res
        .status(400)
        .json({ message: "Invalid value for students result" });
    }

    const results = await db.query(patchInterviewData, [notes, result, id]);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating Interview Data" });
  }
};

export const addInterview = async (req, res) => {
  try {
    const { studentId, interviewerId, date } = req.body;
    console.log(studentId, interviewerId);

    const results = await db.query(postInterview, [
      parseInt(studentId),
      parseInt(interviewerId),
      date,
    ]);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Adding Interview To Schedule" });
  }
};
