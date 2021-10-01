import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDrawings } from "../../store/pixelDrawing";
import "./Home.css"


function Home() {
    const dispatch = useDispatch()
    const allDrawings = useSelector(state => state.pixelDrawing.allDrawings)

    function makeCanvasArray(theCanvas) {
        let newArr = [[]]
        try {
            return JSON.parse(theCanvas)
            // newArr = JSON.parse(canvas_array)

        }
        catch (err) {
            console.log(err)
        }
        return newArr
    }


    useEffect(() => {
        dispatch(fetchAllDrawings())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="homePageWrapper">
            {allDrawings.map((e, eInt) =>

                <div key={`picId-${e.id}${eInt}`} className="artwork">
                    <div className="homeTitle"> &ldquo;{e.name}&rdquo;</div>
                    <div className="byName">by {e.User.username}</div>


                    <div className="canvasPreview">
                        {makeCanvasArray(e.canvas_array).map((div, int) => <>
                            {div.map((pixel, int2) => <div className="homePixels" key={`pix-${int2}${int}`} style={{ backgroundColor: `${pixel}` }}> </div>)}

                        </>
                        )}
                    </div>


                </div>
            )}

        </div>)
}


export default Home
