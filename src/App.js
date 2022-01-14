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
      intervalAud: 0,
    },
    {
      squareNum: 1,
      isOn: 0,
      squareAud: new Audio(aud2),
      intervalAud: 0,
    },
    {
      squareNum: 2,
      isOn: 0,
      squareAud: new Audio(aud3),
      intervalAud: 0,
    },
    {
      squareNum: 3,
      isOn: 0,
      squareAud: new Audio(aud4),
      intervalAud: 0,
    },
    {
      squareNum: 4,
      isOn: 0,
      squareAud: new Audio(aud5),
      intervalAud: 0,
    },
    {
      squareNum: 5,
      isOn: 0,
      squareAud: new Audio(aud6),
      intervalAud: 0,
    },
    {
      squareNum: 6,
      isOn: 0,
      squareAud: new Audio(aud7),
      intervalAud: 0,
    },
    {
      squareNum: 7,
      isOn: 0,
      squareAud: new Audio(aud8),
      intervalAud: 0,
    },
    {
      squareNum: 8,
      isOn: 0,
      squareAud: new Audio(aud9),
      intervalAud: 0,
    },
  ]);

  const [isMachineActive, setIsMachineActive] = useState(false);

  useEffect(() => {
    if (isMachineActive) {
      const newMachineStateWithInterval = machineSquares.reduce(
        (accum, currentValue) => {
          if (currentValue.isOn) {
            currentValue.squareAud.play();
            accum.push({
              ...currentValue,
                  intervalAud: setInterval(() => {
                  console.log("interval")
                currentValue.squareAud.play();
              }, 8000),
            });
          } else {
            accum.push(currentValue);
          }
          return accum;
        },
        []
      );
      setMachineSquares(newMachineStateWithInterval);
    } else {
      machineSquares.forEach(
        (square) =>
          !!square.isOn &&
          clearInterval(square.intervalAud) &&
        square.squareAud.pause()
    );
    }
  }, [isMachineActive]);

  const handleSquareClick = useCallback(
    (currentSquare) => {
      const { squareNum, isOn, squareAud, intervalAud } = currentSquare;
      const newMachineSquareState = [
        ...machineSquares.slice(0, squareNum),
        { ...currentSquare, isOn: !isOn ? 1 : 0 },
        ...machineSquares.slice(squareNum + 1),
      ];
      setMachineSquares(newMachineSquareState);

      if (isOn && isMachineActive) {
          squareAud.pause();
          clearInterval(intervalAud);

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
              audio={square.squareAud}
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
