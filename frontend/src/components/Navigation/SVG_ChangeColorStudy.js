import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import menu from "./menu_white_24dp.svg"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const svgMenu = useRef()
  const test1 = svgMenu.current

// for AirD&D. maybe when selecting the icon, set that to useRef?















  async function changeMenuColor(){
  // var a = await document.getElementById("svgObject");
    // Get the SVG document inside the Object tag
    var svgDoc = await svgMenu.current.contentDocument;
    // Get one of the SVG items by ID;
    // var svgItem = await svgDoc.getElementById("svgItem");
    // Set the colour to something else
    console.log(svgDoc, "WTFWTFWTF")
    // await svgItem.setAttribute("fill", "lime");
  }

  // useEffect(()=>{
  //   if(svgMenu){
  //     changeMenuColor()
  //   }

  // },[])

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  function changeColor(e){
    // e.target.style.fill = '#FF0000'
   let theSvg = e.target.contentDocument
   var svgItem = theSvg.getElementById("svgItem");
   svgItem.setAttribute("fill", "lime")
  }


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div onClick={openMenu} className="menuBtn navElement">
      {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" height="30px" fill="#FFFFFF" onMouseOver={(e) => changeColor(e)}>
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg> */}
      <object id="svgObject" type="image/svg+xml" data={menu} ref={svgMenu} onMouseOver={(e) => changeColor(e)}></object>
        {/* <img className="theSVG" src={menu} ref={svgMenu} draggable="false" style={{width: "40px"}} fill='00FF00' onMouseOver={(e) => changeColor(e)} alt=""/> */}
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="dropdownElement">{user.username}</div>
          <div className="dropdownElement" >{user.email}</div>
          <div className="dropdownElement" >
            <div className="logout" onClick={logout}>Log Out</div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
