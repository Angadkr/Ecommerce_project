import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlConfig } from "../config";

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async(productId,{rejectWithValue})=>{
        try{
            const result = await axios.get(`${urlConfig}/products/${productId}`)
            return result.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

const productSlice = createSlice({
    name:"product",
    initialState:{
        loading:false,
        product:[],
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        //in addCase we have
        builder
        .addCase(fetchProduct.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchProduct.fulfilled,(state,action)=>{
            state.loading = false;
            state.product = action.payload;
            state.error = null;
        })
        .addCase(fetchProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default productSlice.reducer;