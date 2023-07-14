import React from "react";
import { Carousel } from "react-responsive-carousel";
import slider1 from "../../assets/images/carousel/slider1.jpg";
import slider2 from "../../assets/images/carousel/slider2.jpg";
import slider3 from "../../assets/images/carousel/slider3.jpg";
import slider4 from "../../assets/images/carousel/slider4.jpg";
import slider5 from "../../assets/images/carousel/slider5.jpg";
import slider6 from "../../assets/images/carousel/slider6.jpg";
import slider7 from "../../assets/images/carousel/slider7.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const height = 500;
function CarouselLoader() {
  const images = [
    slider1,
    slider2,
    slider3,
    slider4,
    slider5,
    slider6,
    slider7,
  ];
  return (
    <Carousel
      axis="horizontal"
      autoPlay={true}
      interval={5000}
      infiniteLoop={true}
      transitionTime={500}
      showThumbs={false}
      showStatus={false}
    >
      {images.map((image) => {
        return <img src={image} height={height} />;
      })}
    </Carousel>
  );
}

export default CarouselLoader;
