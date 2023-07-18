import React, { useState } from "react";
import Editor from "./TestEditor";
import Challenge from "./Challenge";

const Interview = () => {
  const [output, setOutput] = useState(""); // State to store the output

  const handleOutput = (result) => {
    setOutput(result); // Update the output state with the result
  };

  return (
    <div className="flex flex-col custom:flex-row custom:items-center">
      <div id="editor-container" className="w-[800px] mx-auto">
        <Editor handleOutput={handleOutput} />
        <div>{output}</div> {/* Display the output in the specified <div> */}
      </div>
      <div id="challenge-container" className="mx-auto text-center">
        <div className="text-white text-3xl pt-4">Challenges</div>
        <Challenge />
        <Challenge />
        <Challenge />
      </div>
    </div>
  );
};

export default Interview;
