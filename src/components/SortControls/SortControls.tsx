import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  arrayLengthStep,
  maxArrayLength,
  minArrayLength,
  Mode,
  SortAlgorithm,
  Speed
} from "../../models";

import { AppDispatch, RootState } from "../../store";
import {
  setArrayLength,
  startSorting,
  reset,
  setAlgorithm,
  stopSorting,
  setMode,
} from "../../store/sorting-visualizer-slice";
import "../UI/Dropdown/Dropdown.scss";
import "./SortControls.scss";
import Slider from "../UI/Slider/Slider";
import StartStopButton from "../UI/StartStopButton/StartStopButton";
import Dropdown, { Option } from "../UI/Dropdown/Dropdown";
import Controls, { ControlElement } from "../Controls/Controls";
import { capitalize } from "../../helpers";
import { RefreshRounded } from "@mui/icons-material";
import { setSpeed } from "../../store/common-settings-slice";
import SpeedDropdown from "../SpeedDropdown/SpeedDropdown";

const SortControls = () => {
  const sv = useSelector((state: RootState) => state.sortingVisualizer);
  const cs = useSelector((state: RootState) => state.commonSettings);
  const dispatch = useDispatch<AppDispatch>();

  const _reset = () => dispatch(reset());
  const _setArrayLength = (len: number) => dispatch(setArrayLength(len));
  const _setAlgorithm = (algorithm: SortAlgorithm) =>
    dispatch(setAlgorithm(algorithm));
  const _setSpeed = (speed: Speed) => dispatch(setSpeed(speed));
  const _stopSorting = () => dispatch(stopSorting());
  const _startSorting = () => dispatch(startSorting());
  const _setMode = (mode: Mode) => dispatch(setMode(mode));

  const handleChangeArrayLength = (e: ChangeEvent<HTMLInputElement>) => {
    const len: number = parseInt(e.target.value);
    if (len === sv.arrayLength) return;
    _setArrayLength(len);
    _reset();
  };

  const handleChangeMode = (mode: string) => {
    _setMode(mode as Mode);
  };

  const handleChangeAlgorithm = (selected: string) => {
    _setAlgorithm(selected as SortAlgorithm);
    if (sv.isSorted) _reset();
  };


  const algorithmOptions: Option[] = Object.keys(SortAlgorithm).map((a) => {
    let name = a.split("Sort")[0];
    return { value: a, label: `${capitalize(name)} Sort` };
  });

  const algorithmDropdown: ControlElement = {
    element: (
      <Dropdown
        onSelect={handleChangeAlgorithm}
        activeOptionValue={sv.algorithm}
        options={algorithmOptions}
        disabled={sv.isSorting}
        id="sort-algorithms"
        label="Algorithm"
      />
    ),
    disableable: true,
  };

  const arraySizeSlider: ControlElement = {
    element: (
      <Slider
        label="Array Size"
        id="arraySize"
        disabled={sv.isSorting}
        value={sv.arrayLength}
        min={minArrayLength}
        max={maxArrayLength}
        step={arrayLengthStep}
        onChange={handleChangeArrayLength}
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
  
  const modeRadioGroup: ControlElement = {
    element: (
    <Dropdown
  onSelect={handleChangeMode}
  activeOptionValue={sv.mode}
  options={[{value: "bar", label: "Bar"}, {value: "scatter", label: "Scatter"}]}
  id="array-item-mode"
  label="Mode"
/>
    
    ),
    disableable: false,
  };
  const resetButton: ControlElement = {
    element: (
      <button onClick={_reset} disabled={sv.isSorting} className="reset-button">
        <RefreshRounded />
      </button>
    ),
    disableable: true,
  };
  const playButton: ControlElement = {
    element: (
      <StartStopButton
        isOn={sv.isSorting}
        onStart={_startSorting}
        onStop={_stopSorting}
      />
    ),
  };

  return (
    <div className="sorting-controls">
          <Controls
      disabled={sv.isSorting}
      elements={[
        algorithmDropdown,
        arraySizeSlider,
        speedDropdown,
        modeRadioGroup,
        resetButton,
        playButton,
      ]}
    />
    </div>

  );
};

export default SortControls;
