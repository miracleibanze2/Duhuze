import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "./axiosInstance";
import { browseChoices } from "./constants";
import { AppContext } from "./AppContext";
import BrowseContent from "./BrowseContent";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./FilterSideBar";
import Loader from "./Loader";
import { ArrowSvg } from "../assets";

const Browse = () => {
  const { choice, id } = useParams();
  const navigate = useNavigate();
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
    setSelectedDistrict("");
    setSelectedSector("");
    setSelectedCell("");
    setVillages([]);

    const provinceData = rwandaData.find((item) => item.name === province);
    setDistricts(provinceData ? provinceData.districts : []);
  };

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

  const handleFilter = async () => {
    setDataFilter({
      province: selectedProvince || "",
      district: selectedDistrict || "",
      sector: selectedSector || "",
      cell: selectedCell || "",
      village: selectedVillage || "",
    });
  };

  useEffect(() => setDataChoice(choice), [choice]);

  return (
    <div className="w-full relative flex-1 flex-center-both">
      <header className="w-full flex gap-2 bg-white px-8 shadow-md z-[300] sticky top-[3.5rem] h-[3rem]">
        {!id ? (
          browseChoices.map((item, index) => (
            <div
              className={`py-2 capitalize px-4 ${
                choice === item.enName && "border-b-4 bg-zinc-200"
              } border-blue-500`}
              key={index}
              onClick={() => navigate(`/browse/${item.enName}`)}
            >
              {en ? item.enName : item.localName}
            </div>
          ))
        ) : (
          <img
            src={ArrowSvg}
            alt="arrow back"
            className="w-6 h-full"
            onClick={() => navigate(data?.length > 0 ? -1 : "/browse/houses")}
          />
        )}
      </header>
      <main className={`flex-1 w-full h-full flex`}>
        {!id && (
          <Sidebar
            selectedProvince={selectedProvince}
            handleProvinceChange={handleProvinceChange}
            selectedDistrict={selectedDistrict}
            handleDistrictChange={handleDistrictChange}
            selectedSector={selectedSector}
            handleSectorChange={handleSectorChange}
            selectedCell={selectedCell}
            handleCellChange={handleCellChange}
            selectedVillage={selectedVillage}
            handleVillageChange={handleVillageChange}
            districts={districts}
            sectors={sectors}
            cells={cells}
            villages={villages}
            rwandaData={rwandaData}
            en={en}
            handleFilter={handleFilter}
          />
        )}
        <div className="w-full flex-1 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Browse;
