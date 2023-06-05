import React, { useState } from "react";
import "./fields.css";

const Input = ({from, setFocused, setValue, value, setPrevValue, startValue }) => {
  const [val, setVal] = useState("");

  return (
    <>
      <>
        <input
          className="input"
          type="number"
          value={val}
          autoFocus={true}
          onBlur={() => {
            setFocused(false);
            setVal("");
            if (value === "") setValue(1);
          }}
          onFocus={() => setFocused(true)}
          inputMode="numeric"
          onChange={(e) => {
            setVal(e.target.value);
            setValue(e.target.value);
            if(from === "yes")
            setPrevValue(e.target.value/startValue);
            else
            setPrevValue(e.target.value*startValue)
          }}
          onKeyDown={(e) => {
            if (e.key === "e") {
              e.preventDefault();
            }
          }}
        />
      </>
    </>
  );
};

export default Input;
