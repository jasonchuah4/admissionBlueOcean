import React, { useState } from "react";

const Switch = () => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <label className="relative inline-block w-[60px] h-[28px]">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        onChange={handleToggle}
      />
      <span
        id="slider"
        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-secondary before:absolute before:content-[''] before:h-[20px] before:w-[20px] before:left-[4px] before:bottom-[4px] before:bg-bg/70 before:rounded-sm before:transition-all before:duration-300 before:ease-in-out ${
          checked
            ? "before:transform before:translate-x-[30px] before:bg-white/70"
            : ""
        }`}
      />
    </label>
  );
};

export default Switch;
