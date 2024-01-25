import { useFormik } from "formik";
import "./ForgotPassword.css"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Redux/PasswordSlice";
import { Helmet } from "react-helmet";


const ForgotPassword = () => {




  // hooks======================================================>
  const { t, i18n } = useTranslation()
  const language = localStorage.getItem("language");
  const [checkLoading, setcheckLoading] = useState("false")
  const { forgotPasswordData } = useSelector((store) => store.password);
  const navigate = useNavigate();
  const dispath = useDispatch();

  // navigate to another component===============================>
  useEffect(() => {
    if (forgotPasswordData.statusMsg === "success") {
      setcheckLoading("false");
      navigate("/verfiycode");
    }
  }, [forgotPasswordData])


  // handlePasswordSumbit========================================>
  const handlePasswordSumbit = (values) => {
    dispath(forgotPassword(values.email));
    setcheckLoading("true");
  }

  // formik=====================================================>
  const formik = useFormik({
    initialValues: {
      email: "",
    }, onSubmit: handlePasswordSumbit
  })



  // check current language=================================>
  useEffect(() => {
    if (localStorage.getItem("language") === "ar") {
      i18n.changeLanguage('ar');
    } else {
      i18n.changeLanguage('en');
    }
  }, [i18n]);



  return <>
  
    <section className="forgotPassword d-flex flex-column align-items-center">


      <form dir={`${language === "ar" ? "rtl" : "ltr"}`} className="w-50 shadow " onSubmit={formik.handleSubmit}>

        <label className="h5" htmlFor="email">{t("EnterYourEmail")}</label>
        <input onChange={formik.handleChange} value={formik.values.email} className="form-control mt-3" type="text" name="email" />

        {checkLoading === "true" ? <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="signInBtn  shadow  py-2 disabled mt-4 mb-1 ">
          Loading...
          <span className="spinner-border spinner-border-sm fs" aria-hidden="true"></span>
        </button>
          : <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="shadow-md" >{t("verify")}</button>
        }

      </form>

    </section>
    <Helmet>
    <title>forgotPassword</title>
  </Helmet>

  </>

}



export default ForgotPassword;