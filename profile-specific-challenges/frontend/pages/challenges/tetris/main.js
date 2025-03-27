import { useEffect, useState } from "react";

const ROWS = 20;
const COLS = 10;
const TIME_INTERVAL = 500;

export default function Main() {
  const initialGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  const [gridState, setGridState] = useState(initialGrid);
  const middle = Math.floor(COLS / 2);

  useEffect(() => {
    setGridState((prev) => {
      return prev.map((row, rowIndex) => {
        return row.map((cell, index) => {
          return index === middle && rowIndex === 0 ? 1 : cell;
        });
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGridState((prev) => {
        return prev.map((row, rowIndex) => {
          return row.map((cell, cellIndex) => {
            if (rowIndex === 0) {
              if (cell === 1) {
                return 0;
              }
              return cell;
            }
            if (prev[rowIndex][cellIndex] === 1) {
              return 0;
            }
            if (prev[rowIndex - 1][cellIndex] === 1) {
              return 1;
            }

            if (rowIndex === ROWS - 1 && cell === 1) {
              return 1;
            }

            const onkeydown = ({ key }) => {
              if (key === "ArrowRight") {
                console.log("right");
              }

              if (key === "ArrowLeft") {
                console.log("left");
              }

              if (key === "Enter") {
                console.log("enter");
              }
            };

            addEventListener("keydown", onkeydown);

            return cell;
          });
        });
      });
    }, TIME_INTERVAL);

    return () => clearInterval(interval);
  }, [gridState]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center" }}
    >
      {gridState.map((grid, i) => {
        return (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            {grid.map((cell, j) => {
              return (
                <div
                  key={j}
                  style={{
                    border: "1px solid blue",
                    padding: 6,
                    width: 30,
                    height: 30,
                    background: `${cell === 1 ? "red" : ""}`,
                  }}
                >
                  {/* {cell} */}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
