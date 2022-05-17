import { useSelector } from "react-redux";
import { maxArrayValue, Mode } from "../../constants";
import { RootState } from "../../store";
import CircleIcon from "@mui/icons-material/Circle";
import "./ArrayContainer.scss"

const ArrayContainer = () => {
  const sv = useSelector((state: RootState) => state.sortingVisualizer);

  const getColorClassName = (index: number): string => {
    const color = sv.swapIndices!.includes(index)
      ? "swap"
      : sv.compareIndices.includes(index)
      ? "compare"
      : sv.pivotIndex === index
      ? "pivot"
      : sv.sortedIndices.includes(index)
      ? "sorted"
      : "default";
    return color;
  };

  return (
    <div className="array-container">
      {sv.array.map((value: number, index: number) => (
        <div
          key={index}
          style={{height: `${(value / maxArrayValue) * 100}%`}}
          className={`array-item ${sv.mode} ${getColorClassName(index)}`}
        >
          {sv.mode === Mode.bar && <div key={index}></div>}
          {sv.mode === Mode.scatter && <CircleIcon style={{ width: "100%" }} />}
        </div>
      ))}

    </div>
  );
};

export default ArrayContainer;
