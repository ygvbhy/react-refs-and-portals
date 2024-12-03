import React from "react";

const TimerChallenge = ({ title, targetTime }) => {
  return (
    <div className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} seconds{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button>Start Challenge</button>
      </p>
      <p className="">Time is running... / Timer inactive</p>
    </div>
  );
};

export default TimerChallenge;
