import { useTranslation } from "react-i18next";
import "./Favorites.css"
import { useContext, useEffect, useState } from "react";
import { wishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";
import { cartContext } from './../../Context/CartContext';


const Favorites = () => {

  // hooks==========================================>
  const { t } = useTranslation();
  const [wishListData, setwishListData] = useState(null)
  const { getWishtList, removeFromWishList, getWishListcount, getWishListIds } = useContext(wishListContext)
  const { addToCart, numberOfCartItem } = useContext(cartContext)

  // getWishListContent==============================>
  const getWishListContent = async () => {
    const { data } = await getWishtList();
    setwishListData(data.data);
  }

  // call getWishListContent==============================>
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getWishListContent()
    }
  }, [getWishtList])

  // removeWishListItem===========================>
  const removeWishListItem = async (id) => {
    const { data } = await removeFromWishList(id);
    if (data.status === "success") {
      toast.success(t("productDeleted"), {
        duration: 1000,
        position: 'buttom-right',
      })
      getWishListContent()
      getWishListcount()
      getWishListIds()
    }

  }

  // addToCart=======================>

  const addFavoriteToCart = async (id) => {
    const { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(t("AddedToCart"), {
        duration: 1000,
        position: 'buttom-right',
      });
      numberOfCartItem()
    }
  }



  return <>


    <section className="favorite">

      <div className="offcanvas offcanvas-start" data-bs-scroll="true" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        {wishListData ? <>


          <div className="offcanvas-header  d-flex align-items-center">

            <i data-bs-dismiss="offcanvas" aria-label="Close" className="cursor-pointer fs-5 fa-solid fa-xmark fs-5 "></i>
            <h6 data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" className=" fs-5 d-felx align-items-center me-2 cursor-pointer    m-0">
              <i className="fa-solid fa-heart fs-5  m-0 px-1 navCart  cursor-pointer "></i>
              {t("Favorite")}
            </h6>


          </div>
          {/* favorite content========================================> */}

          <div className="offcanvas-body">
            {wishListData?.map((product) =>

              <div key={product._id} className="col-12  cursor-pointer  ">

                <div className="pb-3 rounded-2 mt-4 cart  overflow-hidden shadow ">
                  <div className="overflow-hidden">
                    <img height={350} className="w-100 overflow-hidden " src={product.imageCover} alt="" />

                  </div>
                  <div className="cartContent px-3">
                    <h5 className="mt-2 fw-semibold productCategory mt-3  ">{product.title.split(" ").slice(0, 2).join(" ")}</h5>

                    <div className="incAndDecProduct d-flex justify-content-between  align-items-center">
                      <span className="fw-medium" >{product.price} EGP</span>
                      <button onClick={() => addFavoriteToCart(product._id)} className="checkOut shadow-lg py-1  rounded-2 ">{t("addToCart")}</button>



                    </div>

                    <div className="d-flex justify-content-center my-3">
                      <button onClick={() => removeWishListItem(product._id)} className="btn-sm btn btn-danger btnDelete">{t("Remove")}</button>
                    </div>


                  </div>
                </div>
              </div>




            )}
          </div>
        </> : <h3 className=" d-flex justify-content-center pt-5">Favorite Is Empty</h3>}

      </div>
    </section>
  </>

}



export default Favorites;