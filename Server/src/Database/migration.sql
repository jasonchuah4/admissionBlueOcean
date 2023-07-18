DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS interviewers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS questions;


CREATE TABLE students (
  id                  SERIAL PRIMARY KEY,
  first_name          VARCHAR(25) NOT NULL,
  last_name           VARCHAR(25) NOT NULL,
  email               VARCHAR(75) UNIQUE NOT NULL,
  phone               VARCHAR(20) NOT NULL
);

CREATE TABLE interviewers (
  id                  SERIAL PRIMARY KEY,
  students_id         INT REFERENCES students(id) ON DELETE CASCADE,
  first_name          VARCHAR(25) NOT NULL,
  last_name           VARCHAR(25) NOT NULL,
  email               VARCHAR(75) UNIQUE NOT NULL,
  password            VARCHAR(100) NOT NULL
);

CREATE TABLE interviews (
  id                  SERIAL PRIMARY KEY,
  students_id         INT REFERENCES students(id) ON DELETE CASCADE,
  interviewers_id     INT REFERENCES interviewers(id) ON DELETE CASCADE,
  interview_date      DATE,
  question_notes      TEXT[],
  notes               TEXT,
  results             BOOLEAN
);

CREATE TABLE questions  (
  id                  SERIAL PRIMARY KEY,
  questions           TEXT NOT NULL
);
