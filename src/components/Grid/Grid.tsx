import { keyboardKey } from "@testing-library/user-event";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addWall, removeWall } from "../../store/pathfinding-visualizer-slice";
import { setMode } from "../../store/sorting-visualizer-slice";
import "./Grid.scss";
interface NodeProps {
  row: number;
  col: number;
}
const Node = ({ row, col }: NodeProps) => {
  return <div className="grid__node" id={row + "," + col}></div>;
};

const Grid = () => {
  const pv = useSelector((state: RootState) => state.pathfindingVisualizer);
  const dispatch = useDispatch<AppDispatch>();
  const [isDragging, setIsDragging] = useState(false);
  const [isDrawingMode, setisDrawingMode] = useState<boolean>(true)

  const getPosition = (pos: string): string =>  pos.replace("-", ",")

  const handleMouseDown = (e: any) => {
    if (pv.isSearching) return;
    const position: string = getPosition(e.target.id);
    if (isDrawingMode) dispatch(addWall(position));
    else dispatch(removeWall(position));
    setIsDragging(true);
  };

  const handleMouseUp = (e: any) => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging || pv.isSearching) return;
    const position: string = getPosition(e.target.id);
    if (isDrawingMode) dispatch(addWall(position));
    else dispatch(removeWall(position));
  };

const handleChangeMode = (e: any) => {
  setisDrawingMode(prev => !prev)
}
  const getColorClass = (node: number[]) => {
    const pos = node.join();
    if (pv.walls.includes(pos)) {
      return " wall";
    }
    if (pv.path.includes(pos)) {
      return " path";
    }
    if (pv.visited.includes(pos)) {
      return " visited";
    }

    if (pv.start === pos) {
      return " start";
    }

    if (pv.end === pos) {
      return " finish";
    }
    return "";
  };

  return (
    <div
      className="grid"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleChangeMode}
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
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
