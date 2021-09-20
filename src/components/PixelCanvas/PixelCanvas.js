import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import "./PixelCanvas.css"

function PixelCanvas(){
    const selectedColor = useSelector( state => state.pixelDrawing.selectedColor)
    const isMouseDown = useRef(false)
    // const isMouseUp = useState(true)

    const arrayBg = "rgba(0, 0, 0, 0,)"
    const pixel = 8
    const rows = 53
    const columns = 53

    const initArray = () => {
        let rowsArr = []
        let columnsArr = []
        for(let i = 0; i < rows; i ++){
            rowsArr.push(arrayBg)
        }
        for(let j = 0; j < columns; j++){
            columnsArr.push(rowsArr)
        }
        return columnsArr
    }



    const colorArray = useRef([])

    useEffect(()=>{
        colorArray.current = initArray()

    }, [])



    useEffect(()=>{
      let pixels = document.querySelectorAll(`.pixel`)

      for(let i = 0; i < pixels.length; i++){
        let arr = pixels[i].id.split("-")

        pixels[i].addEventListener("mouseover", (e)=>{
            if(isMouseDown.current){
            colorArray.current[arr[0]][arr[1]] = selectedColor
            pixels[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
            }
        })

        pixels[i].addEventListener("mousedown", (e)=>{
            colorArray.current[arr[0]][arr[1]] = selectedColor
            pixels[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
        })
      }

    }, [selectedColor, colorArray])



    useEffect(()=>{

        document.addEventListener("mousedown", (e)=>{
            isMouseDown.current = true
        })

        document.addEventListener("mouseup", (e)=>{
            isMouseDown.current = false
        })
    },[isMouseDown])


    useEffect(()=>{
        let pixelBg = document.querySelectorAll(`.pixel`)
        for(let i = 0; i < pixelBg.length; i++){
            let arr = pixelBg[i].id.split("-")
            pixelBg[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
        }
    }, [])

    return (
        <div className="canvas" style={{width: `${rows * pixel}px`, height: `${columns * pixel}px`}}>

            {initArray().map((e, i) =>
                e.map((e2, j) =>
                    <div className="pixel" id={`${i}-${j}`} style={{height: `${pixel}px`, width: `${pixel}px`}}></div>
                    )
                )}



            {/* <div className="pixel" id="0-0"></div>
            <div className="pixel" id="0-1"></div>
            <div className="pixel" id="0-2"></div>
            <div className="pixel" id="0-3"></div>

            <div className="pixel" id="1-0"></div>
            <div className="pixel" id="1-1"></div>
            <div className="pixel" id="1-2"></div>
            <div className="pixel" id="1-3"></div>

            <div className="pixel" id="2-0"></div>
            <div className="pixel" id="2-1"></div>
            <div className="pixel" id="2-2"></div>
            <div className="pixel" id="2-3"></div>

            <div className="pixel" id="3-0"></div>
            <div className="pixel" id="3-1"></div>
            <div className="pixel" id="3-2"></div>
            <div className="pixel" id="3-3"></div> */}

        </div>
    )
}

export default PixelCanvas
