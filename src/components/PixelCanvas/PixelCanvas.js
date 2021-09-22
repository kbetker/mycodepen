import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dispatchSelectedColor } from "../../store/pixelDrawing"
import "./PixelCanvas.css"
import transparent2 from "./transparent2.png"
// import paintCursor from "./paintCursor.png"
import cursor2 from "./cursor2.png"
import colorPicker from "./colorPicker.png"
import bucketFill from "./bucketFill.png"

function PixelCanvas() {
    const dispatch = useDispatch()
    const selectedColor = useSelector(state => state.pixelDrawing.selectedColor)
    const isMouseDown = useRef(false)
    const [colorArray, setColorArray] = useState([])
    const [editMode, setEditMode] = useState("drawingMode")
    const [undo, setUndo] = useState([[]])
    const [redo, setRedo] = useState([])
    const arrayBg = "rgba(0, 0, 0, 0)"
    const pixel = 20
    const rows = 30
    const columns = 30
    // const penSize = 8

    //initializes empty array
    const initArray = () => {
        let rowsArr = []
        let columnsArr = []
        for (let i = 0; i < rows; i++) { rowsArr.push(arrayBg) }
        for (let j = 0; j < columns; j++) { columnsArr.push(rowsArr) }
        return columnsArr
    }

    //set empty array and initializes first color
    useEffect(() => {
        setColorArray(initArray())
        dispatch(dispatchSelectedColor("rgba(0, 0, 0, 1.00)"))
    }, [])


    //if rgb - converts to rgba
    function convertToRGBA(rgb) {
        if (!rgb.startsWith("rgba")) {
            let first = rgb.slice(0, 3)
            let mid = rgb.slice(rgb.indexOf("("), rgb.indexOf(")"))
            return first + "a" + mid + ", 1.00" + ")"
        } else {
            return rgb
        }
    }

    // fill function helper
    function fillColorRecurs(row, column, currBgColor, newArr) {
        // if (row !== null && column !== null) { console.log(currBgColor, "<== currBgColor", selectedColor, "<== Selected Color") }
        if (   row === null
            || column === null
            || newArr[row][column] !== currBgColor
            || selectedColor === currBgColor
        ) return newArr;

        newArr[row][column] = selectedColor
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


    // fill function
    function fillFunc(row, column, currBgColor) {
        //copy array
        let newArr = []
        for (var i = 0; i < colorArray.length; i++) {
            newArr[i] = colorArray[i].slice();
        }
        //calls helper function
        setColorArray(fillColorRecurs(row, column, currBgColor, newArr))
    }


    // change bgColor when drawing
    function changeColor(row, column) {
        let newArr = []
        for (var i = 0; i < colorArray.length; i++) {
            newArr[i] = colorArray[i].slice();
        }
            newArr[row][column] = selectedColor

        setColorArray(newArr)
    }



    // sets mousedown status - allows for continuous drawing
    useEffect(() => {
        document.addEventListener("mousedown", (e) => { isMouseDown.current = true })
        document.addEventListener("mouseup", (e) => { isMouseDown.current = false })
    }, [isMouseDown])

    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            if (e.key === "d") {
                setEditMode('drawingMode')
            } else if (e.key === "f") {
                setEditMode('fillMode')
            } else if (e.key === "c") {
                setEditMode('colorPicker')
            }
        })
    }, [])


    function handleHistory(){
        if(undo.length >= 23){
            let newArr = []
            for (let i = 1; i < undo.length; i++) {
                newArr.push(undo[i]);
            }
            newArr.push(colorArray)
            setUndo(newArr)

        } else {
        setUndo(oldUndo => [...oldUndo, colorArray])
        }
    }

    function handleUndo(){
        if(undo.length <= 1){console.log("End of History"); return}
        let pop = undo.pop()
        setRedo(oldRedo => [...oldRedo, colorArray])
        setColorArray(pop)
        console.log("undo")

    }

    function clearCanvas(){
        // let newEmptyArr = initArray()
        setUndo(oldUndo => [...oldUndo, colorArray])
        setColorArray(initArray())
    }

    function consoleCrap(){
        console.log(colorArray)
        console.log(undo, "<===== UNDO")
        console.log(redo, "+_!+_!+_!+_!+_!+_!+_!+redo")
    }


    return (
        <>
            <div className="editButtons">
                <button onClick={() => setEditMode('drawingMode')}>&#40;D&#41;raw Mode</button>
                <button onClick={() => setEditMode('fillMode')}>&#40;F&#41;ill Mode</button>
                <button onClick={() => setEditMode('colorPicker')}>&#40;C&#41;olor Picker</button>
                <button onClick={() => clearCanvas()}>Clear Canvas</button>
                <button onClick={() => handleUndo()}>Undo</button>
                <button onClick={() => consoleCrap()}>Sanity Check</button>
                <button onClick={() => console.log("woot!")}>Redo</button>
                <span style={{ color: "white", marginLeft: "10px" }}>{editMode}</span>
            </div>

            <div
                className="canvas"
                style={{
                    width: `${rows * pixel}px`,
                    height: `${columns * pixel}px`,
                    backgroundImage: `url(${transparent2})`,
                    cursor:
                        editMode === 'drawingMode' ? `url( ${cursor2}) 10 10, auto`
                            : editMode === 'colorPicker' ? `url( ${colorPicker}) 0 20, auto`
                                : editMode === "fillMode" && `url( ${bucketFill}) 0 20, auto`}}
                onMouseDown={() =>
                    editMode === 'drawingMode' || editMode === "fillMode" && handleHistory
                }

                >

                {colorArray.map((e, i) =>
                    e.map((e2, j) =>
                        <div
                            className="pixel"
                            id={`${i}-${j}`}
                            key={`key-${i}-${j}`}
                            style={{
                                height: `${pixel}px`,
                                width: `${pixel}px`,
                                backgroundColor: colorArray[i][j]
                            }}
                            onMouseDown={(e) => [
                                handleHistory(),
                                editMode === "drawingMode" && changeColor(i, j),
                                editMode === "fillMode" && fillFunc(i, j, convertToRGBA(e.target.style.backgroundColor)),
                                editMode === "colorPicker" && dispatch(dispatchSelectedColor(convertToRGBA(e.target.style.backgroundColor))),
                            ]}

                            onMouseOver={() =>
                                isMouseDown.current && editMode === "drawingMode" && changeColor(i, j)
                            }
                        >
                        </div>
                    )
                )}
            </div>
        </>
    )
}

export default PixelCanvas






    //DON'T DELETE - this will allow you to continue editing a saved picture
    // useEffect(() => {
    //     let pixelBg = document.querySelectorAll(`.pixel`)
    //     for (let i = 0; i < pixelBg.length; i++) {
    //         let arr = pixelBg[i].id.split("-")
    //         pixelBg[i].style.backgroundColor = `${colorArray[arr[0]][arr[1]]}`
    //     }
    // }, [])
