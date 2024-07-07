import imageMobile1 from "../assets/banners/img1_mobile.jpg";
import image1 from "../assets/banners/img1.webp";
import imageMobile2 from "../assets/banners/img2_mobile.webp";
import image2 from "../assets/banners/img2.webp";
import imageMobile3 from "../assets/banners/img3_mobile.jpg";
import image3 from "../assets/banners/img3.jpg";
import imageMobile4 from "../assets/banners/img4_mobile.jpg";
import image4 from "../assets/banners/img4.jpg";
import imageMobile5 from "../assets/banners/img5_mobile.png";
import image5 from "../assets/banners/img5.webp";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImage = [
    imageMobile1,
    imageMobile2,
    imageMobile3,
    imageMobile4,
    imageMobile5,
  ];
  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const prevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto  px-4 rounded ">
      <div className=" h-56 md:h-72  w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
          <div className="flex justify-between w-full text-2xl">
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={prevImage}
            >
              <FaAngleLeft />
            </button>

            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop-version */}
        <div className="md:flex h-full w-full overflow-hidden hidden">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div
                key={index}
                className="w-full h-full min-w-full min-h-full  transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full"></img>
              </div>
            );
          })}
        </div>

        {/* Mobile-version */}

        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImage.map((imageUrl, index) => {
            return (
              <div
                key={index}
                className="w-full h-full min-w-full min-h-full  transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageUrl}
                  className="w-full h-full object-cover"
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
