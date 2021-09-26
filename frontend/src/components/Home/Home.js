import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDrawings } from "../../store/pixelDrawing";


function Home(){
    const dispatch = useDispatch()
    const allDrawings = useSelector(state => state.pixelDrawing.allDrawings)
    // const canvas_array = JSON.parse(allDrawings[0]?.canvas_array)
    // console.log(typeof allDrawings[0]?.canvas_array)

    useEffect(()=>{
        if(allDrawings){
            let canvas_array = JSON.parse(allDrawings[0]?.canvas_array)
            console.log(canvas_array)
            // for(let i = 0; i < canvas_array.length / 2; i++){
            //     console.log(canvas_array[i])
            // }
        }

    },[])


    useEffect(()=>{
        dispatch(fetchAllDrawings())
    }, [])



    return (<>
        { allDrawings.map(e =>

            <div>
            <div>{e.name}</div>

            <div style={{width: "600px"}}>
            {/* {e.map(i =>
                <div key={`column-${i}`} style={{width: "10px", height: "10px"}}>



                </div>

            )} */}
        </div>


            </div>
        )}

    </>)
}


export default Home
