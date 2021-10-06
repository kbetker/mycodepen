import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllMYDrawings } from "../../store/pixelDrawing"
import { useHistory } from "react-router-dom"
import { dispatchEditMode, dispatchDeleteDrawing } from "../../store/pixelDrawing"
import "./MyDrawings.css"

function MyDrawings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const myDrawings = useSelector(state => state.pixelDrawing.allMYDrawings)
    const editMode = useSelector(state => state.pixelDrawing.editMode)
    const history = useHistory()
    const [deleteId, setDeleteId] = useState(0)
    // const scrollToHere = useRef()


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

    function handleDelete(e){
        e.preventDefault()
        let deltaco = dispatch(dispatchDeleteDrawing(deleteId))
        if(deltaco.erros){
            alert(deltaco.errors)
        } else{
            dispatch(dispatchEditMode(""))
        }

    }

    function scrollToTop(){
        let scrollToHere = document.querySelector(".navbarWrapper")
        scrollToHere.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    }



    return (
        <div className="homePageWrapper">

                {(editMode === "deleteDrawing") &&
                <div className="saveFormContainer">
                    <form onSubmit={handleDelete} className="form saveForm">
                        <div className="formElement">Are you sure you want to delete?</div>

                        <button type="submit" className="formButton formElement deleteBtn">Delete Drawing</button>
                        <button className="formButton formElement" onClick={() => dispatch(dispatchEditMode(""))}>Cancel</button>
                    </form>
                </div>
            }


            {myDrawings.length === 0 && <div className="homeTitle">You currently have no drawings. Get busy!!</div>}
            {myDrawings?.map(e =>

                <div key={`picId-${e.id}`} className="artwork">
                    <div className="nameTitleContainer">
                    <div className="homeTitle"> &ldquo;{e.name}&rdquo;</div>
                    <div className="byName">by {e.User.username}</div>
                    </div>

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
                        onClick={()=>  [dispatch(dispatchEditMode("deleteDrawing")), setDeleteId(e.id), scrollToTop()]}
                        >Delete</button>
                    </div>
                </div>
            )}

        </div>)
}




export default MyDrawings
