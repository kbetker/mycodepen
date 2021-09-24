import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dispatchSelectedColor } from "../../store/pixelDrawing"
import "./PixelCanvas.css"
import transparent2 from "./transparent2.png"
import cursor2 from "./cursor2.png"
import colorPicker from "./colorPicker.png"
import bucketFill from "./bucketFill.png"

function PixelCanvas() {
    const dispatch = useDispatch()
    const selectedColor = useSelector(state => state.pixelDrawing.selectedColor)
    const isMouseDown = useSelector(state => state.pixelDrawing.mouseDown)
    const whatKeyPressed = useSelector(state => state.pixelDrawing.keyPressed)
    const [currentCanvas, setCurrentCanvas] = useState([])
    const [editMode, setEditMode] = useState("drawingMode")
    const [undo, setUndo] = useState([[]])
    const [redo, setRedo] = useState([])

    const [rectX, setRectX] = useState(0)
    const [rectY, setRectY] = useState(0)
    const [rectW, setRectW] = useState(0)
    const [rectH, setRectH] = useState(0)
    const [validRectangle, setValidRectangle] = useState(true)


    const NW = useRef("0-0")

    const SE = useRef("0-0")

    const canvas = useRef('')
    const mouseDownXY = useRef([0,0]);
    const mouseUpXY = useRef([0,0]);
    const arrayBg = "rgba(0, 0, 0, 0)"
    const pixel = 20
    const rows = 20
    const columns = 20

    useEffect(()=>{
        let left = canvas.current.getBoundingClientRect().left
        let top = canvas.current.getBoundingClientRect().top
    },[])


    // ======================   Listens for keypress   ======================
    useEffect(()=>{
        if (whatKeyPressed.key === "d") {
            setEditMode('drawingMode')
        } else if (whatKeyPressed.key === "f") {
            setEditMode('fillMode')
        } else if (whatKeyPressed.key === "c") {
            setEditMode('colorPicker')
        }   else if (whatKeyPressed.key === "r") {
            setEditMode('rectangleMode')
        }
        else if (whatKeyPressed.ctrlKey && whatKeyPressed.key === "z") {
            handleUndo()
        }  else if (whatKeyPressed.ctrlKey && whatKeyPressed.key === "y") {
            handleRedo()
        }

    }, [whatKeyPressed])


    // ======================   initializes array to transparent background   ======================
    const initArray = () => {
        let rowsArr = []
        let columnsArr = []
        for (let i = 0; i < rows; i++) { rowsArr.push(arrayBg) }
        for (let j = 0; j < columns; j++) { columnsArr.push(rowsArr) }
        return columnsArr
    }

    //======================   sets currentCanvas to initial array and initializes first color   ======================
    useEffect(() => {
        setCurrentCanvas(initArray())
        dispatch(dispatchSelectedColor("rgba(0, 0, 0, 1.00)"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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

    //======================  helper function to DRY up the code a bit  ======================
    function draw_fill_helper(){
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


    //======================   change bgColor when drawing   ======================
    function changeColor(row, column) {
        let newArr = draw_fill_helper()
        //=== changes value then set the currentCanvas ===
        newArr[row][column] = selectedColor
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
      if ( mouseUpXy[0] - mouseDownXY[0] < 0 ){
          let temp;
          temp = mouseUpXy
          mouseUpXy = mouseDownXY
          mouseDownXY = temp
        }

       let numY = mouseUpXy[0] - mouseDownXY[0];
       let numX = mouseUpXy[1] - mouseDownXY[1];
       let newArr = draw_fill_helper()

       for(let i = 0; i <= numY; i++) {
           for(let j = 0; j <= numX; j++){
               newArr[i + mouseDownXY[0]][mouseUpXy[1] - j] = selectedColor
           }
       }
       setCurrentCanvas(newArr)
    }

    //====================== Handles rectangle outline ======================
    const handleRectangleOutline =(e, add) =>{
        let classNameNW = "NW"
        let classNameSW = "SW"
        let classNameNE = "NE"
        let classNameSE = "SE"

        let northWest = NW.current.id.split("-")
        let southEast = SE.current.id.split("-")

        let columnDiff = southEast[0] - northWest[0]
        let rowDiff = southEast[1] - northWest[1]

        console.log(columnDiff, rowDiff)

        if(columnDiff < -0 && rowDiff < -0){
            classNameNW = "SE"
            classNameSW = "NE"
            classNameNE = "SW"
            classNameSE = "NW"
        }

        if(columnDiff >= 0 && rowDiff < -0){
            classNameNW = "NE"
            classNameSW = "SE"
            classNameNE = "NW"
            classNameSE = "SW"
        }

        if(columnDiff < -0 && rowDiff >= 0){
            classNameNW = "SW"
            classNameSW = "NW"
            classNameNE = "SE"
            classNameSE = "NE"
        }

        let divNW = document.getElementById(NW.current.id)
        let divSW = document.getElementById(`${southEast[0]}-${northWest[1]}`)
        let divNE = document.getElementById(`${northWest[0]}-${southEast[1]}`)
        let divSE = document.getElementById(SE.current.id)

        if(add === "add"){
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




    return (
        <>
            <div className="editButtons" >
                <button onClick={() => setEditMode('drawingMode')}>&#40;D&#41;raw Mode</button>
                <button onClick={() => setEditMode('fillMode')}>&#40;F&#41;ill Mode</button>
                <button onClick={() => setEditMode('colorPicker')}>&#40;C&#41;olor Picker</button>
                <button onClick={() => clearCanvas()}>Clear Canvas</button>
                <button onClick={() => handleUndo()}>Undo</button>
                <button onClick={() => handleRedo()}>Redo</button>
                <button onClick={() => setEditMode('rectangleMode')}>&#40;R&#41;ectangle Tool</button>
                <span style={{ color: "white", marginLeft: "10px" }}>{editMode}</span>
            </div>

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
                onMouseDown={(e) => [
                    (editMode === 'drawingMode' || editMode === "fillMode") && handleHistory,

                ]
                }
            >

                {currentCanvas.map((e, i) =>
                    e.map((e2, j) =>
                        <div
                            className={
                            (editMode === "drawingMode" ||  editMode === "fillMode") ? "pixel"
                            : (editMode === "rectangleMode" && !isMouseDown) ? "rectangleMarkerHover" : undefined
                            // : (editMode === "rectangleMode" && isMouseDown && validRectangle) ? "rectangleMarkerDown" : undefined
                            }
                            id={`${i}-${j}`}
                            key={`key-${i}-${j}`}
                            style={{
                                height: `${pixel}px`,
                                width: `${pixel}px`,
                                backgroundColor: currentCanvas[i][j],
                                borderColor: `${validRectangle ? `white` : `rgba(0,0,0,0)`}`,

                            }}

                            onMouseDown={(e) => [
                                handleHistory(),
                                mouseDownXY.current = [i, j],
                                NW.current = e.target,
                                editMode === "drawingMode" && changeColor(i, j),
                                editMode === "fillMode" && fillFunc(i, j, convertToRGBA(e.target.style.backgroundColor)),
                                editMode === "colorPicker" && dispatch(dispatchSelectedColor(convertToRGBA(e.target.style.backgroundColor))),

                            ]}

                            onMouseLeave={(e) => [

                                isMouseDown && editMode === "rectangleMode" && handleRectangleOutline(e, "remove"),
                            ]
                            }
                            onMouseEnter={(e) => [
                                SE.current = e.target,
                                isMouseDown && editMode === "drawingMode" && changeColor(i, j),
                                isMouseDown && editMode === "rectangleMode" && handleRectangleOutline(e, "add"),
                            ]
                            }
                            onMouseUp={(e) => [
                                mouseUpXY.current = [i, j],
                                editMode === "rectangleMode" && handleRectangle(mouseDownXY.current, mouseUpXY.current),
                            ]}
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
    //         pixelBg[i].style.backgroundColor = `${currentCanvas[arr[0]][arr[1]]}`
    //     }
    // }, [])
