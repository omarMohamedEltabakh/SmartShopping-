import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const cartContext = createContext();

const CartContextProvider = (props) => {
    // AddProductToCart======================================>
    const token = localStorage.getItem("token")
    const headers = {
        token: token
    }
    const addToCart = (id) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id,
        }, {
            headers
        })
    }

    // getProductFromCart===================================>
    const getCartItems = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)
    }

    // delete cartItem=========================================>
    const DeleteCartItem = (id) => {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)

    }

    // Update cart product quantity===============================>

    const UpdateCartProductQuantity = (id, count) => {

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count
        }, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)



    }

    // get number of cart Items===============================>
    const [numberOfCartProduct, setNumberOfCartProduct] = useState(null)

    const numberOfCartItem = async () => {
        
        const { data } = await getCartItems();
        setNumberOfCartProduct(data?.numOfCartItems);
    }

    const [cartItemIds, setcartItemIds] = useState(null)
    // getIdFromCart====================================>
    const getIdFromCart = async () => {
        const { data } = await getCartItems();
        setcartItemIds(data?.data.products)
    }


    // checkOut ============================================>
    const PayNow = (id,shippingAddress) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{
            shippingAddress
        },{
            headers
        });

    }

    // get allorders=========================================>
    // const allOrders = (id,shippingAddress) => {

    //     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,{
    //         shippingAddress
    //     },{
    //         headers
    //     })
      
    // }
    

    // call api
    useEffect(() => {
        if (token) {
            numberOfCartItem()
            getIdFromCart()
        }
    }, [])









    return <cartContext.Provider value={{ addToCart, getCartItems, DeleteCartItem, UpdateCartProductQuantity, 
    numberOfCartItem, numberOfCartProduct, cartItemIds, getIdFromCart,PayNow }}>
        {props.children}
    </cartContext.Provider>
}

export default CartContextProvider;