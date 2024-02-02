import { configureStore } from "@reduxjs/toolkit"
import { fetchReducer, quizeReducer } from "./reducers"

const store = configureStore({
    reducer : {
       quizeStore : quizeReducer ,
       fetchStore : fetchReducer,
    }
})


export default store