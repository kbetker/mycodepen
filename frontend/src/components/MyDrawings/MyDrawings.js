import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dispatchEditMode, fetchAllMYDrawings } from "../../store/pixelDrawing"

function MyDrawings(){
   const allDrawings = [[]]
   const dispatch = useDispatch()
    const user = useSelector(state=> state.session.user.id)
    const myDrawings = useSelector(state => state.pixelDrawing.allMYDrawings)


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

    useEffect(()=>{
        dispatch(fetchAllMYDrawings(user))
        console.log(myDrawings)
    }, [])

    return (
        <div className="homePageWrapper">
            {myDrawings?.map(e =>

                <div key={`picId-${e.id}`} className="artwork">
                    <div className="homeTitle"> &ldquo;{e.name}&rdquo;</div>
                    <div className="byName">by {e.User.username}</div>


                    <div className="canvasPreview">
                        {makeCanvasArray(e.canvas_array).map((div, int) => <>
                            {div.map((pixel, int2) => <div className="homePixels" key={`pix-${int2}`} style={{ backgroundColor: `${pixel}` }}> </div>)}

                        </>
                        )}
                    </div>


                </div>
            )}

        </div>)
}




export default MyDrawings
