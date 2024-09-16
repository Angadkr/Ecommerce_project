import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
//createAsyncThunk and createSlice are two functions
import axios from "axios";
import { urlConfig } from "../config";

//using createAsyncThunk we will make 4 function async for fetch,update,delete etc...

//thunk action to fetch category:

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async(_,{rejectWithValue})=>{
        try{
            const result = await axios.get(`${urlConfig}/categories`)
            return result.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)
// Async thunk action creator to add a category
export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (categoryData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${urlConfig}/categories`, categoryData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  
  // Async thunk action creator to delete a category
  export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (categoryId, { rejectWithValue }) => {
      try {
        await axios.delete(`${urlConfig}/categories/${categoryId}`);
        return categoryId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Async thunk action creator to update a category
  export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ categoryId, categoryData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${urlConfig}/categories/${categoryId}`, categoryData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const categorySlice = createSlice({
    name:"categories",
    initialState:{
        loading:false,
        categories:[],
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        //in addCase we have
        builder
        .addCase(fetchCategories.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.loading = false;
            state.categories = action.payload;
            state.error = null;
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories.push(action.payload);
            state.error = null;
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = state.categories.filter(category => category._id !== action.payload);
            state.error = null;
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            const updatedIndex = state.categories.findIndex(category => category._id === action.payload._id);
            if (updatedIndex !== -1) {
              state.categories[updatedIndex] = action.payload;
            }
            state.error = null;
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default categorySlice.reducer;