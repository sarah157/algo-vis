import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import Main from "./components/Layout/Main/Main";
import PathfindingVisualizer from "./pages/PathfindingVisualizer";
import SortingVisualizer from "./pages/SortingVisualizer";
import "./styles/_global.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <Routes>
          <Route path="/sorting" element={<SortingVisualizer />}  />
          <Route path="/" element={<PathfindingVisualizer />}  />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
