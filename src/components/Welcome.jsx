import { useContext, useRef, useState } from "react";
import { angleDownSvg, handShake } from "../assets";
import { AppContext } from "./AppContext";
import {
  electronicEquipmentSteps,
  houseSteps,
  landSteps,
  welcomeParts,
  whatWeHaveCards,
} from "./constants";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Welcome = () => {
  const { en } = useContext(AppContext);
  const navigate = useNavigate();

  const sections = {
    whatWeOffer: useRef(null),
    howToUse: useRef(null),
    houseRef: useRef(null),
    landRef: useRef(null),
    equipmentRef: useRef(null),
    listYourProperty: useRef(null),
  };

  const [part, setPart] = useState();

  // Smooth scroll to a section
  const scrollToSection = (ref) => {
    if (ref?.current) {
      const offset = 8 * 16; // Adjust for header height
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = elementPosition - offset;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    }
  };

  const handleWelcomePart = (index) => {
    const sectionKeys = Object.keys(sections);
    if (index < sectionKeys.length) {
      scrollToSection(sections[sectionKeys[index]]);
      setPart(index);
    }
  };
  const handleWelcomeOnChild = (index) => {
    setTimeout(() => {
      const sectionKeys = Object.keys(sections);
      if (index < sectionKeys.length) {
        scrollToSection(sections[sectionKeys[index]]);
      }
    }, 300);
  };

  const renderSectionItems = (items) =>
    items.map((item, index) => (
      <div
        className="w-[18rem] min-h-[20rem] bg-zinc-200 flex-center-both rounded-md corner relative border p-3 pb-6 border-black shadow-2xl hover:scale-105 duration-500 hover:-skew-y-2"
        key={index}
      >
        <img
          src={item.image}
          alt={item.enName}
          className="w-full aspect-video mb-3"
        />
        <h5 className="h5 font-semibold leading-none mb-4 text-center">
          {en ? item.enName : item.name}
        </h5>
        <p className="text-sm leading-none h-full text-center">
          {en ? item.enDescription : item.description}
        </p>
        <button
          className="button text-white bg-blue-700 w-full py-2 mt-6"
          onClick={() => navigate(`/browse/${item.link}`)}
        >
          {en ? "Look Out" : "Menya byinshi"}
        </button>
      </div>
    ));

  const renderSteps = (ref, title, steps) => (
    <div
      className="w-full flex flex-col gap-3 min-h-[50vh] mt-12"
      key={title.en}
    >
      <h5 className="h5" ref={ref}>
        {en ? title.en : title.local}
      </h5>
      <ol className="pl-[1rem] text-sm list-decimal">
        {steps.map((step, idx) => (
          <li className="mb-4 text-zinc-700" key={idx}>
            <span className="font-semibold">
              {en ? step.enHeading : step.localHeading}
            </span>{" "}
            {en ? step.enText : step.localText}
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <div className="w-full relative flex flex-col items-center -mt-[3.5rem]">
      {/* Hero Section */}
      <header
        id="welcome"
        className="w-full lg:aspect-video md:aspect-[12/9] aspect-[4/3] relative container z-[1000]"
      >
        <div className="absolute inset-0">
          <Navbar welcome />
        </div>
        <div className="welcome z-[40] absolute inset-0 bg-[#010435b2] pt-[3.7rem] flex-top-center">
          <div className="flex-top-center z-[40] w-max rounded-b-full pb-2 px-10">
            <h1 className="md:h1 sm:h2 h3 font-semibold text-white">
              {en ? "Browse Verified Properties," : "Shakisha imitungo yemewe,"}
            </h1>
            <h2 className="md:h2 sm:h3 h4 font-semibold text-white">
              {en
                ? "List yours with confidence."
                : "Umenyekanishe iyawe ubyizeye."}
            </h2>
            <p className="body-1 capitalize text-white">
              {en
                ? "Submit a request to get started with our team"
                : "Tanga ubusabe ufatanye n'abakozi bacu"}
            </p>
            <p className="body-1 capitalize text-white">
              {en
                ? "We will guide you every step of the way"
                : "Tugufashe muri buri nzira."}
            </p>
            <div className="flex flex-wrap py-4 gap-2 max-sm:absolute sm:w-max w-1/2 bottom-0 right-0 max-sm:justify-end pr-3">
              <button
                className="button border-white border rounded-full text-white py-2 px-4 hover:bg-white hover:font-bold hover:text-[#010435b2] duration-500"
                onClick={() => navigate("/browse/houses")}
              >
                Houses
              </button>
              <button
                className="button border-white border rounded-full text-white py-2 px-4 hover:bg-white hover:font-bold hover:text-[#010435b2] duration-500"
                onClick={() => navigate("/browse/land")}
              >
                Land
              </button>
              <button
                className="button border-white border rounded-full text-white py-2 px-4 hover:bg-white hover:font-bold hover:text-[#010435b2] duration-500"
                onClick={() => navigate("/browse/electronics")}
              >
                Electronics
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden  -z-1">
          <img
            src={handShake}
            alt="for sale banner"
            width={800}
            height={700}
            className="w-full h-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="container w-full flex relative px-6 py-10 gap-4">
        {/* Sidebar Navigation */}
        <div className="h-max sticky top-[5rem] hidden lg:flex-center-both">
          {welcomeParts.map((item, index) => (
            <div className="w-full flex-center-both" key={index}>
              <p
                className="body-1 h-full font-normal flex-center-both cursor-pointer gap-2 w-[18rem] py-1 px-2 hover:bg-zinc-200"
                onClick={() => handleWelcomePart(index)}
              >
                <span className="flex items-center gap-2 w-full">
                  <img
                    src={angleDownSvg}
                    alt="angle down"
                    className="w-8 h-8"
                  />
                  {en ? item.enWord : item.word}
                </span>
              </p>
              {part === index &&
                item.list?.map((subItem, subIndex) => (
                  <a
                    key={subIndex}
                    className="w-full text-sm font-normal hover:bg-zinc-200 px-2 py-1 pl-12 cursor-pointer"
                    onClick={() => {
                      if (subItem.link) {
                        navigate(`/browse/${subItem.link}`);
                      } else {
                        handleWelcomeOnChild(subIndex + 2);
                      }
                    }}
                  >
                    {en ? subItem.enWord : subItem.word}
                  </a>
                ))}
            </div>
          ))}
        </div>

        {/* Main Sections */}
        <div className="min-h-screen py-8 lg:border-l border-zinc-500 px-4 w-full">
          <h5 className="h5 w-full font-semibold" ref={sections.whatWeOffer}>
            {en ? "What we provide" : "Ibyo dutanga"}
          </h5>
          <p className="text-sm leading-tight text-zinc-800 mb-12">
            {en
              ? "Look out our services and be able to browse for your desired properties easily."
              : "Reba mubyo tubafasha mubashe gushaka ibyo mwifuza biboroheye."}
          </p>
          <div className="flex flex-wrap justify-evenly w-full pt-4 gap-x-4 gap-y-16 mb-7">
            {renderSectionItems(whatWeHaveCards)}
          </div>

          <h3
            className="h3 w-full font-semibold mt-[3rem]"
            ref={sections.howToUse}
          >
            {en ? "How to use" : "Uko ikoreshwa"}
          </h3>
          <p className="text-sm leading-tight text-zinc-800 mb-12">
            {en
              ? "Learn how to use Duhuze platform to get the best services and find your dream property with ease."
              : "Menya uko wakoresha urubuga rwa Duhuze kugira ngo ubone serivisi nziza kandi ushake icumbi wifuza byoroshye."}
          </p>

          {renderSteps(
            sections.houseRef,
            {
              en: "Looking for a better house to buy?",
              local: "Urashaka inzu nziza yo kugura?",
            },
            houseSteps
          )}
          {renderSteps(
            sections.landRef,
            {
              en: "Interested in purchasing land?",
              local: "Urifuza kugura ubutaka?",
            },
            landSteps
          )}
          {renderSteps(
            sections.equipmentRef,
            {
              en: "Looking for electronic equipment?",
              local: "Urashaka ibikoresho by'amashanyarazi?",
            },
            electronicEquipmentSteps
          )}

          {/* New Section for Listing Property */}
          <h3
            className="h3 w-full font-semibold mt-[3rem]"
            ref={sections.listYourProperty}
          >
            {en ? "List Your Property" : "Tangaza umutungo wawe"}
          </h3>
          <p className="text-sm leading-tight text-zinc-800 mb-12">
            {en
              ? "To list your property, contact our team to assist you with the process. We’ll guide you through every step and help find buyers for your property."
              : "Kugira ngo utangaze umutungo wawe, hamagara itsinda ryacu rizagufasha muri buri cyiciro. Tuzagufasha gushaka abaguzi b'umurima wawe."}
          </p>
          <ul className="pl-[1rem] list-none list-outside mb-8">
            <li className="mb-4">
              <span className="font-semibold">
                {en
                  ? "Step 1: Request Assistance, "
                  : "Intambwe ya 1: Saba Ubufasha, "}
              </span>
              {en
                ? "Contact our team to get started with listing your property."
                : "Hamagara itsinda ryacu kugira ngo utangire gutangaza umutungo wawe."}
            </li>
            <li className="mb-4">
              <span className="font-semibold">
                {en
                  ? "Step 2: Sign the Agreement, "
                  : "Intambwe ya 2: Sinyisha Amasezerano, "}
              </span>
              {en
                ? "Sign a service agreement with us to proceed with listing and selling your property."
                : "Sinyisha amasezerano y'ibikorwa Duhuze natwe kugirango dukomeze gutangaza no kugurisha umutungo wawe."}
            </li>
            <li className="mb-4">
              <span className="font-semibold">
                {en
                  ? "Step 3: We Handle the Rest, "
                  : "Intambwe ya 3: Turi Gufasha Gusohoza, "}
              </span>
              {en
                ? "Our team will take care of the listing process and work to find a buyer for your property."
                : "Itsinda ryacu rizafasha mu gukora itangazo ry'umutungo wawe kandi rizagushakira umuguzi."}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
