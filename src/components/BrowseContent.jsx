import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import Loader, { LoadingSticks } from "./Loader";
import BrowseSkeleton from "./designs/BrowseSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { HeartfillSvg, HeartstrokeSvg } from "../assets";

export const PropertyCard = ({ property, onViewDetails }) => {
  const { title, price, area, bedrooms, images, location, isAvailable, likes } =
    property;
  const { en, likedProperties, toggleLikeProperty } = useContext(AppContext);
  const isLiked = likedProperties?.has(property._id);

  return (
    <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 min-w-72 max-w-xs border border-gray-200">
      {/* Image Section */}
      <div className="relative flex">
        <img
          src={images?.[0]?.url || "https://via.placeholder.com/400"}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 w-full flex-between-hor px-4">
          <div
            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
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
          <button
            onClick={() => toggleLikeProperty(property._id)}
            className="p-2 button rounded-full bg-white shadow hover:bg-gray-100"
          >
            <img
              src={isLiked ? HeartfillSvg : HeartstrokeSvg}
              alt={isLiked ? "Liked" : "Not Liked"}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 flex-between-hor">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">
          {!en && "abakunze "}
          {likes || 0}&nbsp;{en && "likes"}
        </p>

        <div className="mt-4 border-y grid grid-cols-7">
          <div className="border-r pt-2 col-span-3">
            <p className="text-sm font-medium text-gray-600 border-b pr-2">
              {en ? "Price" : "Igiciro"}&nbsp;(
              <i className="font-light px-1 ">Rwf</i>)
            </p>
            <p className="text-lg font-bold text-gray-900 pr-2">
              {price?.toLocaleString()}
            </p>
          </div>
          <div className="border-r pt-2 flex-1 col-span-2">
            <p className="text-sm font-medium text-gray-600 px-2 border-b">
              {en ? "Area" : "Ubugari"}
            </p>
            <p className="text-lg font-bold text-gray-900 px-2">{area} m²</p>
          </div>
          <div className="pt-2 col-span-2">
            <p className="text-sm font-medium text-gray-600 border-b pl-2">
              {en ? "Bedrooms" : "Ibyumba"}
            </p>
            <p className="text-lg font-bold text-gray-900 pl-2">{bedrooms}</p>
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="button mt-6 w-full py-2 px-4 bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition-colors duration-300"
        >
          {en ? "View Details" : "Reba byinshi"}
        </button>
      </div>
    </div>
  );
};

const BrowseContent = () => {
  const context = useContext(AppContext);
  if (!context) return <Loader />;
  const {
    en,
    loadingResults,
    stop,
    data,
    error,
    setLoadingResults,
    fetchData,
    datachoice,
    currentDataName,
    pageRef,
    setPage,
    setStop,
    handleLoadMore,
  } = context;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full p-2 flex flex-col relative h-full">
      {data.length === 0 && loadingResults && <BrowseSkeleton />}
      <div className="houses-list flex-center-hor flex-wrap gap-y-8 gap-x-4">
        {data.length > 0
          ? data.map((item, index) => (
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
          : !loadingResults && (
              <div className="absolute inset-0 flex-center-both body-1 font-semibold text-zinc-500">
                {en ? "No property found" : "Nta mitungo yaboneka"}
              </div>
            )}
      </div>
      {loadingResults && data.length !== 0 && (
        <div className="w-full max-h-8 overflow-hidden py-6">
          <LoadingSticks />
        </div>
      )}

      {data.length > 0 && stop && !loadingResults && (
        <div className="w-full p-2 flex-center-both">
          {en ? "No more houses to load" : "Nta bindi bibonetse"}
        </div>
      )}

      {!stop && data.length > 0 && !loadingResults && (
        <button
          onClick={handleLoadMore}
          className="button mt-4 w-full py-2 px-4 bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring transition-colors duration-300 max-w-md mx-auto"
        >
          {en ? "Load More" : "Reba Ibindi"}
        </button>
      )}
    </div>
  );
};

export default BrowseContent;
