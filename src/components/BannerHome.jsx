import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import axios from "axios";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageUrl = useSelector((state) => state.movieoData.imageUrl);
  const [loadedImages, setLoadedImages] = useState({});
  const [showPlayer, setShowPlayer] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

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

  const handlePlay = async (data) => {
    try {
      const isMovie = !!data.title;
      const endpoint = isMovie
        ? `/movie/${data.id}/videos`
        : `/tv/${data.id}/videos`;

      const res = await axios.get(endpoint);

      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setVideoKey(trailer.key);
        setShowPlayer(true);
      } else {
        alert("Trailer not available");
      }
    } catch (err) {
      console.error("Trailer fetch error:", err);
      alert("Failed to load trailer");
    }
  };

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
              loading={index === 0 ? "eager" : "lazy"}
              onLoad={() =>
                setLoadedImages((prev) => ({ ...prev, [index]: true }))
              }
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                loadedImages[index] ? "opacity-100" : "opacity-0"
              }`}
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
              <button
                onClick={() => handlePlay(data)}
                className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500"
              >
                Play now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 z-20 hidden lg:flex items-center justify-between px-4 pointer-events-none">
        <button
          onClick={handlePrevious}
          className="pointer-events-auto bg-white p-2 rounded-full text-xl text-black shadow-lg hover:scale-110 transition"
        >
          <FaAngleLeft />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto bg-white p-2 rounded-full text-xl text-black shadow-lg hover:scale-110 transition"
        >
          <FaAngleRight />
        </button>
      </div>

      {showPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerHome;
