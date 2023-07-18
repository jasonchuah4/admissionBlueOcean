import { faker } from "@faker-js/faker";
import fs from "fs";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const writableStream = fs.createWriteStream("interview.csv");

for (let i = 0; i < 75; i++) {
  const studentId = faker.number.int({ min: 1, max: 50 });
  const interviewerId = faker.number.int({ min: 1, max: 5 });
  const date = faker.date
    .between({
      from: "2023-05-01T00:00:00.000Z",
      to: "2023-12-30T00:00:00.000Z",
    })
    .toISOString();
  const questionNotes = [];
  for (let i = 0; i < 4; i++) {
    const note = faker.lorem.sentence(); // Generate a random question note
    questionNotes.push(note);
  }
  const notes = faker.lorem.lines(1);
  const results = faker.datatype.boolean();

  writableStream.write(
    `${studentId},${interviewerId},${date},"{${questionNotes}}",${notes},${results}\n`
  );
}

writableStream.close();
pool.end();

//  HOW TO RUN
// STEP 1- cd into the script dir
// STEP 2- run "node bulkInInterviews.js"
// STEP 3- get into your database and run the code below
// \copy interviews (student_id, interviewers_id, interview_date, notes, results) FROM 'PASTE PATH TO bulkInInterview.js' WITH (FORMAT csv, DELIMITER ',');
// you should see COPY 75 and you are done.
