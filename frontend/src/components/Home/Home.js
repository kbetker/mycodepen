import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDrawings, dispatchDeleteDrawing } from "../../store/pixelDrawing";
import "./Home.css"


function Home() {
    const dispatch = useDispatch()
    const allDrawings = useSelector(state => state.pixelDrawing.allDrawings)
    const user = useSelector(state => state.session.user)

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

    function handleDelete(deleteId) {
        // e.preventDefault()
        let deltaco = dispatch(dispatchDeleteDrawing(deleteId))
        if (deltaco.errors) {
            alert(deltaco.errors)
        } else {
            console.log("Cool Beings")
        }

    }


    useEffect(() => {
        dispatch(fetchAllDrawings())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="homePageWrapper">
            {allDrawings.map((e, eInt) =>

                <div key={`picId-${e.id}${eInt}`} className="artwork">
                    <div className="nameTitleContainer">
                        <div className="homeTitle"> &ldquo;{e.name}&rdquo;</div>
                        <div className="byName">by {e.User.username}</div>
                    </div>

                    <div className="canvasPreview">
                        {makeCanvasArray(e.canvas_array).map((div, int) => <div style={{display: "flex"}} key={`canvasKey-${int}`}>
                            {div.map((pixel, int2) => <div className="homePixels" key={`pix-${int2}${int}`} style={{ backgroundColor: `${pixel}` }}> </div>)}

                        </div>
                        )}
                    </div>

                    {user?.is_admin && <button className="formButton formElement deleteBtn" onClick={() => handleDelete(e.id)}>Delete Drawing</button>}
                </div>
            )}

        </div>)
}


export default Home
