import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  startSearching,
  setIsSearching,
  setAlgorithm,
  clearVisitedAndPath
} from "../../store/pathfinding-visualizer-slice";
import "../UI/Dropdown/Dropdown.scss";
import "./PathfindingControls.scss";
import { PathfindingAlgorithm } from "../../models/pathfinding-visualizer";
import StartStopButton from "../UI/StartStopButton/StartStopButton";
import Dropdown, { Option } from "../UI/Dropdown/Dropdown";
import Controls, { ControlElement } from "../Controls/Controls";
import { capitalize } from "../../helpers";
import SpeedDropdown from "../SpeedDropdown/SpeedDropdown";

const PathfindingControls = () => {
  const pv = useSelector((state: RootState) => state.pathfindingVisualizer);
  const dispatch = useDispatch<AppDispatch>();

  const _clearVisitedAndPath = () => dispatch(clearVisitedAndPath());
  const _setAlgorithm = (algorithm: PathfindingAlgorithm) =>
    dispatch(setAlgorithm(algorithm));
  const _stopSearching = () => {
    dispatch(clearVisitedAndPath())
    dispatch(setIsSearching(false))
  };
  const _startSearching = () => dispatch(startSearching());


  const handleChangeAlgorithm = (selected: string) => {
    _setAlgorithm(selected as PathfindingAlgorithm);
    if (pv.isFound) _clearVisitedAndPath();
  };

  const algorithmOptions: Option[] = Object.keys(PathfindingAlgorithm).map((a) => {
    return { value: a, label: `${capitalize(a)}` };
  });

  const algorithmDropdown: ControlElement = {
    element: (
      <Dropdown
        onSelect={handleChangeAlgorithm}
        activeOptionValue={pv.algorithm}
        options={algorithmOptions}
        disabled={pv.isSearching}
        id="sort-algorithms"
        label="Algorithm"
      />
    ),
    disableable: true,
  };  


   const speedDropdown: ControlElement = {
    element: (
      <SpeedDropdown />
    ),
    
    disableable: false,
  };

  const resetButton: ControlElement = {
    element: (
      <div>
           <button onClick={_clearVisitedAndPath} disabled={pv.isSearching} className="reset-button">
        Clear Path
      </button>
      </div>
   
    ),
    disableable: true,
  };

  const playButton: ControlElement = {
    element: (
      <StartStopButton
        isOn={pv.isSearching}
        onStart={_startSearching}
        onStop={_stopSearching}
      />
    ),
  };

  return (
    <Controls
      disabled={pv.isSearching}
      elements={[
        algorithmDropdown,
        speedDropdown,
        resetButton,
        playButton,
      ]}
    />
  );
};

export default PathfindingControls;
