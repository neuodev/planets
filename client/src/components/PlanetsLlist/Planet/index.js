import React, { useState } from "react";

const Planet = ({ planet, isDragging }) => {
  const [showDownload, setShowDownload] = useState(false);
  const { image, name, downloadLink } = planet;

  return (
    <div
      onMouseEnter={() => setShowDownload(true)}
      onMouseLeave={() => setShowDownload(false)}
      className={` ${
        isDragging && "bg-white shadow-2xl"
      } relative overflow-hidden flex items-center justify-center border mb-4 rounded-md shadow-md cursor-move transform transition-shadow hover:shadow-lg`}
    >
      {showDownload && (
        <span className="absolute top-1 right-1 text-xs">
          <a
            href={downloadLink}
            download={name}
            target="_blank"
            className="text-blue-500"
          >
            Download
          </a>
        </span>
      )}
      <img className={` h-28 w-48 object-fit`} src={image} alt={name} />
      <div className="w-48">
        <p className="font-semibold ml-4">{name}</p>
      </div>
    </div>
  );
};

export default Planet;
