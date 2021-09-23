// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css"
import Colors from "./components/Colors/Colors";
import PixelCanvas from "./components/PixelCanvas"
import { dispatchKeyPressed, dispatchMouseDown } from "./store/pixelDrawing";


function App() {
  const dispatch = useDispatch()

  function handleKeyPress(e) {
    dispatch(dispatchKeyPressed({ "key": e.key, "ctrlKey": e.ctrlKey }))
  }


  useEffect(() => {
    window.addEventListener('mousedown', () => { dispatch(dispatchMouseDown(true)); });
    window.addEventListener('mouseup', () => { dispatch(dispatchMouseDown(false)) });
    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('mousedown', () => { dispatch(dispatchMouseDown(true)) });
      window.removeEventListener('mouseup', () => { dispatch(dispatchMouseDown(false)) });
      window.removeEventListener('keypress', handleKeyPress)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <div
      className="wrapper"
    // role="button"
    // tabIndex="0"
    // onKeyDown={(e) => handleKeyPress(e)}
    // onMouseDown={()=> [dispatch(dispatchMouseDown(true)), console.log("click")]}
    // onMouseUp={()=> [dispatch(dispatchMouseDown(false)), console.log("unClick")] }
    >
      <Colors />
      <PixelCanvas />
    </div>
  );
}

export default App;
