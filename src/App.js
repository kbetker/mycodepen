// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css"
import Colors from "./components/Colors/Colors";
import PixelCanvas from "./components/PixelCanvas"
import Tools from "./components/Tools/Tools";
import { dispatchMouseDown, dispatchEditMode, dispatchSelectedColor } from "./store/pixelDrawing";


function App() {
     const dispatch = useDispatch()

     function handleKeyPress(e) {
          if (e.key === "d") {
               dispatch(dispatchEditMode('drawingMode'))
          } else if (e.key === "f") {
               dispatch(dispatchEditMode(('fillMode')))
          } else if (e.key === "c") {
               dispatch(dispatchEditMode(('colorPicker')))
          } else if (e.key === "r") {
               dispatch(dispatchEditMode(('rectangleMode')))
          } else if (e.ctrlKey && e.key === "z") {
               dispatch(dispatchEditMode("undo"))
          } else if (e.key === "e") {
               // dispatch(dispatchEditMode("eraseMode"))
               dispatch(dispatchSelectedColor("rgba(0, 0, 0, 0)"))
          } else if (e.ctrlKey && e.key === "y") {
               dispatch(dispatchEditMode("redo"))
          } else if (e.code === "Equal" || e.key === "+") {
               dispatch(dispatchEditMode("zoomIn"))
          } else if (e.code === "Minus" || e.key === "-") {
               dispatch(dispatchEditMode("zoomOut"))
          } else if (e.ctrlKey && e.key === "a") {
               dispatch(dispatchEditMode("zoomAll"))
          } else if (e.ctrlKey && e.key === "x") {
               dispatch(dispatchEditMode("clearCanvas"))
          }
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
          <div className="wrapper">
               <div className="Tools">
                    <Colors />
                    <Tools />
               </div>
               <PixelCanvas />
          </div>
     );
}

export default App;
