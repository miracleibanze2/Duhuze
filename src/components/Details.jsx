import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import axiosInstance from "./axiosInstance";

const Details = () => {
  const { id } = useParams();
  const { data, en, setNotice } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const property = data?.find((item) => item._id === id);

  useEffect(() => {
    console.log("Selected Property:", property);
  }, [property]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      setNotice(en ? "All fields are required." : "Ibice byose birakenewe.");
      return;
    }

    await axiosInstance.post("/messages", { ...form, propertyId: id });

    console.log("Form submitted:", form);
    setForm({ name: "", email: "", phone: "", message: "" });
    setNotice(localizedText.successMessage);
  };

  const localizedText = {
    available: en ? "Available" : "Biraboneka",
    notAvailable: en ? "Not Available" : "Ntibiboneka",
    price: en ? "Price" : "Igiciro",
    area: en ? "Area" : "Ubuso",
    bedrooms: en ? "Bedrooms" : "Ibyumba",
    paymentType: en ? "Payment Type" : "Ubwoko bw'Ubwishyu",
    location: en ? "Location" : "Aho biherereye",
    province: en ? "Province" : "Intara",
    district: en ? "District" : "Akarere",
    sector: en ? "Sector" : "Umurenge",
    cell: en ? "Cell" : "Akagari",
    village: en ? "Village" : "Umudugudu",
    nearby: en ? "Nearby" : "Hafi",
    interested: en ? "Interested? Contact Us!" : "Waba ubishaka? Twandikire!",
    sendDetails: en
      ? "Send us your details, including any specific inquiries or information you'd like to share, and we will get back to you promptly with the assistance you need."
      : "Ohereza amakuru yawe, harimo ibibazo byihariye cyangwa amakuru wifuza gusangiza, kandi tuzagusubiza vuba tukwereka ubufasha ukeneye.",
    name: en ? "Name" : "Izina",
    email: en ? "Email" : "Imeyili",
    phone: en ? "Phone" : "Telefoni",
    message: en ? "Message" : "Ubutumwa",
    sendMessage: en ? "Send Message" : "Ohereza Ubutumwa",
    allFieldsRequired: en
      ? "All fields are required."
      : "Ibice byose birakenewe.",
    successMessage: en
      ? "Your message has been sent successfully!"
      : "Ubutumwa bwawe bwoherejwe neza!",
    loadingDetails: en
      ? "Loading property details..."
      : "Turimo gupakurura amakuru y'inyubako...",
    listedOn: en ? "Listed on" : "Yashyizweho",
    additionalFeatures: en ? "Additional Features" : "Ibindi Biranga",
    verified: en ? "Verified" : "Igenzurwa",
  };

  return (
    <div className="min-h-screen py-10 flex flex-col lg:flex-row gap-8 lg:justify-center max-lg:items-center">
      {property ? (
        <>
          <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden max-w-xl opacity-0 transition-opacity duration-700 ease-in-out animate-fade-in">
            <div className="relative">
              <img
                src={
                  property.images?.[0]?.url || "https://via.placeholder.com/800"
                }
                alt={property.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white py-2 px-4">
                {property.isVerified && (
                  <span className="bg-green-500 px-2 py-1 rounded-full text-xs">
                    {localizedText.verified}
                  </span>
                )}
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    property.isAvailable ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {property.isAvailable
                    ? localizedText.available
                    : localizedText.notAvailable}
                </span>
              </div>
            </div>

            <div className="p-6 transition-all duration-700 ease-in-out animate-slide-in">
              <h1 className="text-3xl font-bold text-gray-800">
                {property.title}
              </h1>
              <p className="text-gray-600 mt-2">{property.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {localizedText.price}
                  </h2>
                  <p className="text-xl font-bold text-gray-900">
                    {property.price.toLocaleString()},000 Rwf
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {localizedText.area}
                  </h2>
                  <p className="text-xl text-gray-900">{property.area} m²</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {localizedText.bedrooms}
                  </h2>
                  <p className="text-xl text-gray-900">{property.bedrooms}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {localizedText.paymentType}
                  </h2>
                  <p className="text-xl text-gray-900">
                    {property.paymentType}
                  </p>
                </div>
              </div>

              {property.additionalFeatures.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-700">
                    {localizedText.additionalFeatures}
                  </h2>
                  <ul>
                    {property.additionalFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="text-gray-600 flex items-center space-x-2"
                      >
                        <span className="bg-blue-500 text-white rounded-full p-1 text-xs">
                          ✔
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 text-gray-600">
                <p>
                  <strong>{localizedText.listedOn}:</strong>{" "}
                  {new Date(property.listedDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {property.images.length > 1 && (
              <div className="flex overflow-x-scroll space-x-4 px-6 py-4">
                {property.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.description}
                    className="w-36 h-36 object-cover rounded-lg shadow-lg"
                  />
                ))}
              </div>
            )}
            <div className="p-6 border-t">
              <h2 className="text-xl font-medium text-gray-700">
                {localizedText.location}
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>{localizedText.province}:</strong>{" "}
                {property.address.province} <br />
                <strong>{localizedText.district}:</strong>{" "}
                {property.address.district} <br />
                <strong>{localizedText.sector}:</strong>{" "}
                {property.address.sector} <br />
                <strong>{localizedText.cell}:</strong> {property.address.cell}{" "}
                <br />
                <strong>{localizedText.village}:</strong>{" "}
                {property.address.village} <br />
                <strong>{localizedText.nearby}:</strong> {property.location}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full lg:w-96 bg-white shadow-lg rounded-lg p-6 transition-all duration-700 ease-in-out animate-slide-in">
            <h2 className="text-2xl font-bold text-gray-800">
              {localizedText.interested}
            </h2>
            <p className="text-gray-600 mt-2">{localizedText.sendDetails}</p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  {localizedText.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder={localizedText.name}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  {localizedText.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder={localizedText.email}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  {localizedText.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder={localizedText.phone}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  {localizedText.message}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder={localizedText.message}
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              >
                {localizedText.sendMessage}
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="opacity-0 transition-opacity duration-700 ease-in-out animate-fade-in">
          Not found
        </div>
      )}
    </div>
  );
};

export default Details;
