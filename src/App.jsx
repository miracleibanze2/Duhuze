import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./components/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Notice from "./components/designs/Notice";
import Browse from "./components/Browse";

const Welcome = lazy(() => import("./components/Welcome"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));

const App = () => {
  const { loading, screenLoad } = useContext(AppContext);
  const mainLength = window.innerHeight - 192;

  return (
    <>
      <Navbar />
      <Notice />
      {screenLoad && !loading && <Loader screen />}
      <div
        className={`w-full flex-1 relative flex-center-both`}
        style={{ minHeight: `${mainLength}px` }}
      >
        {loading && !screenLoad && <Loader />}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/browse" exact element={<Browse />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default App;
