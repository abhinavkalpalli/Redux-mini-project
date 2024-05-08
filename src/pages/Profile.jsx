import React from 'react'
import { useSelector } from 'react-redux'
import ProfileDet from '../components/ProfileDet/ProfileDet'
function Profile() {
    const {user}=useSelector((state)=>state.auth)
  return (
    <div>
    { user && <ProfileDet userData={user}/>}
    </div>
  )
}

export default Profile
