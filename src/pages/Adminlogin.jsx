import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt} from "react-icons/fa";
import { useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { AdminLogin,adminreset } from "../features/auth/admin/adminSlice";
import Spinner from "../components/Spinner";

 

function Adminlogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {admin,isLoading,isError,isSuccess,message}=useSelector((state)=>state.admin)


  const { email, password} = formData;
  useEffect(()=>{
    if(isError){
        toast.error(message)
    }
    if(isSuccess||admin){
        navigate('/admin/admindashboard')
    }
    dispatch(adminreset())
  },[admin,isError,isSuccess,message,navigate,dispatch])
  const onchange = (e) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
    }))
  };
  const onSubmit=(e)=>{
    e.preventDefault()
    const userData={
      email,
      password
    }
    dispatch(AdminLogin(userData))
  }
  if(isLoading){
    return<Spinner/>
  }
 
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Admin Login
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

export default Adminlogin;
