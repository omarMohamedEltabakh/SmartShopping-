import "./SignUp.css"
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";


const SignUp = () => {

  // hooks==================================================================>
  const [check, setcheck] = useState("false");
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const { t, i18n } = useTranslation();
  const crrentLanguage = localStorage.getItem("language")


  // validationSchema========================================================>
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "min length is 3").max(15, "max length is 15").required("name is required"),
    email: Yup.string().email("email is invalid").required("email is requrid"),
    password: Yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d ]{8,}$/, "Enter a password with- At least one letter (uppercase or lowercase).At least one digit (0-9).Minimum length of 8 characters"),
    rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")], "repassword doesn't not match the password"),
    phone: Yup.string().required("phone number is required").matches(/^(01)(0|1|2|5)[0-9]{8}$/, "the phone number must be start 01(0,1,2,5) and Eight more numbers")
  })


  // signupSubmit===============================================================>
  const signupSubmit = async (values) => {
    setcheck("true")
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((error) => {
      setError(error.response.data.message);
      setcheck("flase")
    }
    )
    if (data.message === "success") {
      setcheck("true")
      navigate('/signin');
      console.log(data.data);

    }
  }


  // formik=================================================================>
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, onSubmit: signupSubmit, validationSchema

  })


  // check current langauge==============================================>
  useEffect(() => {
    if (localStorage.getItem("language") === "ar") {
      i18n.changeLanguage('ar');
    } else {
      i18n.changeLanguage('en');
    }
  }, [i18n]);


  return <>
     <Helmet>
    <title>SignUp</title>
  </Helmet>
    <section dir={`${crrentLanguage === "ar" ? "rtl" : "ltr"}`} className="signup  d-flex align-items-center  ">
      <div className={`container   shadow-lg rounded-3 w-50   `}   >
        {error ? <div className=" alert alert-danger py-2 mt-2">{error}</div> : ""}

        <h2>{t("signUp")}</h2>
        <form onSubmit={formik.handleSubmit}  >

          <label className="pt-2  fw-medium" htmlFor="name">{t("name")}</label>
          <input id="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} className="form-control mt-1" type="text" name="name" />
          {(formik.touched.name && formik.errors.name) ? <div className=" alert alert-danger py-2 mt-2">{formik.errors.name}</div> : ""}

          <label className="pt-2  fw-medium" htmlFor="email">{t("email")}</label>
          <input id="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="form-control mt-1" type="text" name="email" />
          {(formik.touched.email && formik.errors.email) ? <div className=" alert alert-danger py-2 mt-2">{formik.errors.email}</div> : ""}

          <label className="pt-2  fw-medium" htmlFor="password">{t("password")}</label>
          <input id="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="form-control mt-1" type="password" name="password" />
          {(formik.touched.password && formik.errors.password) ? <div className=" alert alert-danger py-2 mt-2">{formik.errors.password}</div> : ""}

          <label className="pt-2  fw-medium" htmlFor="rePassword">{t("rePassword")}</label>
          <input id="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} className="form-control mt-1" type="password" name="rePassword" />
          {(formik.touched.rePassword && formik.errors.rePassword) ? <div className=" alert alert-danger py-2 mt-2">{formik.errors.rePassword}</div> : ""}

          <label className="pt-2 fw-medium" htmlFor="phone">{t("phone")}</label>
          <input id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="form-control mt-1" type="phone" name="phone" />
          {(formik.touched.phone && formik.errors.phone) ? <div className=" alert alert-danger py-2 mt-2">{formik.errors.phone}</div> : ""}

          {check === "true" ? <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="signupBtn  shadow  py-2 disabled mt-4 mb-1 ">
            Loading...
            <span class="spinner-border spinner-border-sm fs" aria-hidden="true"></span>
          </button>

            : <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="signupBtn mt-3  shadow disabled  mb-1 ">{t("signUp")}</button>

          }

          <div className="d-flex mt-2 justify-content-center  ">
            <Link to={"/signin"}><h6 className="m-0">{t("signIn")}</h6></Link>
          </div>

        </form>
      </div>

    </section>
  </>

}



export default SignUp;