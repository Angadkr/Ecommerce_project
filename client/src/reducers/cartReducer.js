import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlConfig } from "../config";
import { act } from "react";

const initialState= {
    cart:[],
    loading:false,
    error:null
}

export const fetchCartItem = createAsyncThunk(
    'carts/fetchCartItem',
    async(userId,{rejectWithValue})=>{
        try{
            const result = await axios.get(`${urlConfig}/carts/user/${userId}`)
            return result.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

export const addItemToCart = createAsyncThunk(
    'carts/addItemToCart',
    async ({userId,productId,cartQuantity}, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${urlConfig}/carts`,{userId,productId,cartQuantity});
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  
  export const deleteCartItem = createAsyncThunk(
    'carts/deleteCartItem',
    async (cartId, { rejectWithValue }) => {
      try {
        await axios.delete(`${urlConfig}/carts/${cartId}`);
        return cartId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const deleteAllCartsByUserId = createAsyncThunk(
    'cart/deleteAllCartsByUserId',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${urlConfig}/carts/user/${userId}`);
        return response.data.deleteCount;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //in addCase we have
        builder
        .addCase(fetchCartItem.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchCartItem.fulfilled,(state,action)=>{
            state.loading = false;
            state.cart = action.payload;
            state.error = null;
        })
        .addCase(fetchCartItem.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addItemToCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = [...state.cart, { ...action.payload }]
            console.log(state.cart)
            state.error = null;
        })
        .addCase(addItemToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteCartItem.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = state.cart.filter(c => c._id !== action.payload);
            state.error = null;
        })
        .addCase(deleteCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteAllCartsByUserId.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteAllCartsByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = state.cart.filter((item)=>item.userId !== action.payload)
            state.error = null;
        })
        .addCase(deleteAllCartsByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default cartSlice.reducer;