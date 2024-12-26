import { useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const { en } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex-center-both ">
      <h1 className="h1">400</h1>
      <h4 className="h4">{en ? "Not found" : "Ntibibonetse"}</h4>
      <p className="body-1 font-light">
        {en
          ? "We did not find what you are looking for."
          : "Ibyo mwashakaga ntibyabashije kuboneka."}
      </p>
      <button
        className="py-2 mt-8 px-4 text-white button bg-green-500"
        onClick={() => navigate(-1)}
      >
        {en ? "back" : "Gusubira inyuma"}
      </button>
    </div>
  );
};

export default PageNotFound;
