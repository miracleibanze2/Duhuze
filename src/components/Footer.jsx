import { useContext, useState } from "react";
import axiosInstance from "./axiosInstance";
import { AppContext } from "./AppContext";
import Loader from "./Loader";

export const Reserved = () => {
  const { en } = useContext(AppContext);
  return (
    <div className="mt-8 border-t border-gray-700 pt-4 text-center w-full container">
      <p>
        &copy; 2024{" "}
        {en
          ? "Hamwe. All Rights Reserved."
          : "Hamwe. Uburenganzira Bwose Burabitswe."}
      </p>
    </div>
  );
};

const Footer = () => {
  const context = useContext(AppContext);
  if (!context) return <Loader />;
  const { en, setNotice } = context;
  const [email, setEmail] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSendUpdatesRequest = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/updates-request", { email });
      setNotice(
        en ? "You have subscribed successfully!" : "Mwiyandikishije neza!"
      );
      setEmail(""); // Reset email state
    } catch (err) {
      console.log(err);
      setNotice(
        en
          ? "Failed to subscribe. Please try again."
          : "Kwandika byanze. Ongera ugerageze."
      );
    }
  };

  return (
    <footer className="bg-white py-8 w-full flex items-center flex-col h-max pt-16 z-[100]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container px-4">
        {/* Contact Section */}
        <div>
          <p className="font-semibold text-xl mb-4">
            {en ? "Contact Us" : "Twandikire"}
          </p>
          <p>{en ? "Phone: +123-456-7890" : "Terefone: +123-456-7890"}</p>
          <p>
            {en
              ? "Email: miracleibanze@gmail.com"
              : "Imeyili: miracleibanze@gmail.com"}
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-blue-400 hover:text-blue-600">
              Facebook
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              Instagram
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              Twitter
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              LinkedIn
            </a>
          </div>
        </div>

        {/* About Section */}
        <div>
          <p className="font-semibold text-xl mb-4">
            {en ? "About Us" : "Ibyerekeye Twebwe"}
          </p>
          <p>
            {en
              ? "Connecting buyers and sellers with ease. Your trusted platform for real estate."
              : "Guhuza abaguzi n'abacuruzi byoroshye. Urubuga rwawe rwizewe ku bijyanye n'ibibanza."}
          </p>
          <p className="mt-4">
            <strong>{en ? "Secure Payments: " : "Ipayment Zizewe:"}</strong>
            {en ? "Working on it." : "Birimo gukorwa."}
          </p>
          <p>
            <strong>{en ? "Verified Listings: " : "Ibibanza byizewe:"}</strong>
            {en
              ? "Only the best properties, thoroughly verified."
              : "Ibibanza byiza gusa, byemejwe neza."}
          </p>
          <p>
            <strong>
              {en ? "Customer Support: " : "Ubufasha ku Bakiriya:"}
            </strong>
            {en
              ? "24/7 assistance for all your needs."
              : "Ubufasha 24/7 ku byo ukeneye byose."}
          </p>
        </div>

        {/* Subscription Section */}
        <div>
          <p className="font-semibold text-xl mb-4">
            {en ? "Stay Updated!" : "Bimanukire!"}
          </p>
          <form
            className="flex items-center space-x-2"
            onSubmit={handleSendUpdatesRequest}
          >
            <input
              type="email"
              placeholder={en ? "Enter your email" : "Andika email yawe"}
              className="px-4 py-2 w-full outline-none border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={email} // Bind input to email state
              onChange={handleEmail}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 button hover:bg-blue-700 focus:outline-none"
            >
              {en ? "Subscribe" : "Iyandikishe"}
            </button>
          </form>
        </div>
      </div>
      <Reserved />
    </footer>
  );
};

export default Footer;
