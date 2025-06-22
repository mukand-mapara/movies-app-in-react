import React from "react";

const TrailerModal = ({ youtubeKey, onClose }) => {
  if (!youtubeKey) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-[90%] max-w-3xl aspect-video bg-black rounded shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded px-2 py-1 text-sm z-10"
        >
          Close ✕
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
          title="Trailer"
          allowFullScreen
          className="w-full h-full rounded"
        />
      </div>
    </div>
  );
};

export default TrailerModal;
