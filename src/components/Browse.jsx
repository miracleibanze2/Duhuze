import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "./axiosInstance";
import { browseChoices } from "./constants";
import { AppContext } from "./AppContext";
import BrowseContent from "./BrowseContent";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./FilterSideBar";
import Loader from "./Loader";
import { angleDownSvg, ArrowSvg } from "../assets";
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
  const [toggleFilter, setToggleFilter] = useState(true);

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
    setDataFilter({
      selectedProvince: "",
      selectedDistrict: "",
      selectedSector: "",
      selectedCell: "",
      selectedVillage: "",
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

  const renderHeaderContent = () => {
    if (!id) {
      return browseChoices.map((item, index) => (
        <div
          key={index}
          className={`py-2 capitalize px-4 ${
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
        <div className="container w-full flex gap-2 px-8">
          {renderHeaderContent()}
        </div>
      </header>
      <main className={`flex-1 w-full h-full flex justify-center bg-white`}>
        <div className="container flex w-full flex-1 lg:flex-row flex-col min-h-[30rem]">
          {!id && choice !== "electronics" && (
            <>
              <div className="p-2 lg:hidden flex relative w-full flex-1 px-6">
                <div
                  className="body-1 font-semibold flex-between-hor gap-6 w-full max-w-xs px-4 rounded-md hover:bg-zinc-300"
                  onClick={() => setToggleFilter(!toggleFilter)}
                >
                  Filter
                  <img src={angleDownSvg} alt="filter" className="w-5 h-5" />
                </div>
                {toggleFilter && (
                  <div className="absolute top-full right-0 left-0 z-[10] bg-zinc-100 pb-12 shadow-md flex flex-col px-5">
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
                      className="flex flex-wrap p-3 gap-4 items-center"
                    />
                    <button
                      className="button p-1 text-white bg-blue-700 flex-1 my-2"
                      onClick={handleFilter}
                    >
                      {en ? "Filter" : "Shakisha"}
                    </button>
                  </div>
                )}
              </div>
              <div
                className={`min-w-[15rem] max-w-[15rem] flex-1 p-4 h-full lg:flex hidden ${
                  pathname === "/browse/electronics" && "hidden"
                }`}
              >
                <div className="sticky top-[7rem] w-full h-max">
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
                  />
                  <button
                    className="button p-1 text-white bg-blue-700 w-full my-2"
                    onClick={handleFilter}
                  >
                    {en ? "Filter" : "Shakisha"}
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="w-full flex-1 min-h-full bg-zinc-100">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Browse;
