import axios from "axios"
import "./Allorders.module.css"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";




const Allorders = () => {


  // hooks====================================================>
  const token = localStorage.getItem("token")
  const id = jwtDecode(token).id;
  const [allOrderData, setallOrderData] = useState(null);
  const { t } = useTranslation();
  const language = localStorage.getItem("language")

  // getAllOrders========================================>
  const getAllOrders = async () => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
    setallOrderData(data)
  }
  const allCartItemArrays = allOrderData?.map((item) => item.cartItems).flat() || [];


  // calculate all price =========================================>
  const allPriceArray = allOrderData?.map((item) => item.totalOrderPrice).flat() || [];
  const totalSum = allPriceArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);




  // call api=======================================>
  useEffect(() => {
    getAllOrders()
  }, [])


  return <>
    <section className="home pb-5">

      {/* cart=======================> */}

      <div className="container pt-2 ">

        <div className="row mt-3 ">
          <h4 dir={`${language === "ar" ? "rtl" : "ltr"}`} >{t("TotalPrice")}:{totalSum}</h4>

          {allCartItemArrays?.map((product, index) =>

            <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 carts  ">

              <div className="pb-3 rounded-2 mt-4 cart  overflow-hidden shadow ">
                <div className="overflow-hidden">
                  <img height={350} className="w-100 overflow-hidden " src={`${product.product.imageCover}`} alt="" />

                </div>
                <div className="cartContent px-3">
                  <h5 className="mt-2 fw-semibold productCategory ">{product.product.category.name}</h5>
                  <h6 className="fw-normal fw-medium ">{product.product.title.split(" ").slice(0, 2).join(" ")}</h6>
                  <div className="priceAndRate d-flex justify-content-between">
                    <span className="fw-medium" >{product.price} EGP</span>
                    <span className="fw-medium"><i className='fas fa-star rating-color star pe-1 '></i>{product.ratingsAverage}</span>
                  </div>


                </div>
              </div>
            </div>




          )}
        </div>

      </div>


    </section>
    <Helmet>
      <title>Allorders</title>
    </Helmet>
  </>


}



export default Allorders;