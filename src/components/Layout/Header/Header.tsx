import { useLocation } from "react-router-dom";
import {
  PathfindingVisualizerIcon,
  SortingVisualizerIcon,
} from "../../UI/VisualizerIcons";

import "./Header.scss";

const Header = () => {
  const { pathname } = useLocation();

  if (pathname === "/") return null;

  return (
    <header className="nav">
      <nav className="navbar">
        <div>
          {pathname === "/sorting" ? (
            <PathfindingVisualizerIcon />
          ) : (
            <SortingVisualizerIcon />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
