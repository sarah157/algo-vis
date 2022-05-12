import Header from "./components/Layout/Header/Header";
import Main from "./components/Layout/Main/Main";
import SortingVisualizer from "./pages/SortingVisualizer";
import "./styles/_global.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <SortingVisualizer />
      </Main>
    </div>
  );
}

export default App;
