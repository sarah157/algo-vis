import { useSelector } from "react-redux";
import { maxArrayValue } from "../../constants";
import { RootState } from "../../store";

const NORMAL_COLOR: string = "#608be0";
const COMPARE_COLOR: string = "#d1476a";
const SWAP_COLOR: string = "#dde66a";
const SORTED_COLOR: string = "#6fd17f";
const PIVOT_COLOR: string = "violet";

const ArrayContainer: React.FC = () => {
  const sv = useSelector((state: RootState) => state.sortingVisualizer);
  return (
    <div className="array-container">
      {sv.array.map((value: number, index: number) => (
        <div
          className="array-bar"
          style={{
            height: `${(value / maxArrayValue) * 90}%`,
            backgroundColor:
              sv.swapIndices!.includes(index)
                ? SWAP_COLOR
                : sv.compareIndices.includes(index)
                ? COMPARE_COLOR
                : sv.pivotIndex === index
                ? PIVOT_COLOR
                : sv.sortedIndices.includes(index)
                ? SORTED_COLOR
                : NORMAL_COLOR,
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default ArrayContainer;
