import { configureStore } from "@reduxjs/toolkit";

import passwordSliceReducer from "./PasswordSlice"


const MyStore = configureStore({
    reducer: {
        password: passwordSliceReducer

    }
})

export default MyStore