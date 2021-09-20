import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dispatchSelectedColor } from "../../store/pixelDrawing"
import "./PixelCanvas.css"

function PixelCanvas() {
    const dispatch = useDispatch()
    const selectedColor =  useSelector(state => state.pixelDrawing.selectedColor)
    const isMouseDown = useRef(false)
    const colorArray = useRef([])
    const arrayBg = "rgba(0, 0, 0, 0,)"
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
    }, [])


    // changes the background color
    useEffect(() => {
        let pixels = document.querySelectorAll(`.pixel`)

        for (let i = 0; i < pixels.length; i++) {
            let arr = pixels[i].id.split("-")

            pixels[i].addEventListener("mouseover", (e) => {
                if (isMouseDown.current) {
                    colorArray.current[arr[0]][arr[1]] = selectedColor
                    pixels[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
                }
            })

            pixels[i].addEventListener("mousedown", (e) => {
                colorArray.current[arr[0]][arr[1]] = selectedColor
                pixels[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
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
                            width: `${pixel}px`
                        }}>

                    </div>
                )
            )}
        </div>
    )
}

export default PixelCanvas
