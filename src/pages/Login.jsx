import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt} from "react-icons/fa";
import { useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {login,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

 

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)


  const { email, password} = formData;
  useEffect(()=>{
    if(isError){
        toast.error(message)
    }
    if(isSuccess||user){
        navigate('/')
    }
    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch])
  const onchange = (e) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
    }))
  };
  const onSubmit=(e)=>{
    e.preventDefault()
    // Perform form validation
    if (!email.trim() || !password.trim()) {
      toast.error('Email and password are required');
      return;
  }

  // Validate email using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
  }

    const userData={
      email,
      password
    }
    dispatch(login(userData))
  }
  if(isLoading){
    return<Spinner/>
  }
 
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
