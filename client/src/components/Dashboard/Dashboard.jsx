import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import StudentInfo from "./StudentInfo";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transition, setTransition] = useState(true);

  const name = JSON.parse(localStorage.getItem("name"));

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get("/api/students");
        const data = res.data;
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, []);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await axios.get(`/api/interviews/`);
        const data = res.data;
        const filteredData = data.filter((student) => {
          return student.i_first_name === name.firstName;
        });
        setFilteredStudents(filteredData);
        setStudentInfo(data);
      } catch (err) {
        console.log(err);
      }
    };
    getInterviews();
  }, [students]);

  useEffect(() => {
    students.length && studentInfo.length && setLoading(false);
  }, [students, studentInfo]);

  useEffect(() => {
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
    }, 300);
  }, []);

  const transitionClass = "transition-all duration-500 ease-in-out transform";

  return (
    <div className="h-full w-full flex">
      <div className="flex flex-col sm:flex-row justify-between align-center w-full mx-auto p-12">
        <div
          className={`mx-auto w-full max-w-[1200px] ${
            transition ? "opacity-0 -translate-x-[200px]" : transitionClass
          }`}
        >
          {!loading && (
            <Welcome
              students={students}
              currentStudent={currentStudent}
              setCurrentStudent={setCurrentStudent}
              studentInfo={studentInfo}
              filteredStudents={filteredStudents}
              setFilteredStudents={setFilteredStudents}
            />
          )}
        </div>
        <div
          className={`mx-auto ${
            transition ? "opacity-0 translate-x-[200px]" : transitionClass
          }`}
        >
          {!loading && (
            <StudentInfo
              students={students}
              currentStudent={currentStudent}
              setCurrentStudent={setCurrentStudent}
              studentInfo={studentInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
