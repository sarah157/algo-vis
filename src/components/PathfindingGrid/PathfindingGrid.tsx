import { keyboardKey } from "@testing-library/user-event";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addWall, addWeight, clearVisitedAndPath, clearWallsAndWeights, removeWall, removeWeight } from "../../store/pathfinding-visualizer-slice";
import "./PathfindingGrid.scss";

type DrawingMode = "wall" | "weight" | "eraser";

const Grid = () => {
  const pv = useSelector((state: RootState) => state.pathfindingVisualizer);
  const dispatch = useDispatch<AppDispatch>();
  const [isDragging, setIsDragging] = useState(false);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("wall")

  const getPosition = (pos: string): string => pos.replace("-", ",");

  const handleMouseDown = (e: any) => {
    if (pv.isSearching) return;
    updateGrid(e);
    setIsDragging(true);
  };

  const updateGrid = (e: any) => {
    if (pv.isFound) dispatch(clearVisitedAndPath())
    const position: string = getPosition(e.target.id);
    if (drawingMode === "wall") dispatch(addWall(position));
    else if (drawingMode === "weight") dispatch(addWeight(position));
    else {
      if (e.target.className.includes("wall")) dispatch(removeWall(position));
      else dispatch(removeWeight(position));
    }
  };

  const handleMouseUp = (e: any) => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging || pv.isSearching) return;
    updateGrid(e);
  };

  const handleChangeMode = (e: any) => {
    setDrawingMode(e.target.id as DrawingMode);
  };

  const clearDrawings = () => {
    dispatch(clearWallsAndWeights());
  }

  const getColorClass = (node: number[]) => {
    const pos = node.join();
    if (pv.walls.includes(pos)) return " wall";
    if (pv.weights.includes(pos)) return " weight"
    if (pv.path.includes(pos))  return " path";
    if (pv.visited.includes(pos)) return " visited";
    if (pv.start === pos)  return " start";
    if (pv.end === pos) return " finish";
    return "";
  };

  const getButtonClassName = (btnMode: DrawingMode) => {
 return  "grid-toolbox__button" + (drawingMode === btnMode ? " selected" : "")
  }

  return (
    <div className="grid-container">
 
      <div
        className="grid"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {[...Array(pv.gridRows)].map((_, rowIdx) => (
          <div className="grid__row" key={rowIdx}>
            {[...Array(pv.gridCols)].map((_, colIdx) => (
              <div
                onDragStart={(e: any) => e.preventDefault()}
                onMouseDown={handleMouseDown}
                key={rowIdx + "-" + colIdx}
                id={rowIdx + "-" + colIdx}
                className={`grid__node${getColorClass([rowIdx, colIdx])}`}
              >
                {/* {pv.weights.includes([rowIdx, colIdx].join() && <span>weight</span>)} */}
              </div>
            ))}
          </div>
        ))}
      </div>     <div className="grid-toolbox">
        <button
          className={getButtonClassName("wall")}
          onClick={handleChangeMode}
          id="wall"
        >
          Draw wall
        </button>
        <button
          className={getButtonClassName("weight")}
          onClick={handleChangeMode}
          id="weight"
        >
          Draw weight
        </button>
        <button
          className={getButtonClassName("eraser")}
          onClick={handleChangeMode}
          id="eraser"
        >
          Eraser
        </button>
        <button onClick={clearDrawings} id="clear">Erase all</button>
      </div>
    </div>
  );
};

export default Grid;
