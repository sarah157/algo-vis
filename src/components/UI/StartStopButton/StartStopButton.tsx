import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import "./StartStopButton.scss";

type StartStopButtonProps = {
  isOn: boolean;
  onStart: () => void;
  onStop: () => void;
};

const StartStopButton = ({
  isOn,
  onStart,
  onStop
}: StartStopButtonProps) => {
  const handleTogglePlay = () => {
    if (isOn) onStop();
    else onStart();
  };

  return (

      <button
        className={isOn ? "stop-button" : "start-button"}
        onClick={handleTogglePlay}
      >
        {isOn ? <StopRoundedIcon /> : <PlayArrowRoundedIcon />}
      </button>
    
  );
};

export default StartStopButton;
