import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./components/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Notice from "./components/designs/Notice";
import BrowseContent from "./components/BrowseContent";

const Welcome = lazy(() => import("./components/Welcome"));
const Browse = lazy(() => import("./components/Browse"));
const Details = lazy(() => import("./components/Details"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));

const App = () => {
  const context = useContext(AppContext);
  if (!context) {
    return <p>Error: App context is missing.</p>;
  }

  const { loading, screenLoad } = context;

  return (
    <>
      <Navbar />
      <Notice />
      {screenLoad && !loading && <Loader screen />}
      <div className="w-full flex-1 relative flex-center-both min-h-screen">
        {loading && !screenLoad && <Loader />}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/browse/:choice" element={<Browse />}>
              <Route index element={<BrowseContent />} />
              <Route path=":id/:name" element={<Details />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default App;
