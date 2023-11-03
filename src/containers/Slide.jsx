import { useState, useRef, useEffect } from "react";
const images = ["https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/07/banner/GTN-2880-800-1920x533.png",
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/06/banner/ip14-AW-S8-2880-800-min-1920x533-1.png",
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1170x300/https://cdn.tgdd.vn/2023/06/banner/2400-600-1920x480.png",
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1170x300/https://cdn.tgdd.vn/2023/07/banner/iPad-10-GTQ2400-600-1920x480.png",
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1170x300/https://cdn.tgdd.vn/2023/06/banner/AW-S8-2400-600-1920x480-1.png",
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/07/banner/2880-800-1920x533.png",
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/07/banner/iPad-10-do-more-2880-800-1920x533.png"];
const delay = 5000;

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((tmp, index) => (
          <img
            className="slide"
            key={index}
            src={tmp}
          ></img>
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
