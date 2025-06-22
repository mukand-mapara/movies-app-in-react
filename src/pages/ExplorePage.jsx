import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import { motion } from "framer-motion";
import TrailerModal from "../components/TrailerModal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ExplorePage = () => {
  const { explore } = useParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [trailerKey, setTrailerKey] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setError("");
        let endpoint = "";

        if (explore === "movies") endpoint = "/movie/popular";
        else if (explore === "tv") endpoint = "/tv/popular";
        else return setError("Invalid category");

        const response = await axios.get(endpoint);
        setItems(response.data.results || []);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("Failed to load data");
      }
    };

    fetchItems();
  }, [explore]);

  const handleCardClick = async (item) => {
    try {
      const type = item.media_type || (item.title ? "movie" : "tv");
      const response = await axios.get(`/${type}/${item.id}/videos`);
      const trailer = response.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setIsModalOpen(true);
      } else {
        Swal.fire({
          icon: "info",
          title: "Trailer Not Available",
          text: "Sorry, no trailer found for this title.",
          background: "#1a1a1a", 
          color: "#ffffff",
          iconColor: "#22d3ee", 
          confirmButtonColor: "#f97316", 
          confirmButtonText: "Got it!",
        });
      }
    } catch (err) {
      console.log("Error fetching trailer");
    }
  };

  return (
    <div className="container mx-auto px-3 py-10">
      <h1 className="text-2xl font-bold text-white capitalize mb-4">
        {explore === "movies" ? "Popular Movies" : "Popular TV Shows"}
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-[repeat(auto-fit,230px)] ml-5 gap-16">
        {items.length > 0 ? (
          items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              viewport={{ once: true }}
              onClick={() => handleCardClick(item)} // ✅
              className="cursor-pointer"
            >
              <Card data={item} />
            </motion.div>
          ))
        ) : (
          <p className="text-white">No data found</p>
        )}
      </div>

      {/* Trailer Modal */}
      {isModalOpen && (
        <TrailerModal
          youtubeKey={trailerKey}
          onClose={() => {
            setTrailerKey("");
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ExplorePage;
