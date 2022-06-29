import {
  PathfindingVisualizerIcon,
  SortingVisualizerIcon,
} from "../UI/VisualizerIcons";
import "./VisualizerSelector.scss";
const VisualizerSelector = () => {
  return (
    <div className="vis-selector">
      <div className="vis-selector__heading"><h1 >Select a Visualizer</h1></div>
      <div className="vis-selector__items">
          <SortingVisualizerIcon isHomePage={true}/>
          <PathfindingVisualizerIcon isHomePage={true} />
      </div>
    </div>
  );
};

export default VisualizerSelector;
