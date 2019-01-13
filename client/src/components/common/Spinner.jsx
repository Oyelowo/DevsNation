import React from "react";
import spinner from "./Pacman-1s-200px.svg";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: 220, margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
