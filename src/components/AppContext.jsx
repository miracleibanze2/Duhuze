import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "./axiosInstance";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [screenLoad, setScreenLoad] = useState(false);
  const [en, setEn] = useState(true);
  const [notice, setNotice] = useState("");
  const [loadingResults, setLoadingResults] = useState(true);
  const [page, setPage] = useState(0);
  const [stop, setStop] = useState(false);
  const [datachoice, setDataChoice] = useState();
  const [data, setData] = useState([]);
  const [currentDataName, setCurrentDataName] = useState("");
  const [dataFilter, setDataFilter] = useState({});
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const [likedProperties, setLikedProperties] = useState(new Set());

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [en]);

  useEffect(() => {
    setScreenLoad(true);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setScreenLoad(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  const fetchData = async () => {
    if (stopRef.current || !datachoice || !pageRef.current) return;
    setCurrentDataName(datachoice);
    setLoadingResults(true);
    console.log("at fns");
    console.log("data choice", datachoice);
    console.log("page choice", pageRef.current);
    try {
      console.log(filterRef.current);
      const response = await axiosInstance.get(`/${datachoice}`, {
        params: { page: pageRef?.current, ...filterRef.current },
      });

      if (response.data.length === 0) {
        console.log("response empty");
        if (datachoice !== currentDataName) {
          setData([]);
          setStop(true);
        } else {
          setStop(true);
          setLoadingResults(false);
        }
        return;
      }
      console.log("page is ", pageRef.current);
      console.log(response.data);

      if (datachoice === currentDataName) {
        console.log("second ", pageRef.current);
        setData(() => [...dataRef.current, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setPage(1);
        setData(response.data);
        setStop(false);
        console.log("first");
      }

      setError(null); // Clear error on success
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(en ? "Failed to fetch data." : "Ntibyashobotse kuboneka.");
    } finally {
      setLoadingResults(false);
    }
  };

  const stopRef = useRef(stop);

  useEffect(() => {
    stopRef.current = stop;
  }, [stop]);

  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const pageRef = useRef(page);

  useEffect(() => {
    console.log("Filter ref changed so page", pageRef.current);
    pageRef.current = page + 1;
  }, [page]);

  useEffect(() => {
    const observerCallback = (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && !stop && datachoice === currentDataName) {
        console.log("normal call");
        setLoadingResults(true);
        fetchData();
      } else if (datachoice !== currentDataName) {
        pageRef.current = 1;
        setPage(0);
        setStop(false);
        console.log("new fetch");
        setLoadingResults(true);
        fetchData();
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
  }, [stop, datachoice, currentDataName]);

  const filterRef = useRef(dataFilter);
  useEffect(() => {
    console.log("flter change trigger");
    filterRef.current = dataFilter;
    setStop(false);
    setPage(0);
    pageRef.current = 1;
    setData([]);
    fetchData();
    window.scrollTo(0, 0);
  }, [dataFilter]);

  useEffect(() => {
    const savedLikes =
      JSON.parse(localStorage.getItem("likedProperties")) || [];
    setLikedProperties(new Set(savedLikes));
  }, []);
  // Sync liked properties to localStorage
  useEffect(() => {
    if (likedProperties.size > 0) {
      localStorage.setItem(
        "likedProperties",
        JSON.stringify([...likedProperties])
      );
    }
  }, [likedProperties]);

  const toggleLikeProperty = async (propertyId) => {
    const alreadyLiked = likedProperties.has(propertyId);
    try {
      if (!alreadyLiked) {
        await axiosInstance.post("/property-like", {
          id: propertyId,
          type: datachoice,
        });
      }
      setLikedProperties((prev) => {
        const updatedLikes = new Set(prev);
        if (alreadyLiked) {
          updatedLikes.delete(propertyId);
        } else {
          updatedLikes.add(propertyId);
        }
        return updatedLikes;
      });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        en,
        setEn,
        notice,
        setNotice,
        screenLoad,
        loadingResults,
        page,
        stop,
        data,
        error,
        bottomRef,
        datachoice,
        setDataChoice,
        setDataFilter,
        likedProperties,
        setLikedProperties,
        toggleLikeProperty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
