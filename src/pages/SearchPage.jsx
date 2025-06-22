import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import TrailerModal from "../components/TrailerModal";
import Swal from "sweetalert2";

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");
  const [results, setResults] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        const response = await axios.get(`/search/multi?query=${query}`);
        setResults(response.data.results || []);
      } catch (error) {
        console.error("Search fetch error:", error.message);
      }
    };

    fetchResults();
  }, [query]);

  const handlePlayTrailer = async (movie) => {
    try {
      const type = movie.media_type || (movie.title ? "movie" : "tv");
      const res = await axios.get(`/${type}/${movie.id}/videos`);
      console.log("Trailer response:", res.data);

      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        Swal.fire("Oops!", "Trailer not available.", "info");
      }
    } catch (err) {
      console.error("Trailer fetch error:", err.message);
      Swal.fire("Error", "Failed to load trailer.", "error");
    }
  };

  return (
    <div className="container mx-auto px-3 py-10">
      <h1 className="text-2xl font-bold text-white mb-4">
        Search results for "{query}"
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6">
        {results.length > 0 ? (
          results.map((item) => (
            <div
              key={item.id}
              onClick={() => handlePlayTrailer(item)}
              className="cursor-pointer"
            >
              <Card data={item} />
            </div>
          ))
        ) : (
          <p className="text-white">No results found.</p>
        )}
      </div>

      {trailerKey && (
        <TrailerModal
          youtubeKey={trailerKey}
          onClose={() => setTrailerKey("")}
        />
      )}
    </div>
  );
};

export default SearchPage;
