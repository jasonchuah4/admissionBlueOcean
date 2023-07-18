import React from "react";

const StudentListDropDown = ({
  studentInfo,
  results,
  page,
  chunkedStudents,
}) => {
  const student = chunkedStudents[page][results];
  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col justify-between">
        <h2 className="text-xl text-accent tracking-wide text-left py-2">
          Notes:
        </h2>
        {student.q_notes.map((note, index) => {
          return (
            <div key={index} className="flex flex-col py-2">
              <p className="text-white/70 text-left">
                <span className="text-galv-orange font-bold">
                  Question {index + 1}:
                </span>{" "}
                {note}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentListDropDown;
