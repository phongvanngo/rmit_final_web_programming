import React from "react";

export default function Son({handleStart,handleStop}) {
  return (
    <div>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
    </div>
  );
}
