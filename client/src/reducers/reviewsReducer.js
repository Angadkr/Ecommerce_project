import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlConfig } from "../config";

export const fetchReviews = createAsyncThunk(
    'products/fetchReviews',
    async(productId,{rejectWithValue})=>{
        try{
            const result = await axios.get(`${urlConfig}/reviews/${productId}`)
            return result.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

export const addReviews = createAsyncThunk(
    'products/addReviews',
    async({productId,userId,rating,comment},{rejectWithValue})=>{
        try{
            const result = await axios.post(`${urlConfig}/reviews`,{productId,userId,rating,comment})
            return result.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

const reviewsSlice = createSlice({
    name:"reviews",
    initialState:{
        loading:false,
        reviews:[],
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        //in addCase we have
        builder
        .addCase(fetchReviews.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchReviews.fulfilled,(state,action)=>{
            state.loading = false;
            state.reviews = action.payload;
            state.error = null;
        })
        .addCase(fetchReviews.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addReviews.pending, (state) => {
            state.loading = true;
        })
        .addCase(addReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = [...state.reviews,{...action.payload}];
            state.error = null;
        })
        .addCase(addReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
    }
})

export default reviewsSlice.reducer;