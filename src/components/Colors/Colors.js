import React from "react"
import "./Colors.css"
import { dispatchSelectedColor } from "../../store/pixelDrawing"
import { useDispatch } from "react-redux"

function Colors(){
      const dispatch = useDispatch();

    return(
        <div className="colorsContainer">

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f9ebea"}} id="#f9ebea"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f2d7d5"}} id="#f2d7d5"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e6b0aa"}} id="#e6b0aa"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d98880"}} id="#d98880"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#cd6155"}} id="#cd6155"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#c0392b"}} id="#c0392b"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#a93226"}} id="#a93226"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#922b21"}} id="#922b21"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#7b241c"}} id="#7b241c"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#641e16"}} id="#641e16"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fdedec"}} id="#fdedec"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fadbd8"}} id="#fadbd8"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f5b7b1"}} id="#f5b7b1"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f1948a"}} id="#f1948a"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#ec7063"}} id="#ec7063"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e74c3c"}} id="#e74c3c"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#cb4335"}} id="#cb4335"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#b03a2e"}} id="#b03a2e"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#943126"}} id="#943126"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#78281f"}} id="#78281f"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f5eef8"}} id="#f5eef8"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#ebdef0"}} id="#ebdef0"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d7bde2"}} id="#d7bde2"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#c39bd3"}} id="#c39bd3"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#af7ac5"}} id="#af7ac5"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#9b59b6"}} id="#9b59b6"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#884ea0"}} id="#884ea0"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#76448a"}} id="#76448a"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#633974"}} id="#633974"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#512e5f"}} id="#512e5f"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f4ecf7"}} id="#f4ecf7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e8daef"}} id="#e8daef"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d2b4de"}} id="#d2b4de"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#bb8fce"}} id="#bb8fce"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#a569bd"}} id="#a569bd"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#8e44ad"}} id="#8e44ad"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#7d3c98"}} id="#7d3c98"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#6c3483"}} id="#6c3483"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#5b2c6f"}} id="#5b2c6f"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#4a235a"}} id="#4a235a"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#eaf2f8"}} id="#eaf2f8"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d4e6f1"}} id="#d4e6f1"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#a9cce3"}} id="#a9cce3"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#7fb3d5"}} id="#7fb3d5"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#5499c7"}} id="#5499c7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#2980b9"}} id="#2980b9"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#2471a3"}} id="#2471a3"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#1f618d"}} id="#1f618d"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#1a5276"}} id="#1a5276"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#154360"}} id="#154360"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#ebf5fb"}} id="#ebf5fb"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d6eaf8"}} id="#d6eaf8"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#aed6f1"}} id="#aed6f1"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#85c1e9"}} id="#85c1e9"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#5dade2"}} id="#5dade2"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#3498db"}} id="#3498db"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#2e86c1"}} id="#2e86c1"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#2874a6"}} id="#2874a6"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#21618c"}} id="#21618c"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#1b4f72"}} id="#1b4f72"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e8f8f5"}} id="#e8f8f5"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d1f2eb"}} id="#d1f2eb"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#a3e4d7"}} id="#a3e4d7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#76d7c4"}} id="#76d7c4"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#48c9b0"}} id="#48c9b0"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#1abc9c"}} id="#1abc9c"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#17a589"}} id="#17a589"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#148f77"}} id="#148f77"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#117864"}} id="#117864"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#0e6251"}} id="#0e6251"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e8f6f3"}} id="#e8f6f3"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d0ece7"}} id="#d0ece7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#a2d9ce"}} id="#a2d9ce"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#73c6b6"}} id="#73c6b6"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#45b39d"}} id="#45b39d"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#16a085"}} id="#16a085"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#138d75"}} id="#138d75"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#117a65"}} id="#117a65"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#0e6655"}} id="#0e6655"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#0b5345"}} id="#0b5345"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e9f7ef"}} id="#e9f7ef"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d4efdf"}} id="#d4efdf"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#a9dfbf"}} id="#a9dfbf"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#7dcea0"}} id="#7dcea0"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#52be80"}} id="#52be80"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#27ae60"}} id="#27ae60"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#229954"}} id="#229954"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#1e8449"}} id="#1e8449"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#196f3d"}} id="#196f3d"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#145a32"}} id="#145a32"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#eafaf1"}} id="#eafaf1"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d5f5e3"}} id="#d5f5e3"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#abebc6"}} id="#abebc6"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#82e0aa"}} id="#82e0aa"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#58d68d"}} id="#58d68d"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#2ecc71"}} id="#2ecc71"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#28b463"}} id="#28b463"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#239b56"}} id="#239b56"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#1d8348"}} id="#1d8348"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#186a3b"}} id="#186a3b"></div>
        </div>







        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fef9e7"}} id="#fef9e7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fcf3cf"}} id="#fcf3cf"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f9e79f"}} id="#f9e79f"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f7dc6f"}} id="#f7dc6f"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f4d03f"}} id="#f4d03f"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f1c40f"}} id="#f1c40f"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d4ac0d"}} id="#d4ac0d"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#b7950b"}} id="#b7950b"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#9a7d0a"}} id="#9a7d0a"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#7d6608"}} id="#7d6608"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fef5e7"}} id="#fef5e7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fdebd0"}} id="#fdebd0"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fad7a0"}} id="#fad7a0"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f8c471"}} id="#f8c471"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f5b041"}} id="#f5b041"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f39c12"}} id="#f39c12"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d68910"}} id="#d68910"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#b9770e"}} id="#b9770e"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#9c640c"}} id="#9c640c"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#7e5109"}} id="#7e5109"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fdf2e9"}} id="#fdf2e9"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fae5d3"}} id="#fae5d3"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f5cba7"}} id="#f5cba7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f0b27a"}} id="#f0b27a"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#eb984e"}} id="#eb984e"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e67e22"}} id="#e67e22"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#ca6f1e"}} id="#ca6f1e"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#af601a"}} id="#af601a"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#935116"}} id="#935116"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#784212"}} id="#784212"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fbeee6"}} id="#fbeee6"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f6ddcc"}} id="#f6ddcc"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#edbb99"}} id="#edbb99"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e59866"}} id="#e59866"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#dc7633"}} id="#dc7633"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d35400"}} id="#d35400"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#ba4a00"}} id="#ba4a00"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#a04000"}} id="#a04000"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#873600"}} id="#873600"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#6e2c00"}} id="#6e2c00"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fdfefe"}} id="#fdfefe"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#fbfcfc"}} id="#fbfcfc"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f7f9f9"}} id="#f7f9f9"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f4f6f7"}} id="#f4f6f7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f0f3f4"}} id="#f0f3f4"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#ecf0f1"}} id="#ecf0f1"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d0d3d4"}} id="#d0d3d4"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#b3b6b7"}} id="#b3b6b7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#979a9a"}} id="#979a9a"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#7b7d7d"}} id="#7b7d7d"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f8f9f9"}} id="#f8f9f9"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f2f3f4"}} id="#f2f3f4"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e5e7e9"}} id="#e5e7e9"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d7dbdd"}} id="#d7dbdd"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#cacfd2"}} id="#cacfd2"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#bdc3c7"}} id="#bdc3c7"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#a6acaf"}} id="#a6acaf"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#909497"}} id="#909497"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#797d7f"}} id="#797d7f"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#626567"}} id="#626567"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f4f6f6"}} id="#f4f6f6"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#eaeded"}} id="#eaeded"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d5dbdb"}} id="#d5dbdb"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#bfc9ca"}} id="#bfc9ca"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#aab7b8"}} id="#aab7b8"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#95a5a6"}} id="#95a5a6"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#839192"}} id="#839192"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#717d7e"}} id="#717d7e"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#5f6a6a"}} id="#5f6a6a"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#4d5656"}} id="#4d5656"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#f2f4f4"}} id="#f2f4f4"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#e5e8e8"}} id="#e5e8e8"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#ccd1d1"}} id="#ccd1d1"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#b2babb"}} id="#b2babb"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#99a3a4"}} id="#99a3a4"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#7f8c8d"}} id="#7f8c8d"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#707b7c"}} id="#707b7c"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#616a6b"}} id="#616a6b"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#515a5a"}} id="#515a5a"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#424949"}} id="#424949"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#ebedef"}} id="#ebedef"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d6dbdf"}} id="#d6dbdf"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#aeb6bf"}} id="#aeb6bf"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#85929e"}} id="#85929e"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#5d6d7e"}} id="#5d6d7e"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#34495e"}} id="#34495e"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#2e4053"}} id="#2e4053"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#283747"}} id="#283747"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#212f3c"}} id="#212f3c"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#1b2631"}} id="#1b2631"></div>
        </div>

        <div className="color-column">
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#eaecee"}} id="#eaecee"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#d5d8dc"}} id="#d5d8dc"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#abb2b9"}} id="#abb2b9"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#808b96"}} id="#808b96"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#566573"}} id="#566573"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#2c3e50"}} id="#2c3e50"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#273746"}} id="#273746"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#212f3d"}} id="#212f3d"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#1c2833"}} id="#1c2833"></div>
              <div className="color" onClick={(e) => dispatch(dispatchSelectedColor(e.target.id))} style={{backgroundColor: "#17202a"}} id="#17202a"></div>
        </div>

    </div>
    )
}

export default Colors
