import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const height = 500;
function CarouselLoader() {
  const images = [
    "https://res.cloudinary.com/ajaui/image/upload/v1689920479/TallHero_3000X1200_Unrec._CB593464763__xbb2uz.jpg",
    "https://res.cloudinary.com/ajaui/image/upload/v1689920478/Sports_3000._CB603439592__rgiqwf.jpg",
    "https://res.cloudinary.com/ajaui/image/upload/v1689920478/Skincare-Herofader-PC._CB594538667__evfsaw.jpg",
    "https://res.cloudinary.com/ajaui/image/upload/v1689920478/PC_3000x1200_2x._CB602705602__umkrx4.jpg",
    "https://res.cloudinary.com/ajaui/image/upload/v1689920477/61aURrton0L._SX3000__vmzdxk.jpg",
    "https://res.cloudinary.com/ajaui/image/upload/v1689920477/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876__n80d9h.jpg",
    "https://res.cloudinary.com/ajaui/image/upload/v1689920477/MFD_GW_PC-1X._CB602607458__lnweok.jpg",
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
