import { configureStore } from "@reduxjs/toolkit"
import quizeReducer from "./reducers"

const store = configureStore({
    reducer : quizeReducer
})


export default store