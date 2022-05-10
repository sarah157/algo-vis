import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
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
  const _setAlgorithm = (algorithm: SortAlgorithm) => dispatch(setAlgorithm(algorithm));
  const _setSpeed = (speed: number) => dispatch(setSpeed(speed));
  const _stopSorting = () => dispatch(stopSorting());
  const _startSorting = () => dispatch(startSorting());

  const handleChangeArrayLength = (e: ChangeEvent<HTMLInputElement>) => {
    const len: number = parseInt(e.target.value);
    if (len === sv.arrayLength) return;
    _setArrayLength(len);
    _reset();
  }

  const handleChangeAlgorithm = (e: SelectChangeEvent) => {
    _setAlgorithm(e.target.value as SortAlgorithm);
    if (sv.isSorted) _reset();
  };

  const handleChangeSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    _setSpeed(parseInt(e.target.value));
  }

  return (
    <div className="controls" data-testid="sv-controls">
      <div className="algorithm-controls">
        <FormControl
          sx={{ width: 200 }}
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
        className={sv.isSorting ? "array-controls disabled" : "array-controls"}
      >
        <div className="array-controls__label">
          <div>Array size</div>
          <button onClick={_reset} disabled={sv.isSorting}>
            <RefreshRoundedIcon className="icon-refresh" sx={{ fontSize: "1.75em" }} />
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
          <div className="slider-label">
            <span>{minArrayLength}</span>
            <span>{maxArrayLength}</span>
          </div>
        </div>
      </div>
      <div className="speed-controls">
        <div className="speed-controls__label">
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
          <div className="speed-controls__slider-label slider-label">
            <span>🐢</span>
            <span>⚡</span>
          </div>
        </div>
      </div>
      <div className="play-controls">
        <div className="play-controls__label">
          <span>{sv.isSorting ? "Stop" : "Sort"}</span>
        </div>
        <button
          className="controls-button"
          onClick={sv.isSorting ? _stopSorting : _startSorting}
        >
          {sv.isSorting ? (
            <StopRoundedIcon style={{ fontSize: "50px", color: "red" }} />
          ) : (
            <PlayArrowRoundedIcon
              style={{ fontSize: "50px", color: "green" }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;
