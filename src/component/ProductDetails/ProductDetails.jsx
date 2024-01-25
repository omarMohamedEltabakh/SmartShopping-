import { useParams } from "react-router-dom";
import "./ProductDetails.css"
import axios from "axios";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { cartContext } from './../../Context/CartContext';
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";


const ProductDetails = () => {
  // hooks===========================================>
  let { id } = useParams()
  const { t } = useTranslation()
  const { addToCart, numberOfCartItem, getCartItems } = useContext(cartContext)
  const token = localStorage.getItem("token")

  // slider setting =================================>
  var settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,


  };

  // getProductDetails================================>
  const getProductDetails = (id) => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  const { data, isLoading } = useQuery("getProductDetails", () => getProductDetails(id))

  // call api======================================>
  useEffect(() => {
    getProductDetails(id)
  }, [id])

  // addProductToCart=================================>

  const addProductToCart = async (id) => {

    const { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success(data?.message, {
        duration: 1000,
        position: 'buttom-right',
      });
      numberOfCartItem()
      getCartItems()
    }
  }

  // helmet===================================================>



  return <>
    <Helmet>
      <title>{data?.data.data.title}</title>
    </Helmet>

    <section className="ProductDetails  d-flex justify-content-center align-items-center ">

      {data?.data.data ? <div className="row     align-items-center container   mx-auto">

        <div className="  col-lg-4 col-md-6 col-sm-6  rounded-2 productDetailsCol1 ">
          <Slider className="rounded-3  overflow-hidden" {...settings}>
            {data?.data.data.images.map((image) => <img key={data?.data.data.id} src={image} className='w-100 '></img>)}
          </Slider>
        </div>

        <div className="col-lv8 col-md-6 col-sm-6 productDetailsCol2">
          <h2 className='h3 fw-semibold'>{data?.data.data.title}</h2>
          <p className="h5 fw-normal mainColor ">{data?.data.data.description}</p>
          <h4 className=' fw-normal'>{data?.data.data.category.name}</h4>
          <h6 className='mt-3 fw-normal '>Price:{data?.data.data.price} EGP</h6>
          <div className='d-flex justify-content-between mt-3 w-75 fw-normal '>
            <span >{data?.data.data.price} EGP</span>
            <span><i className='fas fa-star rating-color star '></i>{data?.data.data.ratingsAverage}</span>
          </div>
          <div className="d-flex justify-content-center  w-75">

            {token ? <button onClick={() => addProductToCart(data?.data.data.id)} className="addToCartBtn shadow  ">{t("addToCart")}</button> : ""}
          </div>

        </div>

      </div> : ""}
    </section>

  </>

}



export default ProductDetails;