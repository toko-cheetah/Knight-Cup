import "./App.css";
import LeftSide from "./Components/LeftSide";
import GetStarted from "./Components/GetStarted";

function App() {
  return (
    <div id="app">
      <LeftSide />

      <div id="right-side">
        <GetStarted />
      </div>
    </div>
  );
}

export default App;
