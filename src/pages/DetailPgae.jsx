import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const { expolre, id } = useParams(); // e.g. tv/1399 or movie/123
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/${expolre}/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Detail fetch error:", error.message);
      }
    };

    fetchDetail();
  }, [expolre, id]);

  if (!data) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="container mx-auto px-3 py-10 text-white">
      <h1 className="text-3xl font-bold mb-4">{data.title || data.name}</h1>
      <p className="mb-2">⭐ {data.vote_average}</p>
      <p>{data.overview}</p>
      {data.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt="backdrop"
          className="mt-6 rounded"
        />
      )}
    </div>
  );
};

export default DetailPage;
