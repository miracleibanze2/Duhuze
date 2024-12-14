const MenuSvg = ({ openNavigation, onClick, className }) => {
  return (
    <svg
      className={`overflow-visible ${className && className}`}
      width="20"
      height="12"
      viewBox="0 0 20 12"
      onClick={onClick}
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill="blue"
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "10"}
        width="20"
        height="2"
        rx="1"
        fill="blue"
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};

export default MenuSvg;
