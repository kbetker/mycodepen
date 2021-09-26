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
            const canvas_array = JSON.parse(theCanvas)
            newArr = JSON.parse(canvas_array)

        }
        catch(err){
            console.log(err)
        }
        return newArr
    }


    useEffect(()=>{
        dispatch(fetchAllDrawings())
    }, [])



    return (<>
        { allDrawings.map(e =>

            <div>
            <div>{e.name}</div>

            <div className="canvasPreview">
            {makeCanvasArray(e.canvas_array).map(i =>
                <div key={`column-${i}`} style={{width: "10px", height: "10px", backgroundColor: `${i}`}}> </div>

            )}
        </div>


            </div>
        )}

    </>)
}


export default Home
