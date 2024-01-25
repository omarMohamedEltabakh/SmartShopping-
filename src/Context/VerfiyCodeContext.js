import axios from "axios"
import { createContext } from "react"




export const resetCodeContext = createContext()

const ResetCodeContextProvider = (props) => {



    const verfiycode = (code) => {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
            resetCode: code
        })

    }





    return <resetCodeContext.Provider value={{verfiycode}}>
        {props.children}
    </resetCodeContext.Provider>

}

export default ResetCodeContextProvider 
