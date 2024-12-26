import { useNavigate } from "react-router-dom";
import { notFound, somethingWrong } from "../../assets";
import { AppContext } from "../AppContext";
import { useContext } from "react";

const NotFound = ({ context }) => {
  const { en } = useContext(AppContext);
  const navigate = useNavigate();
  const renderContent = () => {
    if (context) {
      return (
        <>
          <img
            src={somethingWrong}
            alt="Something went wrong"
            className="w-full max-w-md p-3 border-b border-r rounded-tr-xl rounded-bl-xl border-black mb-4"
          />
          <h2 className="h2 font-semibold mb-6">Something went wrong!</h2>
          <p className="body-1 max-w-md text-center leading-tight">
            There seems to be an issue loading the page. Please try refreshing
            your browser, and the issue might resolve.
          </p>
          <p className="body-1 max-w-md text-center leading-tight">
            If the problem persists, please reach out to our support team at{" "}
            <a href="mailto:miracleibanze@gmail.com" className="text-blue-600">
              miracleibanze@gmail.com
            </a>
            .
          </p>{" "}
        </>
      );
    } else {
      return (
        <>
          <img
            src={notFound}
            alt="Not found"
            className="w-full max-w-md p-3 border-b border-r rounded-tr-xl rounded-bl-xl border-black mb-4 mt-16"
          />
          <h1 className="h1">{en ? "Not found" : "Ntibyabonetse"}</h1>
          <h4 className="h4 mb-4">
            {en
              ? "We did not find what you are looking for!"
              : "Ntitwabashije kubona ibyo muri gushaka!"}
          </h4>
          <button
            className="button p-2 bg-blue-700/80 text-white rounded-s-md px-4"
            onClick={() => navigate(-1)}
          >
            {en ? "Go back" : "Subira inyuma"}
          </button>
        </>
      );
    }
  };
  return (
    <div className="fixed inset-0 bg-zinc-200 flex-center-both">
      {renderContent()}
    </div>
  );
};

export default NotFound;
