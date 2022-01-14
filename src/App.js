import React, { useState, useCallback, useEffect } from "react";
import "./App.scss";
import MachineSquare from "./Components/MachineSquare/MachineSquare";
import aud1 from "./Utils/AudioFiles/src_assets_loops_1-GHS_123_Filo_Kick_Clap.mp3";
import aud2 from "./Utils/AudioFiles/src_assets_loops_2_8-hk_top125_zulu.mp3";
import aud3 from "./Utils/AudioFiles/src_assets_loops_1-GHS_123_Filo_Kick_Clap.mp3";
import aud4 from "./Utils/AudioFiles/src_assets_loops_1-GHS_123_Filo_Kick_Clap.mp3";
import aud5 from "./Utils/AudioFiles/src_assets_loops_1-GHS_123_Filo_Kick_Clap.mp3";
import aud6 from "./Utils/AudioFiles/src_assets_loops_6-hk_syn125_holdme1_Gm.mp3";
import aud7 from "./Utils/AudioFiles/src_assets_loops_1-GHS_123_Filo_Kick_Clap.mp3";
import aud8 from "./Utils/AudioFiles/src_assets_loops_8-hk_top125_zulu.mp3";
import aud9 from "./Utils/AudioFiles/src_assets_loops_9-hk_mus125_lovefunk2_Gm.mp3";

function App() {
  const [machineSquares, setMachineSquares] = useState([
    {
      squareNum: 0,
      isOn: 0,
      squareAud: new Audio(aud1),
    },
    {
      squareNum: 1,
      isOn: 0,
      squareAud: new Audio(aud2),
    },
    {
      squareNum: 2,
      isOn: 0,
      squareAud: new Audio(aud3),
    },
    {
      squareNum: 3,
      isOn: 0,
      squareAud: new Audio(aud4),
    },
    {
      squareNum: 4,
      isOn: 0,
      squareAud: new Audio(aud5),
    },
    {
      squareNum: 5,
      isOn: 0,
      squareAud: new Audio(aud6),
    },
    {
      squareNum: 6,
      isOn: 0,
      squareAud: new Audio(aud7),
    },
    {
      squareNum: 7,
      isOn: 0,
      squareAud: new Audio(aud8),
    },
    {
      squareNum: 8,
      isOn: 0,
      squareAud: new Audio(aud9),
    },
  ]);

  const [isMachineActive, setIsMachineActive] = useState(false);

  useEffect(() => {
    machineSquares.forEach((square) => {
      if (isMachineActive && square.isOn) {
        square.squareAud.play();
        square.squareAud.loop = true;
      } else {
        !!square.isOn && square.squareAud.pause();
      }
    });
  }, [isMachineActive]);

  const handleSquareClick = useCallback(
    (currentSquare) => {
      const { squareNum, isOn, squareAud } = currentSquare;
      const newMachineSquareState = [
        ...machineSquares.slice(0, squareNum),
        { ...currentSquare, isOn: !isOn ? 1 : 0 },
        ...machineSquares.slice(squareNum + 1),
      ];
      setMachineSquares(newMachineSquareState);

      if (isOn && isMachineActive) {
        squareAud.pause();
      }
    },
    [machineSquares]
  );
  return (
    <div className="App">
      <div className="loop-machine-title">Loop Machine</div>
      <div className="machine-switch-button">
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => setIsMachineActive(!isMachineActive)}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="machine-squares">
        {machineSquares.map((square) => {
          return (
            <MachineSquare
              key={square.squareNum}
              isOn={square.isOn}
              isMachineActive={isMachineActive}
              onClick={() => handleSquareClick(square)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
