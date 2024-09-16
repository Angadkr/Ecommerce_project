import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlConfig } from "../config";

const initialState = {
    orders:[],
    loading:false,
    error:null
}

export const fetchOrderByUserId = createAsyncThunk(
    'orders/fetchOrderByUserId',
    async(userId,{rejectWithValue})=>{
        try{
            const result = await axios.get(`${urlConfig}/orders/user/${userId}`)
            console.log(result.data)
            return result.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async({userId,products,totalAmount,shippingAddress,shippingAddressGoogleMaps,contactNumber})=>{
        try{
            const result = await axios.post(`${urlConfig}/orders`,{
                userId,products,totalAmount,shippingAddress,shippingAddressGoogleMaps,contactNumber
            })
            return result.data
        }catch(error){
            throw error;
        }
    }
)

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrder',
    async()=>{
        try{
            const result = await axios.get(`${urlConfig}/orders`)
            return result.data
        }catch(error){
            throw Error("Failed to fetch order data");
        }
    }
)

export const updateOrder = createAsyncThunk(
    'orders/updateOrder',
    async({orderId,status})=>{
        try{
            const result = await axios.put(`${urlConfig}/orders/${orderId}`,{status})
            return result.data
        }catch(error){
            throw error;
        }
    }
)

const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //in addCase we have
        builder
        .addCase(fetchOrderByUserId.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchOrderByUserId.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
            state.error = null;
        })
        .addCase(fetchOrderByUserId.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addOrder.pending,(state)=>{
            state.loading = true
        })
        .addCase(addOrder.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = [...state.orders,{...action.payload}];
            state.error = null;
        })
        .addCase(addOrder.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
        .addCase(fetchAllOrders.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
            state.error = null;
        })
        .addCase(fetchAllOrders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateOrder.fulfilled, (state, action) => {
            state.loading = false;
            const updatedOrderIndex = state.orders.findIndex(order=>order._id  === action.payload._id)
            if(updatedOrderIndex!==-1){
                state.orders[updatedOrderIndex] = action.payload
            }
            state.error = null;
        })
        .addCase(updateOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
})

export default orderSlice.reducer;