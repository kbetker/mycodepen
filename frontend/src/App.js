import React, { useState, useEffect } from "react";
// import { Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import "./App.css"
import Colors from "./components/Colors/Colors";
import PixelCanvas from "./components/PixelCanvas"
import Tools from "./components/Tools/Tools";
import { dispatchMouseDown, dispatchEditMode, dispatchSelectedColor } from "./store/pixelDrawing";
import LogInForm from "./components/LogInForm";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route, Switch } from "react-router";
import Home from "./components/Home"
import MyDrawings from "./components/MyDrawings";



function App() {
     const dispatch = useDispatch();
     const [isLoaded, setIsLoaded] = useState(false);
     const editMode = useSelector(state=>state.pixelDrawing.editMode)

     useEffect(() => {
          dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
     }, [dispatch]);


     function handleKeyPress(e) {
          if(editMode === "ignoreKeyPress" || editMode === "saveDrawing") return

          if (e.key === "d" ) {
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

          window.removeEventListener('mousedown', () => { dispatch(dispatchMouseDown(true)) });
          window.removeEventListener('mouseup', () => { dispatch(dispatchMouseDown(false)) });
          window.removeEventListener('keypress', handleKeyPress)

          window.addEventListener('mousedown', () => { dispatch(dispatchMouseDown(true)); });
          window.addEventListener('mouseup', () => { dispatch(dispatchMouseDown(false)) });
          window.addEventListener('keypress', handleKeyPress)

          return () => {
               window.removeEventListener('mousedown', () => { dispatch(dispatchMouseDown(true)) });
               window.removeEventListener('mouseup', () => { dispatch(dispatchMouseDown(false)) });
               window.removeEventListener('keypress', handleKeyPress)
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [editMode])



     return isLoaded && (
          <>

          <Switch>

               <Route path="/login/:demo">
                    <Navigation isLoaded={isLoaded} />
                    <LogInForm />
               </Route>

               <Route path="/login">
                    <Navigation isLoaded={isLoaded} />
                    <LogInForm />
               </Route>

               <Route path="/signup">
                    <Navigation isLoaded={isLoaded} />
                    <SignupFormPage />
               </Route>


               <Route path="/mydrawings">
                    <Navigation isLoaded={isLoaded} />
                    <MyDrawings />
               </Route>

               <Route path="/pixelpad/:id">
                    <div className="wrapper">

                              <Tools />
                         <PixelCanvas />
                              <Colors />
                    </div>
               </Route>


               <Route path="/pixelpad/">
                    <div className="wrapper">

                              <Tools />
                         <PixelCanvas />
                              <Colors />
                    </div>
               </Route>

               <Route path="/">
                     <Navigation isLoaded={isLoaded} />
                    <Home />
               </Route>

          </Switch>

          </>
     );
}

export default App;
