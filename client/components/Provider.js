'use client'
//use client is used to mark the component as a client component rather then server and it will be rendered directly on the browser
import React,{Children} from "react"
import { Provider } from "react-redux"
import store from "../src/store.js"

//Provider Wrapper just wraps the Provider from react-redux around the children
//And we need to specify a redux store for provider
const ProviderWrapper = ({children})=>{
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ProviderWrapper;

