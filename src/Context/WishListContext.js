
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';


export const wishListContext = createContext();

const WishListContextProvider = (props) => {

    const token = localStorage.getItem("token")

    const headers = {
        token: token
    }

    // getWishList=============================================>
    const getWishtList = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
    }
    // addProductToWishList=========================================>
    const addProductToWishList = (productId) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId
        }, {
            headers
        })

    }
    // removeItems from wishList=====================================>
    const removeFromWishList = (id) => {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers
        })
    }

    // getWishListCount=======================================>
    const [wishListCount, setWishListCount] = useState(null);

    const getWishListcount = async () => {
        const { data } = await getWishtList();
        setWishListCount(data.count)

    }

    const [wishListId, setwishListId] = useState(null)
    const getWishListIds = async (params) => {
        const { data } = await getWishtList();
        setwishListId(data.data)


    }


    // call api
    useEffect(() => {
        if (token) {
            getWishListcount()
            getWishListIds()
        }
    }, [])



    return <wishListContext.Provider value={{ getWishtList, addProductToWishList, removeFromWishList, wishListCount, getWishListcount, wishListId, getWishListIds }}>
        {props.children}
    </wishListContext.Provider>

}

export default WishListContextProvider;