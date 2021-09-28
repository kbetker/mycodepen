import React, { useEffect, useRef, useState } from "react"
import "./Colors.css"
import { dispatchEditMode, dispatchSelectedColor } from "../../store/pixelDrawing"
import { useDispatch, useSelector } from "react-redux"
import transparent from "./transparent.png"

function Colors() {
      const pickedColor = useSelector(state => state.pixelDrawing.selectedColor)
      const editMode = useSelector(state => state.pixelDrawing.editMode)
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
      const [red, setRed] = useState(0)
      const [green, setGreen] = useState(0)
      const [blue, setBlue] = useState(0)
      const [alpha, setAlpha] = useState(255)



      function stopDrag() {
            document.onmouseup = null; // stop moving when mouse button is released:
            document.onmousemove = null;
      }

      useEffect(() => {
            let grabColors = pickedColor.slice(5, pickedColor.indexOf(")")).split(", ")
            let red = grabColors[0]
            let green = grabColors[1]
            let blue = grabColors[2]
            let alpha = grabColors[3]

            setRed(red)
            knobRedPOS.current = red
            knobRed.current.style.left = `${red}px`

            setGreen(green)
            knobGreenPOS.current = green
            knobGreen.current.style.left = `${green}px`

            setBlue(blue)
            knobBluePOS.current = blue
            knobBlue.current.style.left = `${blue}px`

            setAlpha(alpha)
            let alphaConvert = (alpha / 0.00392).toFixed(2)

            if (alphaConvert > 255) {
                  knobAlphaPOS.current = 255
                  knobAlpha.current.style.left = "255px"
            } else {
                  knobAlphaPOS.current = (alpha / 0.00392).toFixed(2)
                  knobAlpha.current.style.left = `${(alpha / 0.00392).toFixed(2)}px`
            }

      }, [pickedColor])


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
                        else if ((e.clientX) >= 270 + leftMarkerPos) {
                              stopDrag()
                              theKnob.style.left = `255px`;
                        }
                        else {
                              theKnob.style.left = (theKnob.offsetLeft - xDiff) + "px";
                        }
                        let adjustAlpha = knobAlphaPOS.current * 0.00392
                        setRed(knobRedPOS.current < 0 ? 0 : knobRedPOS.current > 255 ? 255 : knobRedPOS.current)
                        setGreen(knobGreenPOS.current < 0 ? 0 : knobGreenPOS.current > 255 ? 255 : knobGreenPOS.current)
                        setBlue(knobBluePOS.current < 0 ? 0 : knobBluePOS.current > 255 ? 255 : knobBluePOS.current)
                        setAlpha(adjustAlpha < 0 ? 0 : adjustAlpha > 1 ? 1.00 : (adjustAlpha).toFixed(2))
                  }
                  theKnob.onmousedown = mouseDown;
            }
      }, [])

      function handleInput(e) {
            if(e.target.id === "alpha"){
                  if(e.target.value > 1){
                        return 1
                  } else if (e.target.value < 0){
                        return 0
                  } else {
                        return e.target.value
                  }
            } else {
                  if(e.target.value > 255) {
                        return 255
                  } else if (e.target.value < 0) {
                        return 0
                  } else {
                        return e.target.value
                  }
            }
      }



      return (
            <div className="colorsContainer">


                  <div className="slidersAndSelectedColor">
                        <div className="leftMarker" ref={leftMarker}></div>
                        <div className="slidersContainer" style={{ backgroundImage: `url(${transparent})` }} onMouseLeave={() => dispatch(dispatchSelectedColor(`rgba(${red}, ${green}, ${blue}, ${alpha})`))}>

                              <div className="sliderAndInput">
                                    <div className="slider"
                                          style={{ backgroundImage: `linear-gradient(to right, rgba(0, ${green}, ${blue}, ${alpha}), rgba(255, ${green}, ${blue}, ${alpha}))` }} >
                                          <div className="knob Red" ref={knobRed} id="red" draggable="true"></div>
                                    </div>
                                    <input
                                          className="sliderInput"
                                          id="red"
                                          onChange={(e) => dispatch(dispatchSelectedColor(`rgba(${handleInput(e)}, ${green}, ${blue}, ${alpha})`))}
                                          value={red}>
                                    </input>
                              </div>

                              <div className="sliderAndInput">
                                    <div className="slider"
                                          style={{ backgroundImage: `linear-gradient(to right, rgba(${red}, 0, ${blue}, ${alpha}), rgba(${red}, 255, ${blue}, ${alpha}))` }}>
                                          <div className="knob Green" ref={knobGreen} id="green" draggable="true"></div>
                                    </div>
                                    <input
                                          className="sliderInput"
                                          id="green"
                                          onChange={(e) => dispatch(dispatchSelectedColor(`rgba(${red}, ${handleInput(e)}, ${blue}, ${alpha})`))}
                                          value={green}>

                                    </input>
                              </div>

                              <div className="sliderAndInput">
                                    <div className="slider"
                                          style={{ backgroundImage: `linear-gradient(to right, rgba(${red}, ${green}, 0, ${alpha}), rgba(${red}, ${green}, 255, ${alpha}))` }}>
                                          <div className="knob Blue" ref={knobBlue} id="blue" draggable="true"></div>
                                    </div>
                                    <input
                                          className="sliderInput"
                                          id="blue"
                                          onChange={(e) => dispatch(dispatchSelectedColor(`rgba(${red}, ${green}, ${handleInput(e)}, ${alpha})`))}
                                          value={blue}>
                                    </input>
                              </div>

                              <div className="sliderAndInput">
                                    <div className="slider"
                                          style={{ backgroundImage: `linear-gradient(to right, rgba(${red}, ${green}, ${blue}, 0), rgba(${red}, ${green}, ${blue}, 1))` }}>
                                          <div className="knob Alpha" ref={knobAlpha} id="alpha" draggable="true" style={{ backgroundImage: `url(${transparent})` }}></div>
                                    </div>
                                    <input className="sliderInput"
                                          id="alpha"
                                          onChange={(e) => dispatch(dispatchSelectedColor(`rgba(${red}, ${green}, ${blue}, ${handleInput(e)})`))}
                                          value={alpha}>
                                    </input>
                              </div>

                        </div>

                  </div>

                  <div className="theColorContainer">
                        <div className="theColor" style={{ backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha})` }}></div>
                        <div style={{ backgroundImage: `url(${transparent})` }} className="theColorBackImg"></div>

                  </div>



            </div>
      )
}

export default Colors
