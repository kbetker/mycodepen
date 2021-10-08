import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import menu from "./menu_white_24dp.svg"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const svgMenu = useRef()


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };



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
        <img className="theSVG" src={menu} ref={svgMenu} draggable="false" style={{width: "40px"}} alt=""/>
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
