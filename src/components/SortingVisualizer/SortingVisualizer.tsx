import Controls from "./Controls";
import ArrayContainer from "./ArrayContainer";

const SortingVisualizer: React.FC = () => {
  return (
    <div className="sorting-visualizer">
      <Controls />
      <ArrayContainer />
    </div>
  );
};

export default SortingVisualizer;
