import axios from "axios";
import "./CategorySlider.module.css"
import Slider from "react-slick";
import { useQuery } from "react-query";
import { useMediaQuery } from "@react-hook/media-query";

const CategorySlider = () => {

  function getCategorySlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery("categorySlider", getCategorySlider);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const getSlidesToShow = () => {
    return isSmallScreen ? 4 : 6;
  };

  var settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    infinite: true,
    speed: 100,
    slidesToShow:  getSlidesToShow(),
    slidesToScroll: 1,


  };

  return <>
    <div className="container">

      <Slider {...settings}>

        {data?.data.data.map((category) =>
          <img key={category._id} className="w-100 my-3 rounded-1 overflow-hidden " height={200} src={category.image} alt="" />
        )}
      </Slider>
    </div>

  </>

}



export default CategorySlider;