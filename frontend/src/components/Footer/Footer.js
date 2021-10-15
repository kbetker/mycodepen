import React from "react"
import "./Footer.css"
import gitHub from "./images/gitHubPixel.png"
import linkedIn from "./images/linkedInPixel.png"
import angelList from "./images/angelListPixel.png"
import { useSelector } from "react-redux"
import Spacer from "./Spacer"

function Footer(){
    const pageNum = useSelector(state => state.pageNum)

    function growFooter(e){
        // e.target.classList.add("footerGrow")
        console.log(e.target.childNodes[0])
    }

    function shrinkFooter(e){
        e.target.classList.remove("footerGrow")
    }

    return(

        <>
        <Spacer/>
        <div className="footer" onMouseOver={(e)=> growFooter(e)} onMouseLeave={(e)=>shrinkFooter(e)}>
            <a href="https://github.com/kbetker" target="_blank" rel="noreferrer" className="footerImage">
                <img
                src={gitHub}
                // className="footerImage"
                // onMouseOver={(e)=> growFooter(e)}
                alt="GitHub" >
                </img>
            </a>

            <a href="https://www.linkedin.com/in/kevin-betker-878505128/" target="_blank" rel="noreferrer" className="footerImage">
                <img
                src={linkedIn}
                // className="footerImage"
                // onMouseOver={(e)=> growFooter(e)}
                alt="LinkedIn" >
                </img>
            </a>

            <a href="https://angel.co/u/kevin-betker" target="_blank" rel="noreferrer" className="footerImage">
                <img
                src={angelList}
                // className="footerImage"
                // onMouseOver={(e)=> growFooter(e)}
                alt="Angel List" >
                </img>
            </a>

            <a href="https://kbetker.github.io/" target="_blank" rel="noreferrer" className="footerImage" >
                <div className="myPortfolio">My Portfolio</div>
            </a>

        </div>
        </>

    )
}

export default Footer
