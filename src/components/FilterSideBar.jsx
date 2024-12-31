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
  search,
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
      <div>
        <select
          className="input"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          <option value="">{en ? "Select Province" : "Hitamo Intara"}</option>
          {rwandaData?.map((province) => (
            <option key={province.name} value={province.name}>
              {en ? province.name : province.localname}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`${
          search &&
          (districts.length === 0 || rwandaData?.length === 0) &&
          "hidden"
        }`}
      >
        <select
          className="input"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!districts.length}
        >
          <option value="">{en ? "Select District" : "Hitamo Akarere"}</option>
          {districts.map((district) => (
            <option key={district.name} value={district.name}>
              {en ? district.name : district.localname}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`${
          search &&
          (sectors.length === 0 ||
            districts.length === 0 ||
            rwandaData?.length === 0) &&
          "hidden"
        }`}
      >
        <select
          className="input"
          value={selectedSector}
          onChange={handleSectorChange}
          disabled={!sectors.length}
        >
          <option value="">{en ? "Select Sector" : "Hitamo Umurenge"}</option>
          {sectors.map((sector) => (
            <option key={sector.name} value={sector.name}>
              {en ? sector.name : sector.localname}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`${
          search &&
          (cells.length === 0 ||
            sectors.length === 0 ||
            districts.length === 0 ||
            rwandaData?.length === 0) &&
          "hidden"
        }`}
      >
        <select
          className="input"
          value={selectedCell}
          onChange={handleCellChange}
          disabled={!cells.length}
        >
          <option value="">{en ? "Select Cell" : "Hitamo Akagari"}</option>
          {cells.map((cell) => (
            <option key={cell.name} value={cell.name}>
              {en ? cell.name : cell.localname}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`${
          search &&
          (villages.length === 0 ||
            cells.length === 0 ||
            sectors.length === 0 ||
            districts.length === 0 ||
            rwandaData?.length === 0) &&
          "hidden"
        }`}
      >
        <select
          className="input"
          value={selectedVillage}
          disabled={!villages.length}
          onChange={handleVillageChange}
        >
          <option value="">{en ? "Select Village" : "Hitamo Umudugudu"}</option>
          {villages.map((village) => (
            <option key={village.name} value={village.name}>
              {en ? village.name : village.localname}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
