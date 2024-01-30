import React, { useEffect, useState } from 'react'
import "./Alert.css"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Alert() {
    // hooks=================================================================>
    const language = localStorage.getItem("language");
    const token = localStorage.getItem("token")
    const { t, i18n } = useTranslation()
    const [showModal, setShowModal] = useState(false);

    // show sign up alert=====================================================>
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowModal(true);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };


    // check languages========================================================>
    useEffect(() => {
        
        if (localStorage.getItem("language") === "ar") {
            i18n.changeLanguage('ar');
        } else {
            i18n.changeLanguage('en');
        }

    }, [i18n]);


    return (
        <div>



            {showModal === true && token == null ? <div className="modal fade show alertModal " tabIndex="-1" style={{ display: 'block' }}>
                <div className="modal-dialog modal-lg  modal-dialog-centered">

                    <div dir={`${language === "ar" ? "rtl" : "ltr"}`} className="modal-content ">

                        <div className="modal-header border-0">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{t("signUp")} </h1>
                            <i onClick={handleClose} aria-label="Close" className="fa-solid fa-xmark cursor-pointer fs-5"></i>
                        </div>

                        <div className="modal-body  modalMainContent d-flex  align-items-center justify-content-between py-5  flex-wrap  ">
                            <h6 className='text-center   w-100'> {t("alert")}</h6>
                            <div className=' mt-2   mx-auto d-flex  flex-wrap   align-items-center justify-content-center  '>
                                <button className=' mt-2 mx-3 shadow '><Link to={"signup"}>{t("signUp")}</Link></button>
                                <button className='mt-2 shadow mx-3 '><Link to={"signin"}>{t("signIn")}</Link></button>
                            </div>

                        </div>


                    </div>
                </div>
            </div> : ""}
        </div>
    );
};


