import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDrawings } from "../../store/pixelDrawing";
import "./Home.css"


function Home(){
    const dispatch = useDispatch()
    const allDrawings = useSelector(state => state.pixelDrawing.allDrawings)

    function makeCanvasArray(theCanvas){
        let newArr = [[]]
        try {
            console.log(JSON.parse(theCanvas), "WTFWTWFTWFWTFWFTWFTWTF")
            return JSON.parse(theCanvas)
            // newArr = JSON.parse(canvas_array)

        }
        catch(err){
            console.log(err)
        }
        return newArr
    }


    useEffect(()=>{
        dispatch(fetchAllDrawings())
    }, [])


    // const waitAMoment = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) }
    // async function fade() {
    //     let thePixels = document.querySelectorAll(".homePixels")
    //     for(let i = 0; i < Math.floor(thePixels.length / 2); i++){
    //             await waitAMoment(0.1)
    //             thePixels[i].style.backgroundColor = thePixels[i].id
    //             thePixels[thePixels.length - i - 1].style.backgroundColor = thePixels[thePixels.length - i - 1].id
    //         }
    // }




    // useEffect(()=>{
    //         fade()
    // }, [allDrawings])


    return (
    <div className="homePageWrapper">
        { allDrawings.map(e =>

            <div key={`picId-${e.id}`} className="artwork">
            <div className="homeTitle"> &ldquo;{e.name}&rdquo;</div>
            <div className="byName">by {e.User.username}</div>


            <div className="canvasPreview">
            {makeCanvasArray(e.canvas_array).map((div, int) => <>
            {div.map((pixel, int2) => <div className="homePixels" key={`pix-${int2}`} style={{backgroundColor: `${pixel}`}}> </div> )}

                 </>
            )}
        </div>


            </div>
        )}

    </div>)
}


export default Home
