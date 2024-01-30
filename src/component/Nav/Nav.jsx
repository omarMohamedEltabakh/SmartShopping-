/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css"
import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import DarkMode from "./DarkMode";
import Modal from './Modal';
import Cart from "../Cart/Cart";
import { cartContext } from "../../Context/CartContext";
import Favorites from "../Favorites/Favorites";
import { wishListContext } from "../../Context/WishListContext";



const Nav = () => {

  // hooks=============================================>
  const navigate = useNavigate();
  const { numberOfCartProduct } = useContext(cartContext)
  const { wishListCount } = useContext(wishListContext)

  // signOut===========================================>
  const [signOut, setSignOut] = useState("false");
  useEffect(() => {

    if (signOut === "true") {
      localStorage.removeItem("token");
      navigate('/signin')
    }
  }, [navigate, signOut])

  // token=============================================>
  const [token, setToken] = useState(localStorage.getItem("token"));

  // set languages=====================================>
  const { t, i18n } = useTranslation();
  const [language, setlanguage] = useState(localStorage.getItem("language") ?? "en")

  const location = useLocation()

  // check languages==================================>
  useEffect(() => {
    if (localStorage.getItem("language") === "ar") {
      i18n.changeLanguage('ar');
    } else {
      i18n.changeLanguage('en');
    }
    setToken(localStorage.getItem("token"))
  }, [i18n, location.pathname]);




  return <>

    <nav className="fw-semibold shadow fixed-top">

      <div className="container d-flex justify-content-between mx-auto  ">


        {/* col1===============================================================> */}
        <div className="    d-flex align-items-center colum-1  ">

          <Link to={"/"} className="logo me-5  ">{t("shopWithUs")}</Link>


          {/* cart and favorite=========================================> */}
          {token ? <div dir={`${language === "ar" ? "rtl" : "ltr"}`} className="cartAndFavorite   d-flex align-items-center   ">

            {/* cart==================================================> */}
            <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="d-flex align-items-center me-2  cursor-pointer p-0   m-0">
              <div className="position-relative    ">
                <i className="fa-solid fs-5 px-1 mainColor    cartIcon  fa-cart-shopping"></i>
                <div className="cartCount d-flex justify-content-center align-items-center shadow-lg ">
                  <h6 className="m-0 p-0">{numberOfCartProduct ? numberOfCartProduct : 0}</h6>
                </div>
              </div>
              <h6 className={`${language === "en" ? "ms-2" : ""} m-0`}> {t("shoppingCart")}</h6>
            </div>

            {/* favorite==========================================> */}
            <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" className=" d-flex align-items-center me-2 cursor-pointer    m-0">
              <div className="position-relative">
                <i className="fa-solid fa-heart fs-5  m-0 px-1 navCart  cursor-pointer  "></i>
                <div className="cartCount d-flex justify-content-center align-items-center shadow-lg ">
                  <h6 className="p-0 m-0 ">{wishListCount ? wishListCount : 0}</h6>
                </div>
              </div>
              <h6 className={`${language === "en" ? "ms-2" : ""} m-0`}> {t("Favorite")}</h6>

            </div>

          </div> : ""}


          <Favorites />
          <Cart />
        </div>





        {/* col2===============================================================> */}
        {/* navItems==================================================> */}
        <div dir={`${language === "ar" ? "rtl" : "ltr"}`} className="navItems      justify-content-center  d-flex align-items-center  position-relative  ">
          <NavLink exact="true" activeclassname="active" className={`navItem py-4  ${language === "en" ? "ps-0" : ""}`} to={"/"}>{t("home")}</NavLink>
         
          <div className=" allProducts ">
            <a className="py-4 navItem cursor-pointer  d-flex justify-content-center " href="" >{t("products")}</a>

            <div className=" position-absolute  animate__animated allProductMeun cursor-pointer  px-3    rounded-1 d-none shadow py-3 d-flex flex-column align-items-center">
              <NavLink activeclassname="active" to={"menClothing"} >{t("menClothing")}</NavLink>
              <NavLink activeclassname="active" to={"WomenClothing"}>{t("WomenClothing")}</NavLink>
              <NavLink activeclassname="active" to={"ElectronicDevices"}>{t("ElectronicDevices")}</NavLink>
            </div>

          </div>

          <NavLink activeclassname="active" className={`navItem py-4  ${language === "ar" ? "ps-0" : ""}`} to={"/sale"}>{t("sale")}</NavLink>

        </div>
        {token ? <div /> : ""}






        {/* col3===============================================================> */}
        {/* languageToggle===========================================> */}
        <div className="d-flex align-items-center     justify-content-end colum-3     ">


          <p onClick={() => { i18n.changeLanguage(language === "ar" ? "en" : "ar"); localStorage.setItem("language", language === "ar" ? "en" : "ar"); setlanguage(localStorage.getItem("language")) }} className="m-0 pe-3 cursor-pointer text-uppercase">{language === "ar" ? "en" : "ar"}</p>

          {token ?
            <Link>
              <p onClick={() => setSignOut("true")} className="cursor-pointer m-0 pe-3 ">{t("signOut")}</p>
            </Link> :

            <Link to={"/signIn"}>
              <p className="cursor-pointer m-0 pe-3 ">{t("title")}</p>
            </Link>
          }

          <DarkMode />
          <Modal />
          <i className="fa-solid fa-bars fs-4 mainColor ms-3 navBarMenu d-none cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>


        </div>

      </div>

    </nav>
  </>


}



export default Nav;