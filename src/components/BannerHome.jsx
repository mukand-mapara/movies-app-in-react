import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageUrl = useSelector((state) => state.movieoData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    } else {
      setCurrentImage(bannerData.length - 1); 
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, bannerData.length]);

  if (!bannerData.length) return null;

  return (
    <section className="w-full h-full relative overflow-hidden">
      {/* Slide wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentImage * 100}%)` }}
      >
        {bannerData.map((data, index) => (
          <div
            key={data.id}
            className="w-full min-w-full min-h-[450px] lg:min-h-[90vh] relative"
          >
            <img
              src={imageUrl + data.backdrop_path}
              alt={data.title || data.name}
              className="w-full h-full object-cover"
            />

            {/* Overlay gradient */}
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-6 px-3 max-w-md text-white z-10">
              <h2 className="font-bold text-2xl lg:text-4xl drop-shadow-2xl">
                {data?.title || data?.name}
              </h2>
              <p className="line-clamp-3 my-2">{data.overview}</p>
              <div className="flex items-center gap-4">
                <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                <span>|</span>
                <p>Views: {Number(data.popularity).toFixed(0)}</p>
              </div>
              <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                Play now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-20 hidden lg:flex items-center justify-between px-4 group-hover:flex">
        <button
          onClick={handlePrevious}
          className="bg-white p-2 rounded-full text-xl text-black shadow-lg hover:scale-110 transition"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={handleNext}
          className="bg-white p-2 rounded-full text-xl text-black shadow-lg hover:scale-110 transition"
        >
          <FaAngleRight />
        </button>
      </div>
    </section>
  );
};

export default BannerHome;
