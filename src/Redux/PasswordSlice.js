import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const forgotPassword = createAsyncThunk("passwordSlice/forgotPassword", async (userEmail) => {
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email: userEmail
    })
    return data
}
)


export const resetPassword = createAsyncThunk("passwordSlice/resetPassword", async (values) => {

    const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
    
    return data

}
)

const passwordSlice = createSlice({
    name: "passwordSlice",


    initialState: {
        forgotPasswordData: [],
        resetPasswordData: null
    },

    extraReducers: (bulider) => {
        bulider.addCase(forgotPassword.fulfilled, (preState, actions) => {
            preState.forgotPasswordData = actions.payload;
        }
        )
        bulider.addCase(resetPassword.fulfilled, (prevState, actions) => {
            prevState.resetPasswordData = actions.payload

        }
        )


    }

})


export default passwordSlice.reducer