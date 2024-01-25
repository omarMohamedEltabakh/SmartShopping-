import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./Modal.css"


const Modal = () => {

    const { t } = useTranslation();
    const token = localStorage.getItem("token")

    return <>

        {/* modal===========================================> */}

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-header border-0">
                        <h1 className="modal-title fs-5 " id="exampleModalLabel">Navigation</h1>
                        <i data-bs-dismiss="modal" className="fa-solid cursor-pointer fa-xmark fs-5"></i>
                    </div>

                    <div className="modal-body  d-flex flex-column align-items-center">

                        <NavLink exact="true" activeclassname="active" className={"navItem pt-3 "} to={"/"}>{t("home")}</NavLink>
                        {token ?
                            <div className=" mt-4 ">

                                <h6 data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="d-flex align-items-center me-2 cursor-pointer     m-0">
                                    <i className="fa-solid fs-5 px-1 mainColor  fa-cart-shopping"></i>
                                    {t("shoppingCart")}
                                </h6>
                                <h6 data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" className="d-felx align-items-center me-2 cursor-pointer mt-4  d-flex justify-content-center    m-0">
                                    <i className="fa-solid fa-heart fs-5  m-0 px-1 navCart  cursor-pointer "></i>
                                    {t("Favorite")}
                                </h6>

                            </div> : ""}
                        <NavLink activeclassname="active " data-bs-toggle="dropdown" aria-expanded="false" className="navItem mt-4 allProductLink" to={"AllProducts"} >{t("products")}</NavLink>


                        <ul className="dropdown-menu allProductMeun ">
                            <li><NavLink activeclassname="active" to={"menClothing"} className="dropdown-item" >{t("menClothing")}</NavLink> </li>
                            <li><NavLink activeclassname="active" to={"WomenClothing"} className="dropdown-item" >{t("WomenClothing")}</NavLink> </li>
                            <li><NavLink activeclassname="active" to={"ElectronicDevices"} className="dropdown-item" >{t("ElectronicDevices")}</NavLink> </li>
                        </ul>


                        <NavLink activeclassname="active" className={"navItem pb-4 mt-4  "} to={"/sale"}>{t("sale")}</NavLink>

                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Modal;
