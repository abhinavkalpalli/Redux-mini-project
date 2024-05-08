import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import adminService from './adminService'

const admin=JSON.parse(localStorage.getItem('admin'))
const initialState={
    admin:admin?admin:null,
    isError:false,
    isSuccess:false,
    userData:[],
    message:'',
    isRegistered:false,
    isDeleted:false
}

export const AdminLogin=createAsyncThunk('admin/login',async(adminData,thunkAPI)=>{
    try{
        return await adminService.adminlogin(adminData)
    }catch(error){
        const message=(error.response && error.response.data && error.response.message || error.message||error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const adminlogout=createAsyncThunk('admin/logout',async ()=>{
    return await adminService.adminlogout()
})
export const getUsersData=createAsyncThunk('admin/getuserdata',async(_,thunkAPI)=>{
    
    const token=thunkAPI.getState().admin.admin.token;
    console.log('token',token);
    return await adminService.getUsersData(token)
})
export const createUser=createAsyncThunk('admin/createUser',async(userData,thunkAPI)=>{
    const token=thunkAPI.getState().admin.admin.token;
    return await adminService.createUser(userData,token)
})
export const deleteUser=createAsyncThunk('admin/deleteuser',async(id,thunkAPI)=>{
    const token=thunkAPI.getState().admin.admin.token;
    return await adminService.deleteUser(id,token)
})
export const UpdateUsers=createAsyncThunk('admin/updateuser',async(userData,thunkAPI)=>{
    const token=thunkAPI.getState().admin.admin.token;
    return await adminService.updateUsers(userData,token)
})



export const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        adminreset:(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=false
            state.message=''
            state.isRegistered=false
        }
    },extraReducers:(builder)=>{
        builder
        .addCase(adminlogout.fulfilled,(state)=>{
            state.admin=null
        }).addCase(AdminLogin.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(AdminLogin.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.admin=action.payload
        })
        .addCase(AdminLogin.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.admin=null
        }).addCase(getUsersData.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUsersData.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.userData=action.payload.users
        })
        .addCase(getUsersData.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        }).addCase(createUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isRegistered=action.payload.success
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        }).addCase(deleteUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isDeleted=true
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        }).addCase(UpdateUsers.pending,(state)=>{
            state.isLoading=true
           
        })
        .addCase(UpdateUsers.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.userData=action.payload.users
        })
        .addCase(UpdateUsers.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})


export const {adminreset}=adminSlice.actions
export default adminSlice.reducer