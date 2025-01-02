import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { ArrowSvg } from "../assets";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const { en } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full flex justify-center bg-white shadow-md z-[300] sticky top-[3.5rem] h-[3rem]">
        <div className="w-full container px-8">
          <img
            src={ArrowSvg}
            alt="arrow back"
            className="w-6 h-full cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
      </header>
      <div className="min-h-screen py-10 bg-gray-50 w-full">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          {/* Introduction */}
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {en ? "Terms of Service" : "Amategeko y'Imikoreshereze"}
          </h1>
          <section className="mb-6">
            <p className="text-gray-600">
              {en
                ? "Welcome to Duhuze Group. By accessing or using our services, you agree to comply with these terms. Please read them carefully to understand your rights and obligations."
                : "Murakaza neza muri Duhuze Group. Mukoresha serivisi zacu, mwemera gukurikiza aya mategeko. Muyasome neza kugira ngo mumenye uburenganzira n'inshingano zanyu."}
            </p>
          </section>

          {/* Company Overview */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "About Duhuze Group" : "Ibyerekeye Duhuze Group"}
            </h2>
            <p className="text-gray-600 mb-4">
              {en
                ? "Duhuze Group is a trusted real estate company, certified by the Rwanda Development Board (RDB), specializing in connecting property buyers and sellers."
                : "Duhuze Group ni sosiyete yizewe mu bucuruzi bw'imitungo itimukanwa, ifite icyemezo cyemewe na RDB."}
            </p>
            <p className="text-gray-600 mb-4">
              {en
                ? "We provide professional services, including property marketing, pricing advice, and transaction facilitation, ensuring transparency and trust."
                : "Dutanga serivisi z'umwuga zirimo kumenyekanisha imitungo, inama ku biciro, no gufasha mu micungire y'ubucuruzi, twizeza ko byose bigenda neza kandi mu mucyo."}
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "User Responsibilities" : "Inshingano z'Umukoresha"}
            </h2>
            <ul className="list-disc ml-6 text-gray-600">
              <li className="mb-2">
                {en
                  ? "Provide accurate and truthful information about your property."
                  : "Tanga amakuru nyayo kandi y'ukuri ku mutungo wawe."}
              </li>
              <li className="mb-2">
                {en
                  ? "Submit all required ownership verification documents before listing."
                  : "Shyikiriza ibimenyetso by'uburenganzira ku mutungo mbere yo gushyira ku rubuga."}
              </li>
              <li className="mb-2">
                {en
                  ? "Ensure compliance with all applicable local laws and regulations."
                  : "Witondere gukurikiza amategeko n'amabwiriza bihari."}
              </li>
            </ul>
          </section>

          {/* Data Privacy and Usage */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en
                ? "Confidentiality and Data Privacy"
                : "Amabanga n'Umutekano w'Amakuru"}
            </h2>
            <p className="text-gray-600 mb-4">
              {en
                ? "We prioritize the security of your data. Information collected is used only for transaction purposes and will not be shared without consent."
                : "Dushyira imbere umutekano w'amakuru yawe. Amakuru yakusanyijwe akoreshwa gusa ku mpamvu zijyanye n'ubucuruzi kandi ntazahabwa abandi utabyemeye."}
            </p>
          </section>

          {/* Fees and Payment Terms */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en
                ? "Fees and Payment Terms"
                : "Amafaranga n'Amabwiriza yo Kwishyura"}
            </h2>
            <p className="text-gray-600 mb-4">
              {en
                ? "Our fees are transparent. Once services begin, payments are non-refundable unless otherwise stated."
                : "Amafaranga yacu aragaragara kandi asobanutse. Iyo serivisi zitangiye, amafaranga yishyuwe ntasubizwa keretse bibaye ngombwa."}
            </p>
          </section>

          {/* Conflict Resolution */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "Conflict Resolution" : "Gukemura Amakimbirane"}
            </h2>
            <p className="text-gray-600 mb-4">
              {en
                ? "Duhuze Group mediates disputes between parties when necessary but is not liable for unresolved issues."
                : "Duhuze Group ifasha mu gukemura amakimbirane hagati y'impande iyo bibaye ngombwa, ariko ntibazwa ibibazo bitakemutse."}
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "Governing Law" : "Amategeko Ayobora"}
            </h2>
            <p className="text-gray-600">
              {en
                ? "All activities are governed by Rwandan law."
                : "Ibikorwa byose bigengwa n'amategeko y'u Rwanda."}
            </p>
          </section>

          {/* Updates to Policies */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "Policy Updates" : "Guhindura Amabwiriza"}
            </h2>
            <p className="text-gray-600">
              {en
                ? "We reserve the right to amend these terms at any time. Please check regularly for updates."
                : "Twifitiye uburenganzira bwo guhindura aya mabwiriza igihe icyo ari cyo cyose. Mujye mugenzura kenshi ibyavuguruwe."}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
