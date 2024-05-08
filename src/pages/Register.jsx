import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {register,reset} from '../features/auth/authSlice'
import { createUser,adminreset } from "../features/auth/admin/adminSlice";
import Spinner from "../components/Spinner";
 
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)
  const {admin,isRegistered}=useSelector((state)=>state.admin)
  useEffect(()=>{
    if(isRegistered){
      navigate('/admin/admindashboard')
      dispatch(adminreset())
    }
    if(isError){
        toast.error(message)
    }
    if(isSuccess||user){
        navigate('/')
    }
    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch,isRegistered])
 
  const onchange = (e) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
    }))
  };
  const onSubmit=(e)=>{
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim() || !password2.trim()) {
      toast.error('All fields are required');
      return;
  }

  if (password !== password2) {
      toast.error('Passwords do not match');
      return;
  }

 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
  }

  
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!passwordRegex.test(password)) {
      toast.error('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit');
      return;
  }
else{
        const userData={
            name,
            email,
            password
        }
        if(admin){
          dispatch(createUser(userData))
        }else{
          dispatch(register(userData))
        }
    }
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Create an account</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your Name"
              onChange={onchange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Re-enter password"
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

export default Register;
