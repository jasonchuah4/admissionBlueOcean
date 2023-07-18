import { faker } from "@faker-js/faker";
import fs from "fs";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const writableStream = fs.createWriteStream("student.csv");

for (let i = 0; i < 50; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });
  const phone = faker.phone.number("###########");

  writableStream.write(`${firstName},${lastName},${email},${phone}\n`);
}

writableStream.close();
pool.end();

//  HOW TO RUN
// STEP 1- cd into the script dir
// STEP 2- run "node bulkInStudents.js"
// STEP 3- get into your database and run the code below
// \copy students (first_name, last_name, email, phone) FROM 'PASTE PATH TO bulkInStudents.js' WITH (FORMAT csv, DELIMITER ',');
// you should see COPY 50 and you are done.
