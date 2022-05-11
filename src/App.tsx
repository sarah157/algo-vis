import "./App.scss";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";

function App() {
  return (
    <div>
      <header>
        <nav>
          <div>Sorting</div>
        </nav>
      </header>
      <main className="main">
        <SortingVisualizer />
      </main>
    </div>
  );
}

export default App;
