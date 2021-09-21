import React from "react"
import "./Colors.css"
import { dispatchSelectedColor } from "../../store/pixelDrawing"
import { useDispatch } from "react-redux"

function Colors(){
      const dispatch = useDispatch();

    return(
        <div className="colorsContainer">
              <div className="sliderContainer">

              </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(0, 0, 0)"}} id="rgba(0, 0, 0)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(255, 0, 0)"}} id="rgb(255, 0, 0)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(0, 255, 0)"}} id="rgb(0, 255, 0)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(0, 0, 255)"}} id="rgb(0, 0, 255)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(255, 255, 0)"}} id="rgb(255, 255, 0)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(255, 0, 0)"}} id="rgb(255, 0, 0)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(0, 0, 255)"}} id="rgb(0, 0, 255)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(0, 255, 255)"}} id="rgb(0, 255, 255)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(255, 255, 255)"}} id="rgb(255, 255, 255)"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "rgb(0, 0, 0)"}} id="rgb(0, 0, 0)"></div>
        </div>



    </div>
    )
}

export default Colors
