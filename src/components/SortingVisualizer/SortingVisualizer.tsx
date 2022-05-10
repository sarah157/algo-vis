import { useEffect, useState } from "react";

import { useMediaQuery } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

import Controls from "./Controls";
import ArrayContainer from "./ArrayContainer";

const SortingVisualizer: React.FC = () => {


  return (
    <div className="sorting-visualizer">
      <header className="header">
        <div className="header__title">
          <h1>Sorting Visualizer</h1>
        </div>
      </header>
      <main className="main">
         <Controls />
        <ArrayContainer />
      </main>
    </div>
  );
}

export default SortingVisualizer;