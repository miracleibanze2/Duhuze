import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { LoadingSticks } from "./Loader";
import BrowseSkeleton from "./designs/BrowseSkeleton";
import { useLocation, useNavigate } from "react-router-dom";

export const PropertyCard = ({ property, onViewDetails }) => {
  const { title, price, area, bedrooms, images, location, isAvailable } =
    property;
  const { en } = useContext(AppContext); // Access language context
  const { pathname } = useLocation();

  return (
    <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 min-w-72 max-w-xs border border-gray-200">
      {/* Image Section */}
      <div className="relative">
        <img
          src={images?.[0]?.url || "https://via.placeholder.com/400"}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-semibold ${
            isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isAvailable
            ? en
              ? "Available"
              : "Birahari"
            : en
            ? "Not Available"
            : "Ntibiboneka"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-2">{location}</p>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {en ? "Price" : "Igiciro"}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {price.toLocaleString()} Rwf
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              {en ? "Area" : "Ubugari"}
            </p>
            <p className="text-lg font-bold text-gray-900">{area} m²</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              {en ? "Bedrooms" : "Ibyumba"}
            </p>
            <p className="text-lg font-bold text-gray-900">{bedrooms}</p>
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition-colors duration-300"
        >
          {en ? "View Details" : "Reba byinshi"}
        </button>
      </div>
    </div>
  );
};

const BrowseContent = () => {
  const { en, loadingResults, stop, data, error, bottomRef } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="w-full p-2 flex flex-col relative h-full">
      {data.length === 0 &&
        (loadingResults ? (
          <BrowseSkeleton />
        ) : (
          <div className="absolute inset-0 flex-center-both bg-zinc-100">
            {en ? "No results found" : "Ntibyabonetse"}
          </div>
        ))}
      <div className="houses-list flex-center-hor flex-wrap gap-y-8 gap-x-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <PropertyCard
              property={item}
              onViewDetails={() =>
                navigate(
                  `${pathname}/${item._id}/${encodeURIComponent(item.title)}`
                )
              }
              key={index}
            />
          ))
        ) : (
          <p>{en ? "No houses found" : "Nta nyubako ziboneka"}</p>
        )}
      </div>
      {loadingResults && data.length === 0 && (
        <div className="w-full h-full">
          <LoadingSticks />
        </div>
      )}
      {error && <p className="error-message">{en ? error : "Ikosa ryabaye"}</p>}
      {stop && !loadingResults && (
        <div className="w-full p-2 flex-center-both">
          {en ? "No more houses to load" : "Nta bindi bibonetse"}
        </div>
      )}
      <div
        ref={bottomRef}
        className="bottom-trigger"
        style={{ height: "1px" }}
      ></div>
    </div>
  );
};

export default BrowseContent;
