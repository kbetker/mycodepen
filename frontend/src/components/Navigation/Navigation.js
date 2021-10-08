import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import "./Navigation.css"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <NavLink className="navElement homeBtn" exact to="/pixelpad">New Drawing</NavLink>
      <NavLink className="navElement homeBtn" exact to="/mydrawings">My Drawings</NavLink>
      <ProfileButton className="navElement homeBtn" user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="navElement homeBtn" to="/login">Log In</NavLink>
        <NavLink className="navElement homeBtn" to="/signup">Sign Up</NavLink>
       <NavLink className="navElement homeBtn" to="/login/demo">Demo</NavLink>
      </>
    );
  }

  return (
    <div className="navbarWrapper">

        <NavLink className={`navElement logo`} exact to="/">RetroGFX</NavLink>
        <div className="homeBtnContainer">
        {isLoaded && sessionLinks}
        </div>

    </div>
  );
}

export default Navigation;
