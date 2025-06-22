import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Card = ({ data, trending, index, onClick }) => {
  const imageUrl = useSelector((state) => state.movieoData.imageUrl);
  const title = data?.title || data?.name || "Untitled";
  const date = data?.release_date || data?.first_air_date;
  const rating = data?.vote_average || 0;
  const poster = data?.poster_path
    ? imageUrl + data.poster_path
    : "https://via.placeholder.com/230x345?text=No+Image";

  return (
    <div
      onClick={onClick}
      className="w-full min-w-[230px] max-w-[230px] rounded h-80 overflow-hidden relative bg-neutral-800"
    >
      <img src={poster} alt={title} className="w-full h-full object-cover" />

      {trending && (
        <div className="absolute top-4 left-0 py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full text-white text-sm">
          #{index} Trending
        </div>
      )}

      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2 text-white">
        <h2 className="line-clamp-1 text-lg font-semibold">{title}</h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>
            {moment(date).isValid()
              ? moment(date).format("MMM Do YYYY")
              : "Unknown"}
          </p>
          <p className="bg-black px-1 rounded-full text-xs">
            ⭐ {rating.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
