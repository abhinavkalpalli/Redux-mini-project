import axios from 'axios'

const API_URL='/api/admin/'


const adminlogin=async(userData)=>{
    const response=await axios.post(API_URL,userData)
    console.log(response.data);
    if(response.data){
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}
const adminlogout=()=>{
    localStorage.removeItem('admin')
}
const getUsersData=async(token)=>{
    console.log(token)
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL+'getuserdata',config)
    return response.data
}
const createUser=async(userData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'createuser',userData,config)
    return response.data
}
const deleteUser=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.patch(API_URL+'deleteuser',id,config)
    return response
}
const updateUsers=async(userData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.put(API_URL+'updateusers',userData,config)
    return response.data
}
const adminService={
    adminlogout,
    adminlogin,
    getUsersData,
    createUser,
    deleteUser,
    updateUsers
}
export default adminService