import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { dispatchEditMode } from '../../store/pixelDrawing';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const isDemo = useParams()

  useEffect(()=>{
    if(isDemo.demo === "demo"){
      setCredential('demo@user.io')
      setPassword('password')
    } else {
      setCredential('')
      setPassword('')
    }
  },[isDemo])

  useEffect(()=>{
    dispatch(dispatchEditMode("ignoreKeyPress"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e ? e.preventDefault() : console.log("wat")
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }



  return (
    <div className="formContainer">
    <form onSubmit={handleSubmit} className="form">
      <div className="formElement">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </div>
      <div className="formElement">
        Username or Email
      </div>
      <input
        type="text"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        required
        className="formElement formInput"
      />

      <div className="formElement">
        Password
      </div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="formElement formInput"
      />
      <button type="submit" className="formElement formButton">Log In</button>
    </form>
    </div>
  );
}

export default LoginForm;
