import { useSelector } from "react-redux";
import { COMPARE_COLOR, maxArrayValue, DEFAULT_COLOR, PIVOT_COLOR, SORTED_COLOR, SWAP_COLOR } from "../../constants";
import { RootState } from "../../store";
import CircleIcon from "@mui/icons-material/Circle";

const ArrayContainer: React.FC = () => {
  const sv = useSelector((state: RootState) => state.sortingVisualizer);

  const getColor = (index: number): string => {
    const color = sv.swapIndices!.includes(index)
      ? SWAP_COLOR
      : sv.compareIndices.includes(index)
      ? COMPARE_COLOR
      : sv.pivotIndex === index
      ? PIVOT_COLOR
      : sv.sortedIndices.includes(index)
      ? SORTED_COLOR
      : DEFAULT_COLOR;
    return color;
  };

  return (
    <div className="array-container">
      {sv.array.map((value: number, index: number) => {
        if (sv.mode === "bar") {
          return (
            <div
              className="array-bar"
              style={{
                height: `${(value / maxArrayValue) * 100}%`,
                backgroundColor: getColor(index),
              }}
              key={index}
            ></div>
          );
        } else {
          return (
            <div
              className="array-scatter"
              style={{
                height: `${(value / maxArrayValue) * 100}%`,
              }}
              key={index}
            >
              <CircleIcon style={{ width: "100%", color: getColor(index) }} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default ArrayContainer;
