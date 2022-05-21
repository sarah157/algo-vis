import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  arrayLengthStep,
  maxArrayLength,
  maxSpeed,
  minArrayLength,
  minSpeed,
  Mode,
  SortAlgorithm,
} from "../../constants";

import { AppDispatch, RootState } from "../../store";
import {
  PathfindingAlgorithm,
  startSearching,
  setIsSearching,
  reset,
  setAlgorithm
} from "../../store/pathfinding-visualizer-slice";
import "../UI/Dropdown/Dropdown.scss";
import "./PathfindingControls.scss";
import Slider from "../UI/Slider/Slider";
import StartStopButton from "../UI/StartStopButton/StartStopButton";
import Dropdown, { Option } from "../UI/Dropdown/Dropdown";
import Controls, { ControlElement } from "../Controls/Controls";
import RadioGroup from "../UI/RadioGroup/RadioGroup";
import { capitalize } from "../../helpers";

const PathfindingControls = () => {
  const pv = useSelector((state: RootState) => state.pathfindingVisualizer);
  const dispatch = useDispatch<AppDispatch>();

  const _reset = () => dispatch(reset());
  const _setAlgorithm = (algorithm: PathfindingAlgorithm) =>
    dispatch(setAlgorithm(algorithm));
  // const _setSpeed = (speed: number) => dispatch(setSpeed(speed));
  const _stopSearching = () => dispatch(setIsSearching(false));
  const _startSearching = () => dispatch(startSearching());


  const handleChangeAlgorithm = (selected: string) => {
    _setAlgorithm(selected as PathfindingAlgorithm);
    // if (pv.isSorted) _reset();
  };

  // const handleChangeSpeed = (e: ChangeEvent<HTMLInputElement>) => {
  //   _setSpeed(parseInt(e.target.value));
  // };

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


  const buttonGroups: ControlElement = {
    element: (
      <StartStopButton
        isOn={pv.isSearching}
        onStart={_startSearching}
        onStop={_stopSearching}
        onReset={_reset}
      />
    ),
  };

  return (
    <Controls
      disabled={pv.isSearching}
      elements={[
        algorithmDropdown,
        buttonGroups,
      ]}
    />
  );
};

export default PathfindingControls;
