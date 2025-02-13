import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const fetchAggregations=createAsyncThunk(
    'data/fetchAggregations',
    async (_,{getState,rejectWithValue})=>{
        const token=getState().auth.token || localStorage.getItem('token');
        try{
            const response=await fetch('http://localhost:8000/aggregations',{
                headers:{Authorization: `Bearer ${token}`},
            });

            if(!response.ok) throw new Error("failed to fetch Data");
            return await response.json();
        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
);

const dataSlice=createSlice({
    name:'data',
    initialState:{aggregations:[],error:null,loading:false},
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAggregations.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(fetchAggregations.fulfilled,(state,action)=>{
                state.loading=false;
                state.aggregations=action.payload;
            })
            .addCase(fetchAggregations.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            });
    },
});
export default dataSlice.reducer;