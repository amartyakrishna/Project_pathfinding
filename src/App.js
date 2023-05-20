import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer.jsx";
import {PopUpBox} from "./PathfindingVisualizer/Popupbox/popupbox.jsx";


function App() {
  return (
    <div className="App">
      <PathfindingVisualizer></PathfindingVisualizer>
      <div className="PopUp">
        <PopUpBox />
      </div>
    </div>
    
  );
}

export default App;
