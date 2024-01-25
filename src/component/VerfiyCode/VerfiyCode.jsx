import { useFormik } from "formik";
import "./VerfiyCode.css"
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetCodeContext } from "../../Context/VerfiyCodeContext";
import { Helmet } from "react-helmet";


const VerfiyCode = () => {



  // hooks==========================================>
  const { t, i18n } = useTranslation()
  const language = localStorage.getItem("language");
  const [checkLoading, setcheckLoading] = useState("false");
  const { verfiycode } = useContext(resetCodeContext);
  const navigate = useNavigate()


  // handlePasswordSumbit==================================================>
  const handlePasswordSumbit = async (values) => {
    setcheckLoading("true");
    const { data } = await verfiycode(values.resetCode);
    if (data.status === "Success") {
      navigate("/repassword")
      setcheckLoading("false")
    }


  }

  // formik================================================================>
  const formik = useFormik({
    initialValues: {
      resetCode: "",
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
    <section className="VerfiyCode d-flex flex-column align-items-center">


      <form dir={`${language === "ar" ? "rtl" : "ltr"}`} className="w-50 shadow " onSubmit={formik.handleSubmit}>

        <label className="h5" htmlFor="resetCode">{t("Code")}</label>
        <input onChange={formik.handleChange} value={formik.values.resetCode} className="form-control mt-3" type="text" name="resetCode" />

        {checkLoading === "true" ? <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="signInBtn  shadow  py-2 disabled mt-4 mb-1 ">
          Loading...
          <span className="spinner-border spinner-border-sm fs" aria-hidden="true"></span>
        </button>
          : <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="shadow-md" >{t("verify")}</button>
        }

      </form>


    </section>
    <Helmet>
      <title>VefiyCode</title>
    </Helmet>
  </>

}



export default VerfiyCode;