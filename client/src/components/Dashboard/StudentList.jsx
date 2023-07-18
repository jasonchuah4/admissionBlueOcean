import React, { useState } from "react";
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import StudentListDropDown from "./StudentListDropDown";

const StudentList = ({
  studentInfo,

  page,
  chunkedStudents,
}) => {
  const [results, setResults] = useState("");
  const [transition, setTransition] = useState(false);
  const [listTransition, setListTransition] = useState(true);
  const [dropDownTransition, setDropDownTransition] = useState(true);
  const [dropDown, setDropDown] = useState(false);

  const handleOpenview = (index) => {
    transition ? setTransition(false) : "";
    if (results === "") {
      results === index ? handleCloseView() : setResults(index);
      setListTransition(false);
      setTimeout(() => {
        setTransition(true);
        setTimeout(() => {
          handleDropDown();
        }, 300);
      }, 300);
    } else {
      setListTransition(false);
      setTimeout(() => {
        setResults(index);
        setTransition(true);
      }, 300);
    }
  };

  const handleCloseView = () => {
    setTransition(false);
    handleDropDown();
    setTimeout(() => {
      setListTransition(true);
      setTimeout(() => {
        setResults("");
        setTransition(true);
      }, 300);
    }, 300);
  };

  const handleDropDown = () => {
    setDropDownTransition(false);
    setTimeout(() => {
      setDropDown(!dropDown);
      setDropDownTransition(true);
    }, 300);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const student = chunkedStudents[page][results];

  return (
    <div className="flex md:flex-row flex-col sm:min-w-[520px] max-h-screen overflow-auto">
      <div
        className={`my-8 h-full overflow-auto overflow-x-hidden flex flex-col transition-all duration-300 ease ${
          !listTransition ? "w-full" : "md:w-[1000%]"
        }`}
      >
        <ul>
          {chunkedStudents[page].map((student, index) => {
            return (
              <li
                key={index}
                className="grid grid-cols-3 grid-flow-row  bg-bg p-4 rounded-lg shadow-lg shadow-black my-4"
              >
                <div className="text-left">
                  <div className="text-lg font-bold">
                    {student.s_first_name} {student.s_last_name}
                  </div>
                  <div
                    className={`italic ${
                      student.results ? "text-accent" : "text-red-400"
                    }`}
                  >
                    {student.results ? "Passed" : "Failed"}
                  </div>
                </div>

                <div className="text-white/50 flex justify-center">
                  {formatDate(student.interview_date)}
                </div>

                <div className="flex flex-row justify-end">
                  <button
                    className="bg-accent text-white rounded-md p-2 shadow-md shadow-black text-lg tracking-wider hover:scale-105 ml-2 cursor-pointer transition-all duration-300 ease-in-out"
                    onClick={() => handleOpenview(index)}
                  >
                    View
                  </button>
                  {!listTransition && (
                    <BsChevronBarRight className="relative text-white text-2xl ml-2 top-2" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`w-full h-full overflow-auto flex flex-col my-8 ${
          studentInfo[results] ? "" : "hidden"
        }`}
      >
        {!listTransition ? (
          <div
            className={`flex flex-col justify-between items-end w-full relative transition-all duration-300 ease ${
              transition ? "" : "-translate-x-[500px] -z-10"
            }`}
          >
            <div className="flex flex-row justify-start items-center bg-bg p-4 pl-14 rounded-lg shadow-lg shadow-black my-4 w-[90%]">
              <div
                onClick={handleCloseView}
                className=" relative text-2xl animate-pulse mr-2 ml-[-20px] cursor-pointer"
              >
                <BsChevronBarLeft />
              </div>
              <div className="text-left p-6 border-l-[1px] border-galv-orange">
                <h2 className="text-2xl font-bold tracking-wide pb-3">
                  Results:
                </h2>
                <div
                  className={`italic pb-4 ${
                    student.results ? "text-accent" : "text-red-400"
                  }`}
                >
                  <span className="text-white not-italic">
                    Overall Decision:
                  </span>{" "}
                  {student.results ? "Passed" : "Failed"}
                </div>
                <div className="text-white/70 tracking-wide text-lg flex flex-col">
                  <h2 className="text-xl text-accent tracking-wide text-left py-2">
                    Summary:
                  </h2>
                  <p>{student.notes}</p>
                </div>
              </div>
            </div>
            <div className="p-2 pl-14">
              <div
                className={`flex flex-col justify-end items-end w-full relative transition-all duration-300 ease bg-bg rounded-lg shadow-lg shadow-black p-2 ${
                  dropDown
                    ? "opacity-100 z-0"
                    : "opacity-0 -translate-y-[100px] -z-10"
                }`}
              >
                <StudentListDropDown
                  studentInfo={studentInfo}
                  results={results}
                  page={page}
                  results={results}
                  chunkedStudents={chunkedStudents}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StudentList;
