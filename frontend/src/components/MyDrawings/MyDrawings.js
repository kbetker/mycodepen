import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllMYDrawings } from "../../store/pixelDrawing"
import { useHistory } from "react-router-dom"
import "./MyDrawings.css"

function MyDrawings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const myDrawings = useSelector(state => state.pixelDrawing.allMYDrawings)
    const history = useHistory()


    if (!user) {
        history.push("/login")
    }

    useEffect(() => {
        dispatch(fetchAllMYDrawings(user?.id))
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    <div className="editDeleteContainer">
                        <button
                        className="formButton myDrawingsBtn"
                        onClick={()=> history.push(`/pixelpad/${e.id}`)}
                        >Edit</button>
                        <button
                        className="formButton myDrawingsBtn deleteBtn"
                        onClick={()=> history.push(`/edit/${e.id}`)}
                        >Delete</button>
                    </div>
                </div>
            )}

        </div>)
}




export default MyDrawings
