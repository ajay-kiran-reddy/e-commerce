import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { isMobileView } from "../../utils/globalUtils";

const height = isMobileView() ? 200 : 500;
function CarouselLoader() {
  const images = [
    "https://res.cloudinary.com/ajaui/image/upload/v1690771162/e8aea330-10cd-4778-91ab-da9678161ec11690739860849-PB-Banner_Wishlist-Now_umdl9i.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771162/b656a7f4-4688-4997-bb7c-54b78793981e1658752386588-Western-Wear_Desk_hgh17n.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771162/8792d615-bdb3-4d83-92ca-512ae53558441690744755579-DB_jgjz5p.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771161/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK_cse1ze.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771161/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk_hdzxuh.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771161/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner_fpbmyg.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771161/84b6a214-9eb3-49eb-9f9d-72cec56ec5d71659019908592-Indian-Wear_DK--1-_cxndqw.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771161/0174e4d7-448c-4746-8572-69461ad5be101659020268081-Tops---Tees_Desk_tm8bkq.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771161/6107d28b-2bcb-44e6-9743-655b54550b8f1659020199598-Workwear_Desk--1-_azhnbo.webp",
    "https://res.cloudinary.com/ajaui/image/upload/v1690771161/179e278f-77ee-44c2-bf39-9f00b0cd08e01658752429301-Handbags_Desk_oolafk.webp",
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
