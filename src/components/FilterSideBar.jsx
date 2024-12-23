import { useLocation } from "react-router-dom";

const Sidebar = ({
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
  en,
  handleFilter,
  rwandaData,
}) => {
  const { pathname } = useLocation();
  return (
    <div
      className={`min-w-[15rem] max-w-[15rem] flex-1 bg-white p-4 min-h-full max-md:hidden ${
        pathname === "/browse/electronics" && "hidden"
      }`}
    >
      <div className="sticky top-[7rem] w-ful">
        <div className="w-full flex pr-4 flex-col gap-4 pb-12 pt-4 max-h-[70vh] overflow-y-scroll scroll-design ">
          <h5 className="h5 leading-none">Address</h5>
          <div className="text-sm">
            <select
              className="w-full p-1 border cursor-pointer border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          </div>

          <div>
            <select
              className="w-full p-1 border cursor-pointer border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          </div>

          <div>
            <select
              className="w-full p-1 border cursor-pointer border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          </div>

          <div>
            <select
              className="w-full p-1 border cursor-pointer border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCell}
              onChange={handleCellChange}
              disabled={!cells.length}
            >
              <option value="">{en ? "Select Cell" : "Hitamo Akagari"}</option>
              {cells.map((cell) => (
                <option key={cell.name} value={cell.name}>
                  {cell.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="w-full p-1 border cursor-pointer border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          </div>
        </div>
        <button
          className="button p-1 text-white bg-blue-700 w-full my-2"
          onClick={handleFilter}
        >
          {en ? "Filter" : "Shakisha"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
