import { useContext, useEffect, useState } from "react";
import {
  angleDownSvg,
  angleDownWhiteSvg,
  checkSvg,
  globeSvg,
  globeWhiteSvg,
  handShake,
  nameLogo,
  namePhoto,
} from "../assets";
import { AppContext } from "./AppContext";
import MenuSvg from "../assets/svgs/MenuSvg";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ welcome }) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const { pathname } = useLocation();
  if (!context) return;
  const { en, setEn } = context;
  const [chooseLang, setChooseLang] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleLanguage = (text) => {
    setEn(text === "true");
    setChooseLang(false);
    setMenu(false);
  };

  useEffect(() => setMenu(false), [pathname]);

  return (
    <div
      className={`flex w-full sticky top-0 justify-center h-[3.5rem] shadow-md ${
        welcome
          ? "z-[1000] bg-transparent backdrop-blur-2xl"
          : " z-[999] bg-white"
      }`}
    >
      <div className="flex-between-hor px-4 container">
        {welcome ? (
          <img
            src={namePhoto}
            alt="logoName"
            height={300}
            width={1100}
            className="w-32 rounded-t-2xl top-0 h-12 object-cover object-bottom"
            onClick={() => navigate("/")}
          />
        ) : (
          <img
            src={nameLogo}
            alt="logoName"
            height={300}
            width={1100}
            className="h-10 w-auto"
            onClick={() => navigate("/")}
          />
        )}
        <div
          className={`md:flex-center-hor gap-3 ${
            menu
              ? "max-md:absolute max-md:bg-white max-md:left-0 max-md:right-0 max-md:top-full max-md:p-4 max-md:flex max-md:flex-col max-md:pt-12 max-md:gap-4 max-md:h-screen z-[50] max-md:slide-in overflow-hidden"
              : "hidden"
          }`}
        >
          <label
            htmlFor="language" // Links the label to the select
            className="md:border border-blue-400 p-2 relative md:h-10 flex items-center md:flex-row flex-col h-max w-full"
          >
            <span
              className="md:flex-center-hor flex-between-hor max-md:w-full gap-2"
              onClick={() => setChooseLang(!chooseLang)}
            >
              <span
                className={`flex-center-hor gap-2 ${welcome && "text-white"}`}
              >
                <img
                  src={!welcome ? globeSvg : globeWhiteSvg}
                  alt="globe"
                  className="w-5 aspect-square"
                />
                {en ? "Choose language" : "Hitamo ururimi"}
              </span>
              <img
                src={!welcome ? angleDownSvg : angleDownWhiteSvg}
                className="w-4 h-4"
              />
            </span>
            {chooseLang && (
              <div className="text-zinc-100 absolute right-0 left-0 top-full flex-center-both z-[50] translate-y-1 px-2 py-4 bg-white list">
                <span
                  onClick={() => handleLanguage("true")}
                  className={`${en && "bg-blue-200"}`}
                >
                  {en ? (
                    <img src={checkSvg} alt="check" className="w-5" />
                  ) : (
                    <span className="max-w-5" />
                  )}
                  <span className="flex-1">English</span>
                </span>
                <span
                  onClick={() => handleLanguage("false")}
                  className={`${!en && "bg-blue-200"}`}
                >
                  {!en ? (
                    <img src={checkSvg} alt="check" className="w-5 h-5" />
                  ) : (
                    <span className="max-w-5" />
                  )}
                  <span className="flex-1">Kinyarwanda</span>
                </span>
              </div>
            )}
          </label>

          <div className="relative img welcome">
            <img
              src={handShake}
              alt="for sale banner"
              width={800}
              height={700}
              className="w-full h-auto object-right object-fit md:hidden relative"
            />
          </div>
          {pathname === "/" ? (
            <button
              className="md:px-6 px-3 bg-blue-500 button text-white body-1 flex items-center flex-nowrap min-w-max h-10 text-center"
              onClick={() => navigate("/browse/houses")}
            >
              {en ? "Get Started" : "Tangira"}
            </button>
          ) : (
            <button
              className="md:px-6 px-3 bg-blue-500 button text-white body-1 flex items-center flex-nowrap min-w-max h-10 text-center"
              onClick={() => navigate("/list/new/property/")}
            >
              {en ? "List property" : "Andikisha"}
            </button>
          )}
        </div>
        <MenuSvg
          openNavigation={menu}
          onClick={() => setMenu(!menu)}
          className="md:hidden"
        />
      </div>
    </div>
  );
};

export default Navbar;
