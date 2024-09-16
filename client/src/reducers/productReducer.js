import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
//we need a createAsyncThunk and a createSlice
import axios from "axios";
//we need axios to send query request to the backend
import { urlConfig } from "../config";

//format of createAsyncThunk is ----name,---async function(_/dynamic value,{rejectWithValue})=>{}

//we need to export each async thunk as well seperatly for further use
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async(cid="",{rejectWithValue})=>{
        try{
            const result = await axios.get(`${urlConfig}/products?cid=${cid}`)
            return result.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${urlConfig}/products`, productData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  
  // Async thunk action creator to delete a category
  export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { rejectWithValue }) => {
      try {
        await axios.delete(`${urlConfig}/products/${productId}`);
        return productId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Async thunk action creator to update a category
  export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ productId, productData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${urlConfig}/products/${productId}`, productData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

//finally we need to create the reducer slice
//A slice is the portion of Redux code that relates to a specific set of data and 
//actions within the store 's state. A slice reducer is the reducer responsible for
//handling actions and updating the data for a given slice.

//each slice has a name , a initial state , reducers and extra reducers.
//extra reducers are the main it is a builder function in which we add builder .addCase
//inside each addded case we can have 3 cases like fullfilled rejected or pending...and we manipulate state accordingly..
//we have state,action as main parameters inside the callback funcitons of each case.

const productsSlice = createSlice({
    name:"products",
    initialState:{
        loading:false,
        products:[],
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        //in addCase we have
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
            state.error = null;
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter(product => product._id !== action.payload);
            state.error = null;
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const updatedIndex = state.products.findIndex(product => product._id === action.payload._id);
            if (updatedIndex !== -1) {
              state.products[updatedIndex] = action.payload;
            }
            state.error = null;
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default productsSlice.reducer;


