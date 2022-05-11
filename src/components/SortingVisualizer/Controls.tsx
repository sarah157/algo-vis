import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import StopIcon from "@mui/icons-material/Stop";
import {
  maxArrayLength,
  maxSpeed,
  minArrayLength,
  minSpeed,
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

const ALGORITHMS = [
  { id: SortAlgorithm.bubbleSort, label: "Bubble Sort", desc: "" },
  { id: SortAlgorithm.insertionSort, label: "Insertion Sort", desc: "" },
  { id: SortAlgorithm.selectionSort, label: "Selection Sort", desc: "" },
  { id: SortAlgorithm.quickSort, label: "Quick Sort", desc: "" },
  { id: SortAlgorithm.mergeSort, label: "Merge Sort", desc: "" },
];

const Controls: React.FC = () => {
  const sv = useSelector((state: RootState) => state.sortingVisualizer);
  const dispatch = useDispatch<AppDispatch>();

  const _reset = () => dispatch(reset());
  const _setArrayLength = (len: number) => dispatch(setArrayLength(len));
  const _setAlgorithm = (algorithm: SortAlgorithm) =>
    dispatch(setAlgorithm(algorithm));
  const _setSpeed = (speed: number) => dispatch(setSpeed(speed));
  const _stopSorting = () => dispatch(stopSorting());
  const _startSorting = () => dispatch(startSorting());

  const handleChangeArrayLength = (e: ChangeEvent<HTMLInputElement>) => {
    const len: number = parseInt(e.target.value);
    if (len === sv.arrayLength) return;
    _setArrayLength(len);
    _reset();
  };

  const _setMode = (e: SelectChangeEvent) => {
    dispatch(setMode(e.target.value as string));
  };

  const handleChangeAlgorithm = (e: SelectChangeEvent) => {
    _setAlgorithm(e.target.value as SortAlgorithm);
    if (sv.isSorted) _reset();
  };

  const handleChangeSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    _setSpeed(parseInt(e.target.value));
  };

  return (
    <div className="controls-container" data-testid="sv-controls">
      <div className="controls">
        <div
          className={
            sv.isSorting ? "algorithm-controls disabled" : "algorithm-controls"
          }
        >
          <div className="controls__label">
            <span>Algorithm</span>
          </div>
          <FormControl
            sx={{ width: 200, marginTop: 2 }}
            size="small"
            className="algorithm-controls__form"
          >
            <Select
              className="algorithm-controls__menu"
              labelId="algorithm-menu"
              id="algorithm-menu"
              value={sv.algorithm}
              disabled={sv.isSorting}
              onChange={handleChangeAlgorithm}
            >
              {ALGORITHMS.map((algo) => (
                <MenuItem
                  key={algo.id}
                  value={algo.id}
                  className="algorithm-controls__item"
                >
                  {algo.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          className={
            sv.isSorting ? "array-controls disabled" : "array-controls"
          }
        >
          <div className="controls__label array-controls__label">
            <div>Array size</div>
            <button onClick={_reset} disabled={sv.isSorting}>
              <RefreshRoundedIcon
                className="icon-refresh"
                sx={{ fontSize: "1.75em" }}
              />
            </button>
          </div>
          <div className="array-controls__slider">
            <Slider
              className="app-slider"
              aria-label="Array length"
              disabled={sv.isSorting}
              value={sv.arrayLength}
              marks
              min={minArrayLength}
              max={maxArrayLength}
              step={30}
              onChange={(e: any) => handleChangeArrayLength(e)}
            />
          </div>
        </div>
        <div className="speed-controls">
          <div className="controls__label">
            <div>Speed</div>
          </div>
          <div className="speed-controls__slider">
            <Slider
              aria-label="Speed"
              className="app-slider"
              value={sv.speed}
              step={1}
              max={maxSpeed}
              min={minSpeed}
              marks
              onChange={(e: any) => handleChangeSpeed(e)}
            />
          </div>
        </div>
        <div>
          <div className="controls__label">
            <span>Mode</span>
          </div>

          <RadioGroup
            onChange={_setMode}
            row
            aria-labelledby="mode"
            defaultValue={sv.mode}
            name="mode"
          >
            <FormControlLabel value="bar" control={<Radio />} label="Bar" />
            <FormControlLabel
              value="scatter"
              control={<Radio />}
              label="Scatter"
            />
          </RadioGroup>
        </div>
       
      </div> <div className="play-controls">
          <button
            // style={{
            //   backgroundColor: sv.isSorting ? PASTEL_RED : PASTEL_GREEN,
            // }}
            className="play-controls__button"
            onClick={sv.isSorting ? _stopSorting : _startSorting}
          >
           {sv.isSorting ? (
            <StopIcon style={{ fontSize: "50px", }} />
          ) : (
            <PlayArrowIcon
              style={{ fontSize: "50px", }}
            />
          )}
          </button>
        </div>
    </div>
  );
};

export default Controls;
