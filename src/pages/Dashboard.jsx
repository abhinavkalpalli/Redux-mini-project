import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate=useNavigate()
  const {user}=useSelector((state)=>state.auth)
  
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[user,navigate])
  
  return (
    <div>
      {user && <><h1>Welcome {user.name}</h1>
      </>}
    </div>
  )
}

export default Dashboard
