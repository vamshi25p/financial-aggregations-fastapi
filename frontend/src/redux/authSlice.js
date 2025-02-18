import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            if (!response.ok) {
                throw new Error("Invalid Credentials");
            }
            const data = await response.json();
            console.log("API Response:", data); 

            
            localStorage.setItem("token", data.access_token);

            return { token: data.access_token, user: {} };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const registerUser=createAsyncThunk(
    "auth/registerUser",
    async (userData,{rejectWithValue})=>{
        try {
            const response=await fetch("http://localhost:8000/auth/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(userData),
            });
            if(!response.ok){
                throw new Error("Registration Failed");
            }
            const data=await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);    
        }
    }
)

const authSlice=createSlice({
    name:'auth',
    initialState:{user:null,token:null,error:null,loading:false},
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.token=null;
            localStorage.removeItem('token');
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(loginUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                console.log("Login Successful, API Response:", action.payload); 
                state.loading=false;
                state.user=action.payload.user;
                state.token=action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(registerUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload;
                state.token=null;
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })

    },
});

export const {logout}=authSlice.actions;
export default authSlice.reducer;