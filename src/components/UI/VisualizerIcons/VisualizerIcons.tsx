import BarChartIcon from "@mui/icons-material/BarChart";
import GridOnIcon from "@mui/icons-material/GridOn";
import { Link } from "react-router-dom";
import "./VisualizerIcons.scss";

type VisualizerIconProps = {
  isHomePage?: boolean; // returns larger icon if used in home page (VisualizerSelector.tsx)
};

export const SortingVisualizerIcon = ({ isHomePage }: VisualizerIconProps) => (
  <Link to="/sorting" className="vis-icon">
    <BarChartIcon style={{ fontSize: isHomePage ? "5em" : "2em" }} />
    {isHomePage && <div>Sorting</div>}
  </Link>
);

export const PathfindingVisualizerIcon = ({
  isHomePage,
}: VisualizerIconProps) => (
  <Link to="/pathfinding" className="vis-icon">
    <GridOnIcon style={{ fontSize: isHomePage ? "5em" : "1.5em" }} />
    {isHomePage && <div>Pathfinding</div>}
  </Link>
);
