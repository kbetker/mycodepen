import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import "./PixelCanvas.css"

function PixelCanvas(){
    const selectedColor = useSelector( state => state.pixelDrawing.selectedColor)
    const isMouseDown = useRef(false)
    // const isMouseUp = useState(true)

    const colorArray = useRef( [
        ["green",            "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
        ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
        ["rgba(0, 0, 0, 0)", "purple", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
        ["yellow", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
    ])

    // const canvas = [
    //     ["green",            "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
    //     ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
    //     ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
    //     ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
    // ]


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
            console.log(colorArray.current)
        })
      }

    }, [selectedColor, colorArray])



    useEffect(()=>{

        document.addEventListener("mousedown", (e)=>{
            isMouseDown.current = true
            console.log("mouse is down", isMouseDown.current)
        })

        document.addEventListener("mouseup", (e)=>{
            isMouseDown.current = false
            console.log("mouseUp", isMouseDown.current)
        })
    },[isMouseDown])


    useEffect(()=>{
        let pixelBg = document.querySelectorAll(`.pixel`)
        console.log(pixelBg)
        for(let i = 0; i < pixelBg.length; i++){
            let arr = pixelBg[i].id.split("-")
            pixelBg[i].style.backgroundColor = `${colorArray.current[arr[0]][arr[1]]}`
        }
    }, [])

    return (
        <div className="canvas">
            <div className="pixel" id="0-0"></div>
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
            <div className="pixel" id="3-3"></div>

        </div>
    )
}

export default PixelCanvas
