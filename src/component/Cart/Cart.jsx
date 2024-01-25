import { useTranslation } from "react-i18next";
import "./Cart.css";
import { useContext, useEffect, useState } from "react";
import { cartContext } from './../../Context/CartContext';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  // hook================================================>
  const { t } = useTranslation();
  const { getCartItems, DeleteCartItem, UpdateCartProductQuantity, numberOfCartItem, getIdFromCart } = useContext(cartContext);
  const [cartProduct, setCartProduct] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(null)
  const token = localStorage.getItem("token")

  // getCartProduct========================================>
  const getCartProduct = async () => {
    const { data } = await getCartItems();
    setCartProduct(data?.data)
    setTotalCartPrice(data?.data.totalCartPrice);

  }
  // deleteCartProduct=======================================>
  const deleteCartProduct = async (id) => {
    const { data } = await DeleteCartItem(id);
    if (data.status === "success") {
      toast.success(t("productDeletedFromCart"), {
        duration: 1000,
        position: 'buttom-center',
        zIndex: 9999,
      });
      numberOfCartItem()
      getIdFromCart()

    }
    getCartProduct()

  }
  // UpdateCartProduct =====================================>
  const updateCartProduct = async (id, count) => {
    await UpdateCartProductQuantity(id, count);
    getCartProduct()
  }



  useEffect(() => {
    if (token) {
      getCartProduct()
    }
  }, [getCartItems])



  return (
    <section className="cart">
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        
    {cartProduct?<>
      <div className="offcanvas-header">
          <div className="d-flex align-items-center me-2 cursor-pointer m-0">
            <i className="fa-solid fs-5 px-1 mainColor fa-cart-shopping"></i>
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              {t("shoppingCart")}
            </h5>
          </div>
          <i data-bs-dismiss="offcanvas" aria-label="Close" className="cursor-pointer fs-5 fa-solid fa-xmark"></i>
        </div>

        {/* cart content==========================> */}
        <div className="offcanvas-body ">
          <div className="row ">
            <div className="d-flex align-items-center justify-content-between">
              <h5 >Total Price: {totalCartPrice}</h5>
              <Link to={`checkOut/${cartProduct?._id}`}>
                <button className="checkOut shadow-lg">{t("CheckOut")}</button>
              </Link>
            </div>


            {cartProduct?.products.map((product) =>

              <div key={product._id} className="col-12  cursor-pointer  ">

                <div className="pb-3 rounded-2 mt-4 cart  overflow-hidden shadow ">
                  <div className="overflow-hidden">
                    <img height={350} className="w-100 overflow-hidden " src={product.product.imageCover} alt="" />

                  </div>
                  <div className="cartContent px-3">
                    <h5 className="mt-2 fw-semibold productCategory mt-3  ">{product.product.title.split(" ").slice(0, 2).join(" ")}</h5>

                    <div className="incAndDecProduct d-flex justify-content-between">
                      <span className="fw-medium" >{product.price} EGP</span>
                      <div className="">
                        <button onClick={() => updateCartProduct(product.product._id, product.count + 1)} className="btn btn-sm border me-1 shadow-md">+</button>
                        <span >{product.count}</span>
                        <button onClick={() => updateCartProduct(product.product._id, product.count - 1)} className="btn btn-sm border ms-1 shadow-md">-</button>
                      </div>

                    </div>

                    <div className="d-flex justify-content-center my-3">
                      <button onClick={() => deleteCartProduct(product.product._id)} className="btn-sm btn btn-danger btnDelete">{t("Remove")}</button>
                    </div>


                  </div>
                </div>
              </div>




            )}
          </div>


        </div>
    
    </>:<h3 className=" d-flex justify-content-center pt-5">Cart Is Empty</h3>}

      </div>
    </section>
  );
};

export default Cart;
