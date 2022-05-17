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
  setArrayLength,
  setSpeed,
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
import RadioGroup from "../UI/RadioGroup/RadioGroup";
import { capitalize } from "../../helpers";

const SortControls = () => {
  const sv = useSelector((state: RootState) => state.sortingVisualizer);
  const dispatch = useDispatch<AppDispatch>();

  const _reset = () => dispatch(reset());
  const _setArrayLength = (len: number) => dispatch(setArrayLength(len));
  const _setAlgorithm = (algorithm: SortAlgorithm) =>
    dispatch(setAlgorithm(algorithm));
  const _setSpeed = (speed: number) => dispatch(setSpeed(speed));
  const _stopSorting = () => dispatch(stopSorting());
  const _startSorting = () => dispatch(startSorting());
  const _setMode = (mode: Mode) => dispatch(setMode(mode));

  const handleChangeArrayLength = (e: ChangeEvent<HTMLInputElement>) => {
    const len: number = parseInt(e.target.value);
    if (len === sv.arrayLength) return;
    _setArrayLength(len);
    _reset();
  };

  const handleChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setMode(e.target.value as Mode);
  };

  const handleChangeAlgorithm = (selected: string) => {
    _setAlgorithm(selected as SortAlgorithm);
    if (sv.isSorted) _reset();
  };

  const handleChangeSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    _setSpeed(parseInt(e.target.value));
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

  const speedSlider: ControlElement = {
    element: (
      <Slider
        label="Speed"
        id="speed"
        value={sv.speed}
        name="speed"
        max={maxSpeed}
        min={minSpeed}
        onChange={handleChangeSpeed}
      ></Slider>
    ),
    disableable: false,
  };

  const modeRadioGroup: ControlElement = {
    element: (
      <RadioGroup
        onChange={handleChangeMode}
        name={{ value: "mode", label: "Mode" }}
        selectedValue={sv.mode}
        options={Object.keys(Mode).map((mode) => {
          return { value: mode, label: capitalize(mode) };
        })}
      />
    ),
    disableable: false,
  };

  const buttonGroups: ControlElement = {
    element: (
      <StartStopButton
        isOn={sv.isSorting}
        onStart={_startSorting}
        onStop={_stopSorting}
        onReset={_reset}
      />
    ),
  };

  return (
    <Controls
      disabled={sv.isSorting}
      elements={[
        algorithmDropdown,
        arraySizeSlider,
        speedSlider,
        modeRadioGroup,
        buttonGroups,
      ]}
    />
  );
};

export default SortControls;
