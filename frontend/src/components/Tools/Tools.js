import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { dispatchEditMode, dispatchSelectedColor } from '../../store/pixelDrawing'
import "./Tools.css"

function Tools() {
    const editMode = useSelector(state => state.pixelDrawing.editMode)
    const dispatch = useDispatch();
    const  [menuDropdown, setMenuDropdown] = useState(false)
    const menuTimeOut = useRef('');
    const history = useHistory();


    function setMenuTimeout(){
        menuTimeOut.current = setTimeout(() => {
            setMenuDropdown(false)
        }, 1000);
    }


    return (
        <div className="Tools">
            <div className="toolMenu" onClick={()=> setMenuDropdown(true)}>
                <div >Menu</div>
            </div>


           {menuDropdown &&
           <div className="dropDownToolMenu" onMouseLeave={()=>setMenuTimeout()} onMouseEnter={()=>clearTimeout(menuTimeOut.current)}>
                <div className="toolMenuDropdown--element">Save Drawing</div>
                <div className="toolMenuDropdown--element" onClick={()=> history.push("/")}>Exit</div>
            </div>}


            <div className="editButtons" >
                {/* <div className="left"> */}
                <div className={editMode === "drawingMode" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('drawingMode'))}>&#40;D&#41;raw Mode</div>
                <div className={editMode === "fillMode" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('fillMode'))}>&#40;F&#41;ill Mode</div>
                <div className={editMode === "colorPicker" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('colorPicker'))}>
                    <div>&#40;C&#41;olor</div>
                    <div>Picker</div>
                </div>
                <div className={editMode === "eraseMode" ? "tooldivActive" : "tooldiv"} onClick={() =>[
                    dispatch(dispatchSelectedColor("rgba(0, 0, 0, 0)"))

                    ]}>
                    <div>&#40;E&#41;rase</div>
                </div>
                <div className={editMode === "clearCanvas" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("clearCanvas"))}>
                    <div>Clear Canvas</div>
                    <div>&#40;ctl a&#41;</div>
                </div>
                <div className={editMode === "handleUndo" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("handleUndo"))}>
                    <div> Undo</div>
                    <div>&#40;ctl z&#41;</div>
                </div>
                {/* </div> */}
                {/* <div className="right"> */}
                <div className={editMode === "handleRedo" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("handleRedo"))}>
                    <div> Redo</div>
                    <div>&#40;ctl y&#41;</div>

                </div>
                <div className={editMode === "rectangleMode" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('rectangleMode'))}>&#40;R&#41;ectangle</div>
                <div className={editMode === "zoomIn" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("zoomIn"))}>
                    <div> Zoom In</div>
                    <div>&#40; = &#41;</div>

                </div>
                <div className={editMode === "zoomOut" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("zoomOut"))}>
                    <div> Zoom Out</div>
                    <div>&#40; - &#41;</div>
                </div>

                <div className={editMode === "zoomAll" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("zoomAll"))}>
                    <div> Reset View</div>
                    <div>&#40;ctl a&#41;</div>
                </div>

                <div className={editMode === "printToConsole" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("printToConsole"))}>
                    <div>Print to</div>
                    <div>Console</div>
                </div>

                {/* </div> */}
            </div>
        </div>
    )
}

export default Tools
