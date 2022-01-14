import React from 'react';
import "./MachineSquare.scss";

const MachineSquare = ({squareNum, isOn, audio, isMachineActive, onClick}) => {

    return <div
        className={`machine-square ${isOn ? "on" : "off"} ${
            isMachineActive && isOn ? "active" : "" 
            }`} onClick={onClick}
    />
};

export default MachineSquare;
