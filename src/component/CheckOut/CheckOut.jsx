import { useFormik } from "formik";
import "./CheckOut.css"
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";


const CheckOut = () => {

  // hooks==================================>
  const { t } = useTranslation()
  const { PayNow } = useContext(cartContext)
  let { id } = useParams();
  const [check, setcheck] = useState(false)


  // checkOutSumbit==============================>
  const checkOutSumbit = async (values) => {
    setcheck(true)
    const { data } = await PayNow(id, values);
    console.log(data);

    if (data.status === "success") {
      setcheck(false)
      window.location.href = data.session.url;
    }


  }

  // formik======================================>
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    }, onSubmit: checkOutSumbit
  })



  return <>

    <section className="checkOut border d-flex align-items-center justify-content-center">


      <form className=" mb-5 w-50 shadow-lg d-flex flex-column  rounded-2" onSubmit={formik.handleSubmit}>

        <label className="fw-semibold" htmlFor="name">{t("name")}</label>
        <input className="form-control mt-2" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" type="text" name="details" />

        <label className="fw-semibold mt-4" htmlFor="phone">{t("phone")}</label>
        <input className="form-control mt-2" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" type="phone" name="phone" />

        <label className="fw-semibold mt-4" htmlFor="city">{t("city")}</label>
        <input className="form-control mt-2" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id="city" type="text" name="city" />

        {check === true ? <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="signInBtn  shadow  py-2 disabled mt-4 mb-1 ">
          Loading...
          <span className="spinner-border spinner-border-sm fs" aria-hidden="true"></span>
        </button> :
          <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="shadow">Pay Now</button>

        }
      </form>

    </section>
    <Helmet>
      <title>Check Out</title>
    </Helmet>
  </>

}



export default CheckOut;