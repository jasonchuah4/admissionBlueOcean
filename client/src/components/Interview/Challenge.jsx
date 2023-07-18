import React, { useState } from "react";
// import { Question1, Question2, Question3 } from "./Question";
import Answer from "./Answer";

export default function Challenge() {
  const [notes, setNotes] = useState("");

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center pt-2 w-[700px] border-b-2 border-gray-500">
      {/* <Question1 /> */}
      <Answer />
      <textarea
        value={notes}
        onChange={handleNotesChange}
        className="w-full h-20 p-4 border border-gray-300 rounded"
        placeholder="Notes..."
      ></textarea>
      <div id="border-spacing" className="w-full h-3">
        .
      </div>
    </div>
  );
}
