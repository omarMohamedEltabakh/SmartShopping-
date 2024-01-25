import { useFormik } from "formik";
import "./RePassword.css"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Redux/PasswordSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { Helmet } from "react-helmet";


const RePassword = () => {


  // hooks=====================================================>
  const { t, i18n } = useTranslation()
  const language = localStorage.getItem("language");
  const [checkLoading, setcheckLoading] = useState("false");
  const dispath = useDispatch()
  const navigate = useNavigate()
  const { resetPasswordData } = useSelector((store) => store.password);




  // navigate to another component==============================>
  useEffect(() => {
    if (resetPasswordData?.token) {
      setcheckLoading("false");
      localStorage.setItem("token", resetPasswordData.token);
      navigate('/signin');
    }
  }, [navigate, resetPasswordData]);


  // validationSchema===============================================>
  const validationSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is requrid"),
    newPassword: Yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d ]{8,}$/, "Enter a password with- At least one letter (uppercase or lowercase).At least one digit (0-9).Minimum length of 8 characters"),
  })



  // handlePasswordSumbit==========================================>
  const handlePasswordSumbit = async (values) => {
    setcheckLoading("true")
    dispath(resetPassword(values))

  }


  // formik========================================================>
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    }, onSubmit: handlePasswordSumbit, validationSchema
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

    <section className="RePassword d-flex flex-column align-items-center">


      <form dir={`${language === "ar" ? "rtl" : "ltr"}`} className="w-50 shadow " onSubmit={formik.handleSubmit}>

        <label className="h5" htmlFor="email">{t("email")}</label>
        <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="form-control mt-2" type="text" name="email" />
        {(formik.touched.email && formik.errors.email) ? <div className=" alert alert-danger py-2 mt-2">{formik.errors.email}</div> : ""}

        <label className="h5 mt-4" htmlFor="newPassword">{t("RePassword")}</label>
        <input onChange={formik.handleChange} value={formik.values.newPassword}  onBlur={formik.handleBlur}  className="form-control mt-2" type="text" name="newPassword" />
        {(formik.touched.newPassword && formik.errors.newPassword) ? <div className=" alert alert-danger py-2 mt-2">{formik.errors.newPassword}</div> : ""}

        {checkLoading === "true" ? <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="signInBtn  shadow  py-2 disabled mt-4 mb-1 ">
          Loading...
          <span className="spinner-border spinner-border-sm fs" aria-hidden="true"></span>
        </button>
          : <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="shadow-md" >{t("verify")}</button>
        }

      </form>


    </section>
    <Helmet>
      <title>RePassword</title>
    </Helmet>
  </>

}



export default RePassword;