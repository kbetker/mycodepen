import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dispatchSelectedColor } from "../../store/pixelDrawing"
import "./PixelCanvas.css"

function PixelCanvas() {
    const dispatch = useDispatch()
    const selectedColor =  useSelector(state => state.pixelDrawing.selectedColor)
    const isMouseDown = useRef(false)
    const [colorArray, setColorArray] = useState([])
    const [editMode, setEditMode] = useState("drawingMode")
    const arrayBg = "rgba(0, 0, 0, 0)"
    const pixel = 28
    const rows = 10
    const columns = 10

    //initializes empty array
    const initArray = () => {
        let rowsArr = []
        let columnsArr = []
        for (let i = 0; i < rows; i++) { rowsArr.push(arrayBg) }
        for (let j = 0; j < columns; j++) { columnsArr.push(rowsArr) }
        return columnsArr
    }

    useEffect(() => {
        setColorArray(initArray())
        dispatch(dispatchSelectedColor("#000000"))
    }, [])


    // fill function helper
    function fillColorRecurs(row, column, currBgColor, newArr){

        if(row !== null && column !== null){
            console.log( newArr[row][column],currBgColor, "In Fill Recurs")

        }


        if(row === null || column === null || newArr[row][column] !== currBgColor) return newArr;
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
    function fillFunc(row, column, currBgColor){
        console.log(currBgColor, "<== FillFunc")
        // copies array
        let newArr = []
        for (var i = 0; i < colorArray.length; i++){
            newArr[i] = colorArray[i].slice();
        }
        setColorArray(fillColorRecurs(row, column, currBgColor, newArr))
    }


    // change bgColor when drawing
    function changeColor(row, column){
        let newArr = []
        for (var i = 0; i < colorArray.length; i++){
            newArr[i] = colorArray[i].slice();
        }
        newArr[row][column] = selectedColor
        setColorArray(newArr)
        // console.log(colorArray)
    }



    //sets mousedown status - allows for continuous drawing
    useEffect(() => {
        document.addEventListener("mousedown", (e) => { isMouseDown.current = true })
        document.addEventListener("mouseup", (e) => { isMouseDown.current = false })
    }, [isMouseDown])


    return (
        <>
        <div className="editButtons">
            <button onClick={() => setEditMode('drawingMode')}>Draw Mode</button>
            <button onClick={() => setEditMode('fillMode')}>Fill Mode</button>
            <span style={{color: "white", marginLeft: "10px"}}>{editMode}</span>
        </div>

        <div
            className="canvas"
            style={{
                width: `${rows * pixel}px`,
                height: `${columns * pixel}px`
            }}>

            {colorArray.map((e, i) =>
                e.map((e2, j) =>
                    <div
                        className="pixel"
                        id={`${i}-${j}`}
                        key={`key-${i}-${j}`}
                        style={{
                            height: `${pixel}px`,
                            width: `${pixel}px`,
                            backgroundColor: colorArray[i][j]}}
                        onMouseDown={(e) => [
                            editMode==="drawingMode" && changeColor(i, j),
                            editMode==="fillMode" && fillFunc(i, j, e.target.style.backgroundColor)
                        ]}

                        onMouseOver={()=>
                            isMouseDown.current && editMode==="drawingMode" && changeColor(i, j)
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
