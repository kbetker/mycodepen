import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { dispatchEditMode, dispatchSelectedColor, dispatchHideTools } from '../../store/pixelDrawing'
import { useParams } from "react-router"
import "./Tools.css"

function Tools() {
    const editMode = useSelector(state => state.pixelDrawing.editMode)
    const hideTools = useSelector(state => state.pixelDrawing.hideTools.tools)
    const dispatch = useDispatch();
    const [menuDropdown, setMenuDropdown] = useState(false)
    const menuTimeOut = useRef('');
    const history = useHistory();
    const [continueEdit, setContinueEdit] = useState(false)
    const { id } = useParams()


    function setMenuTimeout(time) {
        menuTimeOut.current = setTimeout(() => {
            setMenuDropdown(false)
        }, time);
    }

     function handleSave(){
        setMenuDropdown(false)
        //  dispatch(dispatchEditMode("zoomSave"))
         dispatch(dispatchEditMode("saveDrawing"))
    }

     function handleUpdate(){
        setMenuDropdown(false)
        // await dispatch(dispatchEditMode("zoomSave"))
         dispatch(dispatchEditMode("updateDrawing"))
    }


    useEffect(() => {
        if (id) {
            setContinueEdit(true)
        }
    }, [id])

    return (
        <div className="Tools" style={{ height: `${hideTools ? "25px" : "90px"}` }}>

            {hideTools &&
                <div
                    className="showHideButton"
                    onClick={() => dispatch(dispatchHideTools({ "tools": false }))}
                    style={{ height: "21px", width: "150px" }}>&#9660;
                </div>}
            {!hideTools &&
                <div
                    className="showHideButton"
                    onClick={() => dispatch(dispatchHideTools({ "tools": true }))}
                    style={{ height: "86px", width: "25px" }}> &#9650;
                </div>}


            <div className="toolMenu" onClick={() => [setMenuDropdown(true), setMenuTimeout(3000)]}>
                <div >Menu</div>
            </div>


            {menuDropdown &&
                <div className="dropDownToolMenu" style={{ top: `${hideTools ? "41px" : "107px"}` }} onMouseLeave={() => setMenuTimeout(1000)} onMouseEnter={() => clearTimeout(menuTimeOut.current)}>
                    {continueEdit && <div className="toolMenuDropdown--element" onClick={()=>handleUpdate()}>Save Drawing</div>}
                    <div className="toolMenuDropdown--element" onClick={()=>handleSave()}>{continueEdit ? "Save as New..." : "Save Drawing"}</div>
                    <div className="toolMenuDropdown--element" onClick={() => [dispatch(dispatchEditMode("ignoreKeyPress")), history.push("/mydrawings")]}>Exit</div>
                </div>}


            <div className="editButtons" style={{ display: `${hideTools ? "none" : "flex"}` }} >
                {/* <div className="left"> */}
                <div className={editMode === "drawingMode" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('drawingMode'))}>&#40;D&#41;raw Mode</div>
                <div className={editMode === "fillMode" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('fillMode'))}>&#40;F&#41;ill Mode</div>

                <div className={editMode === "colorPicker" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('colorPicker'))}>
                    <div>&#40;C&#41;olor</div>
                    <div>Picker</div>
                </div>

                <div className={editMode === "eraseMode" ? "tooldivActive" : "tooldiv"} onClick={() => [
                    dispatch(dispatchSelectedColor("rgba(0, 0, 0, 0)")), dispatch(dispatchEditMode("drawingMode"))]
                    }>
                    <div>&#40;E&#41;rase</div>
                </div>
                <div className={editMode === "rectangleMode" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('rectangleMode'))}>&#40;R&#41;ectangle</div>
                <div className={editMode === "rectangleLineMode" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode('rectangleLineMode'))}>&#40;H&#41;ollow <div>Rectangle</div></div>
                <div className={editMode === "clearCanvas" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("clearCanvas"))}>
                    <div>Clear Canvas</div>
                    <div>&#40;ctrl x&#41;</div>
                </div>
                <div className={editMode === "handleUndo" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("undo"))}>
                    <div> Undo</div>
                    <div>&#40;ctrl z&#41;</div>
                </div>

                <div className={editMode === "handleRedo" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("redo"))}>
                    <div> Redo</div>
                    <div>&#40;ctrl y&#41;</div>
                </div>

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
                    <div>&#40;ctrl a&#41;</div>
                </div>

                <div className={editMode === "backupDrawing" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("backupDrawing"))}>
                    <div>Backup</div>
                    <div>Drawing</div>
                </div>

                <div className={editMode === "restoreBackup" ? "tooldivActive" : "tooldiv"} onClick={() => dispatch(dispatchEditMode("restoreBackup"))}>
                    <div>Restore</div>
                    <div>Backup</div>
                </div>

                {/* </div> */}
            </div>
        </div>
    )
}

export default Tools
