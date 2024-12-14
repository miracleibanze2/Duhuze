import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "./AppContext";
import { LoadingSticks } from "./Loader";
import axiosInstance from "./axiosInstance";

const BrowseContent = ({ filter, choice }) => {
  const { en } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [stop, setStop] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  const fetchHouses = async () => {
    if (stop) return;

    try {
      console.log(`Sending request to /${choice}?page=${page}`);
      const response = await axiosInstance.get(`/${choice}?page=${page}`, {
        params: filter,
      });

      if (!Array.isArray(response.data) || response.data.length === 0) {
        setStop(true);
        return;
      }

      setData((prevData) => [...prevData, ...response.data]);
      setPage((prevPage) => prevPage + 1);
      setError(null); // Clear error on success
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(en ? "Failed to fetch data." : "Ntibyashobotse kuboneka.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);
  useEffect(() => {
    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        fetchHouses();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
    });

    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [page]);

  return (
    <div className="w-full p-2 flex flex-col relative h-full">
      {data.length === 0 && (
        <div className="absolute inset-0 bg-red-500 flex-1 z-[120] h-full flex-center-both">
          {loading ? "skeleton loader" : "no data found"}
        </div>
      )}
      <div className="houses-list flex-center-hor flex-wrap gap-y-8 gap-x-4">
        {data.length > 0 ? (
          data.map((house, index) => (
            <div
              key={index}
              className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={
                  house.images[0].url || "https://via.placeholder.com/400x300"
                }
                alt={house.images[0].description || "Property image"}
              />

              <div className="p-4">
                <div className="text-xl font-bold text-gray-800 flex-between-hor gap-2">
                  <span>{house.title},</span>
                  <span>{house.price} Rwf</span>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  {house.location}
                </div>

                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    <strong>{en ? "Bedrooms:" : "Ibyumba:"} </strong>
                    {house.bedrooms}
                  </li>
                  <li>
                    <strong>{en ? "Area:" : "Ubuso:"} </strong>
                    {house.area} m&sup2;
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 w-full">
                <button className="button py-2 text-base bg-blue-600 text-white px-4 rounded hover:bg-blue-600 w-full">
                  {en ? "Check Out" : "Suzuma"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>{en ? "No houses found" : "Nta bibonetse"}</p>
        )}
      </div>
      {loading && data.length === 0 && (
        <div className="w-full h-full">
          <LoadingSticks />
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {stop && !loading && (
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
