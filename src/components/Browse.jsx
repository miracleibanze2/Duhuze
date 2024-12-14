import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "./axiosInstance";
import { browseChoices } from "./constants";
import { AppContext } from "./AppContext";
import { LoadingSticks } from "./Loader";
import BrowseContent from "./BrowseContent";

const Browse = () => {
  const [filter, setFilter] = useState([]);
  const [choice, setChoice] = useState("houses");
  const { en } = useContext(AppContext);
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
    setFilter({
      province: selectedProvince,
      district: selectedDistrict,
      sector: selectedSector,
      cell: selectedCell,
      village: selectedVillage,
    });
  };

  return (
    <div className="w-full relative flex-1 flex-center-both">
      <header className="w-full flex gap-2 bg-white px-8 shadow-md z-[100] sticky top-[4rem] h-[3rem]">
        {browseChoices.map((item, index) => (
          <div
            className={`py-2 capitalize px-4 ${
              choice === item.enName && "border-b-4 bg-zinc-200"
            } border-blue-500`}
            key={index}
            onClick={() => setChoice(item.enName)}
          >
            {en ? item.enName : item.localName}
          </div>
        ))}
      </header>
      <main className={`flex-1 w-full h-full flex`}>
        <div className="min-w-[15rem] max-w-[15rem] flex-1 bg-white p-4 min-h-full">
          <div className="sticky top-[7rem] w-full flex flex-col gap-4 pb-12 pt-4">
            <h4 className="h4 leading-none">Address</h4>
            <div>
              <label>
                {en ? "Province" : "Intara"}:
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">
                    {en ? "Select Province" : "Hitamo Intara"}
                  </option>
                  {rwandaData.map((province) => (
                    <option key={province.name} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label>
                {en ? "District" : "Akarere"}:
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!districts.length}
                >
                  <option value="">
                    {en ? "Select District" : "Hitamo Akarere"}
                  </option>
                  {districts.map((district) => (
                    <option key={district.name} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label>
                {en ? "Sector" : "Umurenge"}:
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedSector}
                  onChange={handleSectorChange}
                  disabled={!sectors.length}
                >
                  <option value="">
                    {en ? "Select Sector" : "Hitamo Umurenge"}
                  </option>
                  {sectors.map((sector) => (
                    <option key={sector.name} value={sector.name}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label>
                {en ? "Cell" : "Akagari"}:
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCell}
                  onChange={handleCellChange}
                  disabled={!cells.length}
                >
                  <option value="">
                    {en ? "Select Cell" : "Hitamo Akagari"}
                  </option>
                  {cells.map((cell) => (
                    <option key={cell.name} value={cell.name}>
                      {cell.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label>
                {en ? "Village" : "Umudugudu"}:
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedVillage}
                  disabled={!villages.length}
                  onChange={handleVillageChange}
                >
                  <option value="">
                    {en ? "Select Village" : "Hitamo Umudugudu"}
                  </option>
                  {villages.map((village) => (
                    <option key={village.name} value={village.name}>
                      {village.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              className="button p-2 text-white bg-blue-700"
              onClick={handleFilter}
            >
              {en ? "Filter" : "Shakisha"}
            </button>
          </div>
        </div>

        <div className="w-full flex-1 min-h-full">
          <BrowseContent filter={filter} choice={choice} />
        </div>
      </main>
    </div>
  );
};

export default Browse;
