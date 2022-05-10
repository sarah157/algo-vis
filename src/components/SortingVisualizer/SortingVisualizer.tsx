import { useEffect, useState } from "react";

import { useMediaQuery } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

import Controls from "./Controls";
import ArrayContainer from "./ArrayContainer";

const SortingVisualizer: React.FC = () => {
  const isSmallDevice = useMediaQuery("(max-width:768px)");
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    setShowControls(!isSmallDevice);
  }, [isSmallDevice]);

  const toggleShowControls = () => setShowControls((prev) => !prev);

  const closeControls = () => {
    if (isSmallDevice) {
      setShowControls(false);
    }
  };

  return (
    <div className="sorting-visualizer">
      <header className="header">
        <button className="header__settings" onClick={toggleShowControls}>
          {showControls ? (
            <CloseIcon fontSize="large" />
          ) : (
            <SettingsIcon fontSize="large" />
          )}
        </button>
        <div className="header__title">
          <h1>Sorting Visualizer</h1>
        </div>
      </header>
      <main className="main">
        {showControls && <Controls onPlay={closeControls} />}
        {!showControls && <div>hello</div>}
        <ArrayContainer />
      </main>
    </div>
  );
}

export default SortingVisualizer;