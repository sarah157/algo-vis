import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setWall, NodeType } from "../../store/pathfinding-visualizer-slice";
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

  const getPosition = (pos: string): number[] =>
    pos.split("-").map((x: string) => Number(x));

  const handleMouseDown = (e: any) => {
    if (pv.isSearching) return;
    const position: number[] = getPosition(e.target.id);
    dispatch(setWall(position));
    setIsDragging(true);
  };

  const handleMouseUp = (e: any) => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging || pv.isSearching) return;
    const position: number[] = getPosition(e.target.id);
    dispatch(setWall(position));
  };

  const getColorClass = (nodeType: NodeType) => {
    switch (nodeType) {
      case NodeType.unvisited:
        return "";
      case NodeType.visited:
        return "visited";
      case NodeType.wall:
        return "wall";
      case NodeType.start:
        return "start";
      case NodeType.finish:
        return "end";
    }
  };

  return (
    <div
      className="grid"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {pv.grid.map((row, rowIdx) => (
        <div className="grid__row" key={rowIdx}>
          {row.map((col, colIdx) => (
            <div
              onDragStart={(e: any) => e.preventDefault()}
              onMouseDown={handleMouseDown}
              key={rowIdx + "-" + colIdx}
              id={rowIdx + "-" + colIdx}
              className={`grid__node ${getColorClass( pv.grid[rowIdx][colIdx].type)}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
