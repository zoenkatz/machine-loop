import React from "react";
import "./MachineSquare.scss";

const MachineSquare = ({ isOn, isMachineActive, onClick, isPlaying }) => {
  console.log(isPlaying);
  return (
    <div
      className={`machine-square ${isOn ? "on" : "off"} ${
        isMachineActive && isOn && isPlaying ? "active" : ""
      }`}
      onClick={onClick}
    />
  );
};

export default MachineSquare;
