import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dispatchSelectedColor } from "../../store/pixelDrawing"
import "./PixelCanvas.css"

function PixelCanvas() {
    const dispatch = useDispatch()
    const selectedColor =  useSelector(state => state.pixelDrawing.selectedColor)
    const isMouseDown = useRef(false)
    const colorArray = useRef([])
    const editMode = useRef("drawingMode")
    const arrayBg = "rgb(255, 255, 255)"
    const pixel = 12
    const rows = 30
    const columns = 30

    //initializes empty array
    useEffect(() => {
        const initArray = () => {
            let rowsArr = []
            let columnsArr = []
            for (let i = 0; i < rows; i++) { rowsArr.push(arrayBg) }
            for (let j = 0; j < columns; j++) { columnsArr.push(rowsArr) }
            return columnsArr
        }
        colorArray.current = initArray()
        dispatch(dispatchSelectedColor("#000000"))
        console.log(colorArray.current)
    }, [])


    function fillFunc(row, column, divBgColor){
       console.log(colorArray.current[row][column])

    }


    // changes the background color Drawing Mode
    useEffect(() => {
        let pixels = document.querySelectorAll(`.pixel`)

        for (let i = 0; i < pixels.length; i++) {
            let arr = pixels[i].id.split("-")
            // console.log(arr[0], "-", arr[1])
            // pixels[i].addEventListener("mouseover", (e) => {
            //     if (isMouseDown.current && editMode.current === "drawingMode") {
            //         colorArray.current[arr[0]][arr[1]] = selectedColor
            //         pixels[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
            //     }
            // })

            pixels[i].addEventListener("mousedown", (e) => {
                e.stopPropagation()
                if(editMode.current === "drawingMode"){
                colorArray.current[arr[0]][arr[1]] = selectedColor
                pixels[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
                console.log(colorArray.current)
                } else if (editMode.current === "fillMode"){
                    let id = e.target.id.split("-")
                    fillFunc(id[0], id[1], e.target.style.backgroundColor)
                }
            })
        }
    }, [selectedColor, colorArray])


    //sets mousedown status - allows for continuous drawing
    useEffect(() => {
        document.addEventListener("mousedown", (e) => { isMouseDown.current = true })
        document.addEventListener("mouseup", (e) => { isMouseDown.current = false })
    }, [isMouseDown])





    //DON'T DELETE - this will allow you to continue editing a saved picture
    // useEffect(() => {
    //     let pixelBg = document.querySelectorAll(`.pixel`)
    //     for (let i = 0; i < pixelBg.length; i++) {
    //         let arr = pixelBg[i].id.split("-")
    //         pixelBg[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
    //     }
    // }, [])

    return (
        <>
        <div className="editButtons">
            <button onClick={() => editMode.current = 'drawingMode'}>Draw Mode</button>
            <button onClick={() => editMode.current = 'fillMode'}>Fill Mode</button>
            <span style={{color: "white", marginLeft: "10px"}}>{editMode.current}</span>
        </div>
        <div
            className="canvas"
            style={{
                width: `${rows * pixel}px`,
                height: `${columns * pixel}px`
            }}>

            {colorArray.current.map((e, i) =>
                e.map((e2, j) =>
                    <div
                        className="pixel"
                        id={`${i}-${j}`}
                        key={`key-${i}-${j}`}
                        style={{
                            height: `${pixel}px`,
                            width: `${pixel}px`,
                            backgroundColor: "rgb(255, 255, 255)"
                        }}>

                    </div>
                )
            )}
        </div>
        </>
    )
}

export default PixelCanvas
