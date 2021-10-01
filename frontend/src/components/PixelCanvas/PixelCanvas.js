import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dispatchEditMode, dispatchSelectedColor, fetchEditMyDrawing } from "../../store/pixelDrawing"
import "./PixelCanvas.css"
import transparent2 from "./transparent2.png"
import cursor2 from "./cursor2.png"
import colorPicker from "./colorPicker.png"
import bucketFill from "./bucketFill.png"
import { dispatchPostDrawing } from "../../store/pixelDrawing"
import { useParams, useHistory } from "react-router"

function PixelCanvas() {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedColor = useSelector(state => state.pixelDrawing.selectedColor)
    const isMouseDown = useSelector(state => state.pixelDrawing.mouseDown)
    const editMode = useSelector(state => state.pixelDrawing.editMode)
    const user = useSelector(state => state.session.user)
    const editDrawing = useSelector(state => state.pixelDrawing.drawing)
    const [currentCanvas, setCurrentCanvas] = useState([])
    const [undo, setUndo] = useState([[]])
    const [redo, setRedo] = useState([])
    const [drawingName, setDrawingName] = useState('')
    const { id } = useParams()
    // const [saveDrawing, setSaveDrawing] = useState('')

    const NW = useRef("0-0")
    const SE = useRef("0-0")

    const canvas = useRef('')
    const mouseDownXY = useRef([0, 0]);
    const mouseUpXY = useRef([0, 0]);
    const arrayBg = "rgba(0, 0, 0, 0)"
    const [pixel, setPixel] = useState(13)
    const rows = 60
    const columns = 35




    // ======================   initializes array to transparent background   ======================
    const initArray = () => {
        let rowsArr = []
        let columnsArr = []
        for (let i = 0; i < rows; i++) { rowsArr.push(arrayBg) }
        for (let j = 0; j < columns; j++) { columnsArr.push(rowsArr) }
        return columnsArr
    }

    //======================   sets currentCanvas to initial array and initializes first color and selects drawing tool   ======================
    useEffect(() => {
        setCurrentCanvas(initArray())
        dispatch(dispatchSelectedColor("rgba(0, 0, 0, 1.00)"))
        dispatch(dispatchEditMode("drawingMode"))

        if (id) {
            dispatch(fetchEditMyDrawing(parseInt(id)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function makeCanvasArray(theCanvas) {
        let newArr = [[]]
        try {
            return JSON.parse(theCanvas)
            // newArr = JSON.parse(canvas_array)

        }
        catch (err) {
            console.log(err)
        }
        return newArr
    }

    useEffect(() => {
        if (id) {
            setCurrentCanvas(makeCanvasArray(editDrawing.canvas_array))
            setDrawingName(editDrawing.name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editDrawing])


    //======================  converts to rgba if not already  ======================
    function convertToRGBA(color) {
        if (!color.startsWith("rgba")) {
            let first = color.slice(0, 3)
            let mid = color.slice(color.indexOf("("), color.indexOf(")"))
            return `${first}a${mid}, 1.00)`
        } else {
            return color
        }
    }

    //======================   fill function helper   ======================
    function fillColorRecurs(row, column, currBgColor, newArr) {
        //=== edge cases and base case ===
        if (row === null
            || column === null
            || newArr[row][column] !== currBgColor
            || convertToRGBA(selectedColor) === currBgColor
        ) return newArr;


        newArr[row][column] = convertToRGBA(selectedColor)
        let up = row - 1 >= 0 ? row - 1 : null
        let down = row + 1 < newArr.length ? row + 1 : null
        let left = column - 1 >= 0 ? column - 1 : null
        let right = column + 1 < newArr[row].length ? column + 1 : null

        fillColorRecurs(up, column, currBgColor, newArr)
        fillColorRecurs(down, column, currBgColor, newArr)
        fillColorRecurs(row, left, currBgColor, newArr)
        fillColorRecurs(row, right, currBgColor, newArr)
        return newArr
    }

    //======================  helper function to DRY up the code a bit  ======================
    function draw_fill_helper() {
        //=== resets redo history ===
        setRedo([])

        //=== retruns a copy of the  array ===
        let newArr = []
        for (var i = 0; i < currentCanvas.length; i++) {
            newArr[i] = currentCanvas[i].slice();
        }
        return newArr
    }


    //======================  fill function   ======================
    function fillFunc(row, column, currBgColor) {
        //=== calls helper function ===
        setCurrentCanvas(fillColorRecurs(row, column, currBgColor, draw_fill_helper()))
    }


    //======================   change bgColor when drawing REFACTORED   ======================
    function changeColorArray() {
        let newArr = draw_fill_helper()
        //=== changes value then set the currentCanvas ===
        let pixels = document.querySelectorAll(".pixel")
        for (let i = 0; i < pixels.length; i++) {
            let id = pixels[i].id.split("-")
            newArr[id[0]][id[1]] = convertToRGBA(pixels[i].style.backgroundColor)
        }
        setCurrentCanvas(newArr)
    }


    //======================   Records History   ======================
    function handleHistory() {
        if (undo.length >= 30) {
            let newArr = []
            for (let i = 1; i < undo.length; i++) {
                newArr.push(undo[i]);
            }
            newArr.push(currentCanvas)
            setUndo(newArr)

        } else {
            setUndo(oldUndo => [...oldUndo, currentCanvas])
        }
    }

    //====================== Undo ======================
    function handleUndo() {
        if (undo.length <= 1) { console.log("End of History"); return }
        let pop = undo.pop()
        setRedo(oldRedo => [...oldRedo, currentCanvas])
        setCurrentCanvas(pop)
    }

    //====================== Redo ======================
    function handleRedo() {
        if (redo.length === 0) { console.log("End of History"); return }
        let pop = redo.pop();
        setUndo(oldRedo => [...oldRedo, currentCanvas])
        setCurrentCanvas(pop)
    }

    //====================== Clears Canvas ======================
    function clearCanvas() {
        setUndo(oldUndo => [...oldUndo, currentCanvas])
        setCurrentCanvas(initArray())
    }


    //====================== Fills in the rectangle ======================
    const handleRectangle = (mouseDownXY, mouseUpXy) => {
        let downX = mouseDownXY[0]
        let downY = mouseDownXY[1]
        let upX = mouseUpXy[0]
        let upY = mouseUpXy[1]

        if (upX - downX < -0 && upY - downY < -0) {
            [downX, downY, upX, upY] = [upX, upY, downX, downY]
        }

        else if (upX - downX >= 0 && upY - downY < -0) {
            [downY, upY] = [upY, downY]
        }

        else if (upX - downX < -0 && upY - downY >= 0) {
            [downX, upX] = [upX, downX]
        }

        let numY = upX - downX;
        let numX = upY - downY;
        let newArr = draw_fill_helper()

        for (let i = 0; i <= numY; i++) {
            for (let j = 0; j <= numX; j++) {
                newArr[i + downX][upY - j] = selectedColor
            }
        }
        setCurrentCanvas(newArr)
    }

    //====================== Handles rectangle outline ======================
    const handleRectangleOutline = (e, add) => {
        let classNameNW = "NW"
        let classNameSW = "SW"
        let classNameNE = "NE"
        let classNameSE = "SE"

        let northWest = NW.current.id.split("-")
        let southEast = SE.current.id.split("-")

        let columnDiff = southEast[0] - northWest[0]
        let rowDiff = southEast[1] - northWest[1]

        if (columnDiff < -0 && rowDiff < -0) {
            classNameNW = "SE"
            classNameSW = "NE"
            classNameNE = "SW"
            classNameSE = "NW"
        }

        if (columnDiff >= 0 && rowDiff < -0) {
            classNameNW = "NE"
            classNameSW = "SE"
            classNameNE = "NW"
            classNameSE = "SW"
        }

        if (columnDiff < -0 && rowDiff >= 0) {
            classNameNW = "SW"
            classNameSW = "NW"
            classNameNE = "SE"
            classNameSE = "NE"
        }

        let divNW = document.getElementById(NW.current.id)
        let divSW = document.getElementById(`${southEast[0]}-${northWest[1]}`)
        let divNE = document.getElementById(`${northWest[0]}-${southEast[1]}`)
        let divSE = document.getElementById(SE.current.id)

        if (add === "add") {
            divSW.classList.add(classNameSW)
            divNE.classList.add(classNameNE)
            divNW.classList.add(classNameNW)
            divSE.classList.add(classNameSE)

        } else {
            divSW.classList.remove(classNameSW)
            divNE.classList.remove(classNameNE)
            divNW.classList.remove(classNameNW)
            divSE.classList.remove(classNameSE)
        }
    }

    //====================== Handles Zoom ======================
    function handleZoom(method) {
        if (method === "zoomIn" && pixel <= 50) {
            setPixel(pixel => pixel + 1)
            dispatch(dispatchEditMode(''))
        } else if (method === "zoomOut" && pixel >= 3) {
            setPixel(pixel => pixel - 1)
            dispatch(dispatchEditMode(''))
        } else if (method === "zoomAll") {
            setPixel(13)
        } else if (method === "zoomSave") {
            setPixel(10)
        } else {
            return
        }
    }

    // thanks CesMak: https://gist.github.com/CesMak
    // from GitHub https://gist.github.com/liabru/11263260
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(text)));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // Start file download.


    useEffect(() => {
        if (editMode === "undo") {
            handleUndo()
            dispatch(dispatchEditMode(''))
        };
        if (editMode === "redo") {
            handleRedo()
            dispatch(dispatchEditMode(''))
        };
        editMode === "clearCanvas" && clearCanvas();
        editMode === "printToConsole" && download("hello.txt", `${currentCanvas}`);
        if (editMode.startsWith("zoom")) {
            handleZoom(editMode)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode])

    async function handelSubmit(e) {
        e.preventDefault()


        let canvas_array = await JSON.stringify(currentCanvas)
        const payload = {
            "owner_id": user.id,
            "name": drawingName,
            canvas_array
        }
        let data = await dispatch(dispatchPostDrawing(payload))
       if(data.errors){
           alert(data.errors)
       } else{
           dispatch(dispatchEditMode("drawingMode"))
           history.push(`/pixelpad/${data.id}`)
       }
    }

    return (
        <div className="canvasWrapper">
            {(editMode === "saveDrawing" || editMode === "updateDrawing") &&
                <div className="saveFormContainer">
                    <form onSubmit={handelSubmit} className="form saveForm">
                        <div className="formElement">Name</div>
                        <input className="formInput formElement" value={drawingName} onChange={(e) => setDrawingName(e.target.value)}></input>
                        <button type="submit" className="formButton formElement">{editMode === "saveDrawing" ? "Save as..." : "Save Drawing"}</button>
                        <button className="formButton formElement" onClick={() => dispatch(dispatchEditMode(""))}>Cancel</button>
                    </form>
                </div>
            }
            <div
                className="canvas"
                ref={canvas}
                style={{
                    width: `${rows * pixel}px`,
                    height: `${columns * pixel}px`,
                    backgroundImage: `url(${transparent2})`,
                    cursor:
                        editMode === 'drawingMode' ? `url( ${cursor2}) 10 10, auto`
                            : editMode === 'colorPicker' ? `url( ${colorPicker}) 0 20, auto`
                                : editMode === "fillMode" ? `url( ${bucketFill}) 0 20, auto`
                                    : editMode === "rectangleMode" && `none`
                }}
            // onMouseDown={(e) => [
            //     (editMode === 'drawingMode' || editMode === "fillMode") && handleHistory(),

            // ]
            // }
            >

                {currentCanvas.map((e, i) =>
                    e.map((e2, j) =>
                        <div
                            className={
                                (editMode === "drawingMode" || editMode === "fillMode") ? "pixel"
                                    : (editMode === "rectangleMode" && !isMouseDown) ? "rectangleMarkerHover" : undefined
                            }
                            id={`${i}-${j}`}
                            key={`key-${i}-${j}`}
                            style={{
                                height: `${pixel}px`,
                                width: `${pixel}px`,
                                backgroundColor: currentCanvas[i][j],
                            }}

                            onMouseDown={(e) => [
                                handleHistory(),
                                mouseDownXY.current = [i, j],
                                NW.current = e.target,
                                editMode === "drawingMode" && (e.target.style.backgroundColor = `${convertToRGBA(selectedColor)}`),
                                editMode === "fillMode" && fillFunc(i, j, convertToRGBA(e.target.style.backgroundColor)),
                                editMode === "colorPicker" && dispatch(dispatchSelectedColor(convertToRGBA(e.target.style.backgroundColor))),
                            ]}

                            onMouseLeave={(e) => [
                                isMouseDown && editMode === "rectangleMode" && handleRectangleOutline(e, "remove"),
                            ]
                            }

                            onMouseEnter={(e) => [
                                SE.current = e.target,
                                isMouseDown && editMode === "drawingMode" && (e.target.style.backgroundColor = `${convertToRGBA(selectedColor)}`),
                                isMouseDown && editMode === "rectangleMode" && handleRectangleOutline(e, "add"),
                            ]
                            }

                            onMouseUp={(e) => [
                                mouseUpXY.current = [i, j],
                                editMode === "drawingMode" && changeColorArray(),
                                editMode === "rectangleMode" && handleRectangle(mouseDownXY.current, mouseUpXY.current),
                            ]}
                        >

                        </div>

                    )
                )}


            </div>
        </div>
    )
}

export default PixelCanvas
