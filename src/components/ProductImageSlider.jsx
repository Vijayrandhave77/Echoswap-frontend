import React, { useState } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductImageSlider = ({ gallery }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const fadeImages = gallery?.map((img) => {
    const gallery = {
      src: img,
      tittle: "images",
    };

    return gallery;
  });

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 -z-0">
      <Fade
        autoplay
        duration={3000}
        pauseOnHover
        prevArrow={
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full ml-8">
            <FaChevronLeft size={24} />
          </button>
        }
        nextArrow={
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full mr-8">
            <FaChevronRight size={24} />
          </button>
        }
      >
        {fadeImages?.map((img, i) => (
          <div key={i}>
            <img
              src={img?.src}
              alt={`Slide ${i}`}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </Fade>

      {open && (
        <Lightbox
          open={open}
          index={index}
          close={() => setOpen(false)}
          slides={fadeImages}
        />
      )}
    </div>
  );
};

export default ProductImageSlider;
