// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css"
import Colors from "./components/Colors/Colors";
import PixelCanvas from "./components/PixelCanvas"
import { dispatchKeyPressed, dispatchMouseDown } from "./store/pixelDrawing";


function App() {
  // const bgColor = useSelector(state => state.pixelDrawing.selectedColor)
  const dispatch = useDispatch()

  function handleKeyPress(e){
   dispatch(dispatchKeyPressed({"key": e.key, "ctrlKey": e.ctrlKey}))
  }


  return (
    <div
    className="wrapper"
    role="button"
    tabIndex="0"
    onKeyDown={(e) => handleKeyPress(e)}
    onMouseDown={()=> dispatch(dispatchMouseDown(true))}
    onMouseUp={()=> dispatch(dispatchMouseDown(false)) }
    >
      <Colors/>
      <PixelCanvas />
      </div>
  );
}

export default App;
