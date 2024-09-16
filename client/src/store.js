import { configureStore } from "@reduxjs/toolkit";
//@reduxjs/toolkit has a configureStorej
//we need to specify the reducer for store
import rootReducer from "./reducers";

const store = configureStore({
    reducer:rootReducer
})

export default store;