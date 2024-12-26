import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { ArrowSvg } from "../assets";
import { useNavigate } from "react-router-dom";

const TermsAndPolicies = () => {
  const { en } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full flex justify-center bg-white shadow-md z-[300] sticky top-[3.5rem] h-[3rem]">
        <div className="w-full container px-8">
          <img
            src={ArrowSvg}
            alt="arrow back"
            className="w-6 h-full"
            onClick={() => navigate(-1)}
          />
        </div>
      </header>
      <div className=" min-h-screen py-10 bg-gray-50 w-full">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          {/* Company Overview */}
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {en ? "Terms and Policies" : "Amategeko n'Amabwiriza"}
          </h1>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "About Hamwe Group" : "Ibyerekeye Hamwe Group"}
            </h2>
            <p className="text-gray-600 mb-4">
              {en
                ? "Hamwe Group is a trusted real estate company, certified by the Rwanda Development Board (RDB), specializing in connecting property buyers and sellers. We facilitate transactions on your behalf, ensuring a seamless and transparent process."
                : "Hamwe Group ni sosiyete yizewe mu bucuruzi bw'imitungo itimukanwa, ifite icyemezo cyemewe na RDB, ikaba igamije guhuza abashaka kugura no kugurisha imitungo. Tworohereza mu gihe cy'imikorere, tukizeza ko byose bigenda neza kandi mu mucyo."}
            </p>
            <p className="text-gray-600 mb-4">
              {en
                ? "Our team of experts in information technology and marketing ensures that your property gets maximum exposure. With professional photography and expert pricing advice, we help you attract more buyers and secure the best deals."
                : "Itsinda ryacu ry'inzobere mu ikoranabuhanga no kwamamaza ryemeza ko umutungo wawe ugera ku bantu benshi. Dufite amafoto y'umwuga n'inama z'uburyo bwo gushyiraho ibiciro, tukagufasha kubona abaguzi benshi no kugera ku masezerano meza."}
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
                  ? "You must provide accurate and truthful information about your property."
                  : "Ugomba gutanga amakuru nyayo kandi y'ukuri ku mutungo wawe."}
              </li>
              <li className="mb-2">
                {en
                  ? "Ownership verification documents must be submitted before listing."
                  : "Ibimenyetso by'uburenganzira ku mutungo bigomba gushyikirizwa mbere yo gushyira ku rubuga."}
              </li>
              <li className="mb-2">
                {en
                  ? "You agree to allow Hamwe Group to market and display your property."
                  : "Uremeza ko Hamwe Group imenyekanisha kandi igaragaza umutungo wawe."}
              </li>
            </ul>
          </section>

          {/* Confidentiality and Data Privacy */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en
                ? "Confidentiality and Data Privacy"
                : "Amabanga n'Umutekano w'Amakuru"}
            </h2>
            <p className="text-gray-600">
              {en
                ? "Hamwe Group ensures that your personal and property information is stored securely and used only for the intended purposes."
                : "Hamwe Group yemeza ko amakuru yawe bwite n'ay'umitungo abitswe mu buryo bwizewe kandi akoreshwa gusa ku mpamvu zateganyijwe."}
            </p>
          </section>

          {/* Fees and Payment Terms */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en
                ? "Fees and Payment Terms"
                : "Amafaranga n'Amabwiriza yo Kwishyura"}
            </h2>
            <p className="text-gray-600">
              {en
                ? "Our commission rates and fees are transparent and communicated upfront. Payments are non-refundable once services commence."
                : "Ijanisha ryacu ry'amafaranga n'amafaranga asabwa birasobanutse kandi bitangazwa hakiri kare. Amafaranga yishyuwe ntasubizwa nyuma yo gutangira serivisi."}
            </p>
          </section>

          {/* Liability Disclaimer */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "Liability Disclaimer" : "Guhakana Inshingano"}
            </h2>
            <p className="text-gray-600">
              {en
                ? "Hamwe Group is not responsible for disputes between buyers and sellers. While we provide guidance and facilitate transactions, the final decision rests with the parties involved."
                : "Hamwe Group ntishinzwe amakimbirane hagati y'abaguzi n'abagurisha. Nubwo dutanga inama kandi tukorohereza imicungire, icyemezo cya nyuma kireba impande zombi."}
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "Governing Law" : "Amategeko Ayobora"}
            </h2>
            <p className="text-gray-600">
              {en
                ? "All transactions and agreements are governed by the laws of Rwanda."
                : "Ibikorwa byose n'amasezerano bigengwa n'amategeko y'u Rwanda."}
            </p>
          </section>

          {/* Updates to Policies */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {en ? "Updates to Policies" : "Guhindura Amabwiriza"}
            </h2>
            <p className="text-gray-600">
              {en
                ? "Hamwe Group reserves the right to update these terms and policies at any time. Clients are encouraged to review this page regularly."
                : "Hamwe Group ifite uburenganzira bwo guhindura aya mabwiriza igihe icyo ari cyo cyose. Abakiriya barashishikarizwa kugenzura uru rupapuro buri gihe."}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsAndPolicies;
