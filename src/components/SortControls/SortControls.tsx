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
import "../UI/Dropdown/Dropdown.scss"
import "./SortControls.scss"
import Slider from "../UI/Slider/Slider";
import StartStopButton from "../UI/StartStopButton/StartStopButton";
import Dropdown, { Option } from "../UI/Dropdown/Dropdown";

const algorithmOptions: Option[] = [
  { value: SortAlgorithm.bubbleSort, label: "Bubble Sort" },
  { value: SortAlgorithm.insertionSort, label: "Insertion Sort" },
  { value: SortAlgorithm.selectionSort, label: "Selection Sort" },
  { value: SortAlgorithm.quickSort, label: "Quick Sort" },
  { value: SortAlgorithm.mergeSort, label: "Merge Sort" },
];

const SortControls: React.FC = () => {
  const sv = useSelector((state: RootState) => state.sortingVisualizer);
  const dispatch = useDispatch<AppDispatch>();

  const _reset = () => dispatch(reset());
  const _setArrayLength = (len: number) => dispatch(setArrayLength(len));
  const _setAlgorithm = (algorithm: SortAlgorithm) => dispatch(setAlgorithm(algorithm));
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

  const handleChangeMode = (e: React.FormEvent<HTMLFieldSetElement>) => {
    let inputEl = e.target as HTMLInputElement;
    _setMode(inputEl.value as Mode);
  };

  const handleChangeAlgorithm = (selected: string) => {
    _setAlgorithm(selected as SortAlgorithm);
    if (sv.isSorted) _reset();
  };

  const handleChangeSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    _setSpeed(parseInt(e.target.value));
  }; 
  

  return (
    <div className="controls-container" data-testid="sv-controls">
      <div className="controls">
        <div
          className={sv.isSorting ? "controls-item disabled" : "controls-item"}
        >
          <label
            className="controls-item__label"
            htmlFor="sort-algorithms-select"
          >
            Algorithm
          </label>
          <Dropdown 
            onSelect={handleChangeAlgorithm}
            activeOptionValue={sv.algorithm}
            options={algorithmOptions}
            disabled={sv.isSorting}
          />
        </div>
        <div className={sv.isSorting ? "controls-item disabled" : "controls-item"}>
          <label className="controls-item__label controls-item__label-arraySize">
            Array size
      
          </label>
          <Slider
            aria-label="Array Size"
            disabled={sv.isSorting}
            value={sv.arrayLength}
            min={minArrayLength}
            max={maxArrayLength}
            step={arrayLengthStep}
            onChange={handleChangeArrayLength}
          />
        </div>
        <div className="controls-item">
          <label className="controls-item__label" htmlFor="speed">
            Speed
          </label>
          <Slider
            aria-label="Speed"
            value={sv.speed}
            name="speed"
            max={maxSpeed}
            min={minSpeed}
            onChange={handleChangeSpeed}
          ></Slider>
        </div>
        <div className="controls-item">
          <fieldset
            className="controls-item__radio-list"
            onChange={handleChangeMode}
            aria-labelledby="mode"
            id="mode"
          >
            <legend className="controls-item__label">Mode</legend>
            <label>
              <input
                type="radio"
                name="mode"
                value="bar"
                className="radio"
                checked={sv.mode === Mode.bar}
              />
              Bars
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="scatter"
                className="radio"
                checked={sv.mode === Mode.scatter}
              />
              Scatter
            </label>
          </fieldset>
        </div>
        <div className="controls-item">
            <StartStopButton 
            isOn={sv.isSorting}
            onStart={_startSorting}
            onStop={_stopSorting}
            onReset={_reset}
        />
              
        </div>
      </div>
    </div>
  );
};

export default SortControls;
