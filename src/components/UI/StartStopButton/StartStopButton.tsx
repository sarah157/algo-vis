import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import "./StartStopButton.scss";

interface StartStopButtonProps {
  isOn: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const StartStopButton: React.FC<StartStopButtonProps> = ({
  isOn,
  onStart,
  onStop,
  onReset
}) => {

  const handleTogglePlay = () => {
    if (isOn) onStop();
    else onStart();
  };

  return (
      <div className="button-controls">
     <button onClick={onReset} disabled={isOn} className="reset-button">
              <RefreshRoundedIcon />
            </button> 
     
    <button
      className={isOn ? "stop-button" : "start-button"}
      onClick={handleTogglePlay}
    >
      {isOn ? (
        <StopRoundedIcon />
      ) : (
        <PlayArrowRoundedIcon />
      )}
    </button> 
    </div>
  );
};

export default StartStopButton;
