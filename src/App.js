// import { useSelector } from "react-redux";
import "./App.css"
import Colors from "./components/Colors/Colors";
import PixelCanvas from "./components/PixelCanvas"


function App() {
  // const bgColor = useSelector(state => state.pixelDrawing.selectedColor)
  return (
    <div>
      <Colors/>
      <PixelCanvas />
      </div>
  );
}

export default App;
