import React from "react";
import Upcoming from "./Upcoming";

const Welcome = ({
  students,
  currentStudent,
  setCurrentStudent,
  studentInfo,
  filteredStudents,
  setFilteredStudents,
}) => {
  const name = JSON.parse(localStorage.getItem("name"));

  return (
    <div className="text-5xl text-white text-left custom:mx-2 my-12 flex flex-col 2xl:px-14 w-full">
      <div className="w-2/3">
        Welcome back <span className="text-galv-orange"> {name.firstName}</span>
        <div className="border-y-2 border-bg shadow-lg shadow-black mt-2"></div>
      </div>
      <div className="flex">
        <Upcoming
          students={students}
          currentStudent={currentStudent}
          setCurrentStudent={setCurrentStudent}
          studentInfo={studentInfo}
          filteredStudents={filteredStudents}
          setFilteredStudents={setFilteredStudents}
        />
      </div>
    </div>
  );
};

export default Welcome;
