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
  rwandaData,
  className,
  
}) => {
  return (
    <div
      className={
        className
          ? className
          : `w-full flex pr-4 flex-col gap-4 pb-12 pt-4 max-h-[70vh] overflow-y-scroll scroll-design`
      }
    >
      <h5
        className={`${className ? "body-1 text-zinc-900" : "h5"} leading-none`}
      >
        Address
      </h5>
      <div className="text-sm">
        <select
          className="w-full p-1 border cursor-pointer border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          <option value="">{en ? "Select Province" : "Hitamo Intara"}</option>
          {rwandaData?.map((province) => (
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
          <option value="">{en ? "Select District" : "Hitamo Akarere"}</option>
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
          <option value="">{en ? "Select Sector" : "Hitamo Umurenge"}</option>
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
          <option value="">{en ? "Select Village" : "Hitamo Umudugudu"}</option>
          {villages.map((village) => (
            <option key={village.name} value={village.name}>
              {village.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
