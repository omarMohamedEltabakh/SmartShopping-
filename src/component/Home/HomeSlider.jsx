

import Slider from "react-slick";
import image1 from "../../Assets/Images/homeImage1.png"
import image2 from "../../Assets/Images/homeImage2.png"


const HomeSlider = () => {
    var settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        
      
    };


    return <>
    <div className=" container  pt-2">

        <div className=" rounded-2  overflow-hidden  w-100  mx-auto">
          <Slider  {...settings}>
            <img className="w-100 " height={450}  src={image1} alt="" />

            <img className="w-100 " height={450}  src={image2} alt="" />

          </Slider>
        </div>
    </div>

  
        

    </>

}

export default HomeSlider;
