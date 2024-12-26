import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "./axiosInstance";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./FilterSideBar";
import { ArrowSvg, handShake } from "../assets";

const ListProperty = () => {
  const { en, setNotice } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    propertyType: "house",
    name: "",
    phone: "",
    email: "",
    title: "",
    price: "",
    bedrooms: "",
    description: "",
    agreement: false,
    province: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
  });

  const [rwandaData, setRwandaData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/address");
        if (response.data) {
          setRwandaData(response.data);
        } else {
          console.warn("No data returned from address API.");
        }
      } catch (error) {
        console.error("Error fetching Rwanda data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setFormData((prev) => ({
      ...prev,
      province,
      district: "",
      sector: "",
      cell: "",
      village: "",
    }));

    const provinceData = rwandaData.find((item) => item.name === province);
    setDistricts(provinceData ? provinceData.districts : []);
    setSectors([]);
    setCells([]);
    setVillages([]);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district,
      sector: "",
      cell: "",
      village: "",
    }));

    const provinceData = rwandaData.find(
      (item) => item.name === formData.province
    );
    const districtData = provinceData?.districts.find(
      (item) => item.name === district
    );
    setSectors(districtData ? districtData.sectors : []);
    setCells([]);
    setVillages([]);
  };

  const handleSectorChange = (e) => {
    const sector = e.target.value;
    setFormData((prev) => ({ ...prev, sector, cell: "", village: "" }));

    const districtData = districts.find(
      (item) => item.name === formData.district
    );
    const sectorData = districtData?.sectors.find(
      (item) => item.name === sector
    );
    setCells(sectorData ? sectorData.cells : []);
    setVillages([]);
  };

  const handleCellChange = (e) => {
    const cell = e.target.value;
    setFormData((prev) => ({ ...prev, cell, village: "" }));

    const sectorData = sectors.find((item) => item.name === formData.sector);
    const cellData = sectorData?.cells.find((item) => item.name === cell);
    setVillages(cellData ? cellData.villages : []);
  };
  const handleVillageChange = (e) => {
    const village = e.target.value;
    setFormData((prev) => ({ ...prev, village }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      setNotice(
        en
          ? "Please agree to the terms and policies."
          : "Nyamuneka wemeze amabwiriza n'amategeko."
      );
      return;
    }

    try {
      await axiosInstance.post("/list-request", formData);
      setNotice(
        en ? "Property submitted successfully!" : "Inyubako yashyizweho neza!"
      );
    } catch (error) {
      console.error("Error submitting property:", error);
      setNotice(
        en
          ? "Error submitting the property."
          : "Ikosa ryabaye mu gushyiraho inyubako."
      );
    }
  };

  return (
    <>
      <header className="w-full flex justify-center bg-white shadow-md z-[300] sticky top-[3.5rem] h-[3rem]">
        <div className="w-full container flex-between-hor px-8">
          <img
            src={ArrowSvg}
            alt="arrow back"
            className="w-6 h-full"
            onClick={() => navigate(-1)}
          />
        </div>
      </header>
      <div className="w-full py-10 bg-gray-50 flex lg:flex-row justify-center gap-10 flex-col max-lg:items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 h-full">
          <div className="w-full lg:max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex lg:flex-col md:flex-row flex-col">
            <img
              src={handShake}
              alt="handshake image"
              width={700}
              height={500}
              className="lg:w-full md:w-[20rem] w-full h-auto max-h-[20rem] object-cover object-center"
            />
            <div className="w-full h-full p-6 flex-1">
              <h5 className="h5 font-semibold mb-4 text-blue-600">
                Why Work With Us?
              </h5>
              <p className="text-gray-600 mb-4">
                We go above and beyond to make your property listing seamless
                and successful. Our platform leverages advanced technology and a
                vast network of buyers to give your property the exposure it
                needs.
              </p>
              <p className="text-gray-600 mb-4">
                Join thousands of satisfied clients who have trusted us to
                market their properties and secure the best deals.
              </p>
              <p className="text-gray-600">
                Your property, our priority – because your success is our
                success.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {en ? "List Your Property" : "Shyiraho Inyubako Yawe"}
          </h1>
          <p className="text-zinc-600 leading-tight mb-6">
            {en
              ? `Feel free to contact us and provide some information about your property. Our team will get in touch with you to arrange a visit and inspection.`
              : "Nyamuneka, turabashyigikiye! Mwatugezaho amakuru yerekeye inyubako yanyu, kandi ikipe yacu izabahamagara kugira ngo dukore gahunda yo gusura no kugenzura inyubako yanyu."}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                {en ? "Full Name" : "Amazina Yuzuye"}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder={
                  en ? "Enter your full name" : "Injiza amazina yawe"
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                {en ? "Phone Number" : "Nimero Ya Telefone"}
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder={
                  en ? "Enter your phone number" : "Injiza nimero ya telefone"
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                {en ? "Email Address" : "Imeyili Yawe"}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder={
                  en ? "Enter your email address" : "Injiza imeyili yawe"
                }
              />
            </div>

            {/* Property Details */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                {en ? "Property Title" : "Umurongo W'inyubako"}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder={
                  en ? "Enter property title" : "Injiza izina ry'inyubako"
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                {en ? "Price (RWF)" : "Igiciro (RWF)"}
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder={
                  en
                    ? "Enter estimated price in RWF"
                    : "Injiza igiciro kigereranyije muri RWF"
                }
              />
            </div>

            <Sidebar
              {...{
                formData,
                handleInputChange,
                handleProvinceChange,
                handleDistrictChange,
                handleSectorChange,
                handleCellChange,
                handleVillageChange,
                districts,
                sectors,
                cells,
                villages,
                en,
                rwandaData,
              }}
              className="grid grid-cols-2 gap-x-4 gap-y-2 mb-2 body-2"
            />
            {/* Agreement */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                {en ? "Bedrooms" : "Ibyumba"}
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder={
                  en ? "Enter number of bedrooms" : "Injiza umubare w'ibyumba"
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                {en ? "Description" : "Ibisobanuro"}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder={
                  en
                    ? "Enter property description"
                    : "Injiza ibisobanuro by'inyubako"
                }
              />
            </div>

            {/* Agreement */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {en ? "I agree to the" : "Nemera"}
                <a href="/list/terms&policies" className="text-blue-600 ml-1">
                  {en ? "terms and policies" : "amategeko n'amabwiriza"}
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              {en ? "Submit Property" : "Shyiraho Inyubako"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ListProperty;
