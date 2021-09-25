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
      <NavLink className="navElement" exact to="/pixelpad">New Drawing</NavLink>
      <NavLink className="navElement" exact to="/pixelpad">My Drawings</NavLink>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="navElement" to="/login">Log In</NavLink>
        <NavLink className="navElement" to="/signup">Sign Up</NavLink>
       <NavLink className="navElement" to="/login">Demo</NavLink>
      </>
    );
  }

  return (
    <div className="navbarWrapper">

        <NavLink className="navElement" exact to="/">Home</NavLink>

        {isLoaded && sessionLinks}

    </div>
  );
}

export default Navigation;
