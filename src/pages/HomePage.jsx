import React, { useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import TrailerModal from "../components/TrailerModal";
import axios from "axios";
import Swal from "sweetalert2";

const HomePage = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const [youtubeKey, setYoutubeKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const handleCardClick = async (item) => {
    try {
      const type = item.media_type || (item.title ? "movie" : "tv");
      const response = await axios.get(`/${type}/${item.id}/videos`);
      const trailer = response.data.results?.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setYoutubeKey(trailer.key);
        setShowTrailer(true);
      } else {
        Swal.fire({
          icon: "info",
          title: "No Trailer Found",
          text: "This movie/show has no trailer available.",
          confirmButtonColor: "#f97316",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error loading trailer",
        text: error.message,
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div>
      <BannerHome />

      <div className="container mx-auto px-3 my-10">
        <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white">
          Trending Show
        </h2>
        <div className="overflow-hidden">
          <div className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 p-2 overflow-x-scroll scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-orange-500 cursor-pointer">
            {Array.isArray(trendingData) && trendingData.length > 0 ? (
              trendingData.map((data, index) => (
                <Card
                  key={data.id}
                  data={data}
                  index={index + 1}
                  trending={true}
                  onClick={() => handleCardClick(data)}
                />
              ))
            ) : (
              <p className="text-white">No trending data found.</p>
            )}
          </div>
        </div>
      </div>

      {/* TrailerModal Usage */}
      {showTrailer && (
        <TrailerModal
          youtubeKey={youtubeKey}
          onClose={() => {
            setShowTrailer(false);
            setYoutubeKey("");
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
