import React, { useEffect, useRef, useState } from "react"
import "./Colors.css"
import { dispatchSelectedColor } from "../../store/pixelDrawing"
import { useDispatch } from "react-redux"
import transparent from "./transparent.png"

function Colors() {
      const knobRed = useRef(0)
      const knobRedPOS = useRef(0)

      const knobGreen = useRef()
      const knobGreenPOS = useRef(0)

      const knobBlue = useRef(0)
      const knobBluePOS = useRef(0)

      const knobAlpha = useRef(0)
      const knobAlphaPOS = useRef(255)

      const leftMarker = useRef()

      const dispatch = useDispatch();
      const [color, setColor] = useState('rgba(0, 0, 0, 0,)')
      const [red, setRed] = useState(0)
      const [green, setGreen] = useState(0)
      const [blue, setBlue] = useState(0)
      const [alpha, setAlpha] = useState(255)

      function stopDrag() {
            document.onmouseup = null; // stop moving when mouse button is released:
            document.onmousemove = null;
      }


      useEffect(() => {
            let leftMarkerPos = leftMarker.current.getBoundingClientRect().left
            // console.log(leftMarkerPos)
            dragKnob(knobRed.current);
            dragKnob(knobGreen.current);
            dragKnob(knobBlue.current);
            dragKnob(knobAlpha.current);


            // let curr_scene = parseInt(currentscene)
            function dragKnob(theKnob) {
                  let xDiff = 0, Xold = 0;
                  function mouseDown(e) {
                        // console.log(knobRed.current, knobRedPOS)
                        e.preventDefault();
                        Xold = (e.clientX);
                        document.onmouseup = stopDrag;
                        document.onmousemove = knobIsDragging;
                  }

                  function knobIsDragging(e) {
                        e.preventDefault();
                        xDiff = Xold - (e.clientX);
                        Xold = (e.clientX);
                        knobRedPOS.current = (knobRed.current.getBoundingClientRect().left - leftMarkerPos)
                        knobGreenPOS.current = (knobGreen.current.getBoundingClientRect().left - leftMarkerPos)
                        knobBluePOS.current = (knobBlue.current.getBoundingClientRect().left - leftMarkerPos)
                        knobAlphaPOS.current = (knobAlpha.current.getBoundingClientRect().left - leftMarkerPos)

                          if ((e.clientX) <= 0 + leftMarkerPos) {
                              stopDrag()
                              theKnob.style.left = `0px`;
                          }
                          else if ((e.clientX) > 252 + leftMarkerPos) {
                              stopDrag()
                              theKnob.style.left = `240px`;
                          }
                          else {
                              theKnob.style.left = (theKnob.offsetLeft - xDiff) + "px";
                          }
                          let adjustAlpha = knobAlphaPOS.current * 0.00392
                          setRed(knobRedPOS.current)
                          setGreen(knobGreenPOS.current)
                          setBlue(knobBluePOS.current)
                          setAlpha(adjustAlpha < 0 ? 0 : adjustAlpha > 1 ? 1 : (adjustAlpha).toFixed(2))
                  }


                  theKnob.onmousedown = mouseDown;
            }
      })





      return (
            <div className="colorsContainer">


                  <div className="nameThisBetter">
                        <div className="leftMarker" ref={leftMarker}></div>
                        <div className="slidersContainer">
                              <div className="slider Red" style={{backgroundImage: `linear-gradient(to right, rgba(0, ${green}, ${blue}, ${alpha}), rgba(255, ${green}, ${blue}, ${alpha}))`}} >
                                    <div className="knob Red" ref={knobRed} id="red" draggable="true">r</div>
                              </div>

                              <div className="slider Green">
                                    <div className="knob Green" ref={knobGreen} id="green" draggable="true"></div>
                              </div>

                              <div className="slider Blue">
                                    <div className="knob Blue" ref={knobBlue} id="blue" draggable="true"></div>
                              </div>

                              <div className="slider Alpha">
                                    <div className="knob Alpha" ref={knobAlpha} id="alpha" draggable="true" style={{left: "240px"}}></div>
                              </div>
                        </div>

                  </div>

                  <div className="theColorContainer">
                        <div className="theColor" style={{backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha})`}}></div>
                        <div style={{backgroundImage: `url(${transparent})`}} className="theColorBackImg"></div>

                  </div>



            </div>
      )
}

export default Colors
