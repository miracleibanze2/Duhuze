import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./components/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Notice from "./components/designs/Notice";
import BrowseSkeleton from "./components/designs/BrowseSkeleton";
import NotFound from "./components/designs/NotFound";

const Welcome = lazy(() => import("./components/Welcome"));
const Browse = lazy(() => import("./components/Browse"));
const Details = lazy(() => import("./components/Details"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const ListNew = lazy(() => import("./components/ListNew"));
const BrowseContent = lazy(() => import("./components/BrowseContent"));
const TermsAndPolicies = lazy(() => import("./components/TermPolicies"));

const App = () => {
  const context = useContext(AppContext);
  if (!context) {
    return <NotFound context />;
  }

  const { loading, screenLoad } = context;

  return (
    <>
      <Navbar />
      <Notice />
      {screenLoad && !loading && <Loader screen />}
      <div className="w-full flex-1 relative h-full min-h-[70vh]">
        {loading && !screenLoad && <Loader />}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/browse/:choice" element={<Browse />}>
              <Route index element={<BrowseContent />} />
              <Route path=":id/:name" element={<Details />} />
            </Route>
            <Route path="/list/new/property" element={<ListNew />} />
            <Route path="/list/terms&policies" element={<TermsAndPolicies />} />
            <Route
              path="*"
              element={
                <div className="w-full relative min-h-[90vh]">
                  <NotFound />
                </div>
              }
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default App;
