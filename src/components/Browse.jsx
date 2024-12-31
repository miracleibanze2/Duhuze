import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "./axiosInstance";
import { browseChoices } from "./constants";
import { AppContext } from "./AppContext";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./FilterSideBar";
import Loader from "./Loader";
import { ArrowSvg } from "../assets";
import NotFound from "./designs/NotFound";

const Browse = () => {
  const { choice, id } = useParams();
  if (choice !== "houses" && choice !== "land" && choice !== "electronics")
    return <NotFound />;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const context = useContext(AppContext);
  if (!context) return <Loader screen />;
  const { setDataChoice, setDataFilter, en, data } = context;
  const [rwandaData, setRwandaData] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);
  const [villages, setVillages] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/address");
        setRwandaData(response.data);
      } catch (error) {
        console.error("Error fetching Rwanda data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);

    const provinceData = rwandaData.find((item) => item.name === province);
    setDistricts(provinceData ? provinceData.districts : []);
  };

  useEffect(() => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setDistricts([]);
    setSelectedSector("");
    setSectors([]);
    setSelectedCell("");
    setCells([]);
    setSelectedVillage("");
    setVillages([]);
    setPaymentType("");
    setMinimumPrice(null);
    setMaximumPrice(null);
    setDataFilter({
      selectedProvince: "",
      selectedDistrict: "",
      selectedSector: "",
      selectedCell: "",
      selectedVillage: "",
      paymentType: "",
      minimumPrice: "",
      maximumPrice: "",
    });
  }, [pathname]);
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedSector("");
    setSelectedCell("");
    setVillages([]);

    const provinceData = rwandaData.find(
      (item) => item.name === selectedProvince
    );
    const districtData = provinceData?.districts.find(
      (item) => item.name === district
    );
    setSectors(districtData ? districtData.sectors : []);
  };

  const handleSectorChange = (e) => {
    const sector = e.target.value;
    setSelectedSector(sector);
    setSelectedCell("");
    setVillages([]);

    const provinceData = rwandaData.find(
      (item) => item.name === selectedProvince
    );
    const districtData = provinceData?.districts.find(
      (item) => item.name === selectedDistrict
    );
    const sectorData = districtData?.sectors.find(
      (item) => item.name === sector
    );
    setCells(sectorData ? sectorData.cells : []);
  };

  const handleCellChange = (e) => {
    const cell = e.target.value;
    setSelectedCell(cell);

    const provinceData = rwandaData.find(
      (item) => item.name === selectedProvince
    );
    const districtData = provinceData?.districts.find(
      (item) => item.name === selectedDistrict
    );
    const sectorData = districtData?.sectors.find(
      (item) => item.name === selectedSector
    );
    const cellData = sectorData?.cells.find((item) => item.name === cell);
    setVillages(cellData ? cellData.villages : []);
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
  };

  const handleFilter = () => {
    setDataFilter({
      province: selectedProvince || "",
      district: selectedDistrict || "",
      sector: selectedSector || "",
      cell: selectedCell || "",
      village: selectedVillage || "",
      paymentType: paymentType || "",
      minimumPrice: minimumPrice || "",
      maximumPrice: maximumPrice || "",
    });
  };

  useEffect(() => setDataChoice(choice), [choice]);

  const renderHeaderContent = () => {
    if (!id) {
      return browseChoices.map((item, index) => (
        <div
          key={index}
          className={`py-2 capitalize px-5 hover:bg-zinc-100 cursor-pointer ${
            choice === item.enName && "border-b-4 bg-zinc-200"
          } border-blue-500`}
          onClick={() => navigate(`/browse/${item.enName}`)}
        >
          {en ? item.enName : item.localName}
        </div>
      ));
    } else if (data?.length > 0) {
      return (
        <img
          src={ArrowSvg}
          alt="arrow back"
          className="w-6 h-full"
          onClick={() => navigate(-1)}
        />
      );
    }
    return (
      <a href="/browse/houses">
        <img src={ArrowSvg} alt="arrow back" className="w-6 h-full" />
      </a>
    );
  };

  return (
    <>
      <header className="w-full flex justify-center bg-white shadow-md z-[300] sticky top-[3.5rem] h-[3rem]">
        <div className="container w-full flex px-8 max-sm:justify-between">
          {renderHeaderContent()}
        </div>
      </header>
      <main className={`flex-1 w-full h-full flex justify-center bg-white`}>
        <div className="container w-full flex-1 lg:flex-row flex-col min-h-[30rem]">
          {!id && choice !== "electronics" && (
            <div className="p-2 relative w-full flex-1 px-6 mb-8">
              <h5 className="body-1 font-semibold flex-between-hor gap-6 w-full max-w-xs px-4 rounded-md hover:bg-zinc-300">
                {en ? "Filter" : "Shakisha"}
              </h5>

              <div className="w-full z-[10] bg-zinc-100 pb-6 shadow-md flex flex-col px-5">
                <div className="w-full grid md:grid-cols-4 grid-cols-2">
                  <Sidebar
                    {...{
                      selectedProvince,
                      handleProvinceChange,
                      selectedDistrict,
                      handleDistrictChange,
                      selectedSector,
                      handleSectorChange,
                      selectedCell,
                      handleCellChange,
                      selectedVillage,
                      handleVillageChange,
                      districts,
                      sectors,
                      cells,
                      villages,
                      rwandaData,
                      en,
                    }}
                    search
                    className="flex flex-wrap p-3 gap-4 flex-col"
                  />
                  <div className="w-full flex flex-wrap p-3 gap-4 flex-col">
                    <p className="body-1 text-zinc-900 leading-none">
                      {en ? "Payment Type" : "Ubwoko bw'ubwishyu"}
                    </p>
                    <select
                      name="payment"
                      className="input text-sm"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <option value="">
                        {en ? "Select payment" : "Hitamo ubwishyu"}
                      </option>
                      <option value="mortgage">
                        {en ? "Mortgage" : "Inguzanyo"}
                      </option>
                      <option value="cash">
                        {en ? "Cash" : "Amafaranga yose"}
                      </option>
                      <option value="installments">
                        {en ? "Installments" : "Kwishyura mu byiciro"}
                      </option>
                      <option value="monthly Rent">
                        {en ? "Monthly Rent" : "Ubukode bwa buri kwezi"}
                      </option>
                    </select>
                  </div>
                  <div className="w-full flex flex-wrap p-3 gap-4 flex-col">
                    <p className="body-1 text-zinc-900 leading-none">
                      {en ? "Minimum price" : "Igiciro ntarengwa gito"}
                    </p>
                    <input
                      type="number"
                      name="minimum"
                      className="input"
                      step="500"
                      min="0"
                      value={minimumPrice}
                      onChange={(e) => setMinimumPrice(e.target.value)}
                      placeholder={
                        en ? "Choose minimum price" : "Hitamo igiciro gito"
                      }
                    />
                  </div>
                  <div className="w-full flex flex-wrap p-3 gap-4 flex-col">
                    <p className="body-1 text-zinc-900 leading-none">
                      {en ? "Maximum price" : "Igiciro ntarengwa kinini"}
                    </p>
                    <input
                      type="number"
                      name="maximum"
                      className="input"
                      step="500"
                      min="0"
                      value={maximumPrice}
                      onChange={(e) => setMaximumPrice(e.target.value)}
                      placeholder={
                        en ? "Choose maximum price" : "hitamo igiciro kinini"
                      }
                    />
                  </div>
                </div>
                <button
                  className="button p-1 text-white bg-blue-700 px-12 mt-6 mx-auto"
                  onClick={handleFilter}
                >
                  {en ? "Filter" : "Shakisha"}
                </button>
              </div>
            </div>
          )}
          <div className="w-full flex-1 min-h-full bg-zinc-100 pt-8">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Browse;
