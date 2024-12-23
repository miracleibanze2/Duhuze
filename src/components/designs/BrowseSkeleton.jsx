const BrowseSkeleton = ({ three }) => {
  return (
    <div
      className={`sticky inset-0 top-[6.5rem] bg-zinc-100 flex-1 z-[120] h-full flex justify-center pt-4 gap-12 ${
        !three && "flex-wrap"
      }`}
    >
      {Array(three ? 3 : 5)
        .fill("")
        .map((item, index) => (
          <div
            className="max-w-[15rem] w-full h-[20rem] rounded-md flex flex-col"
            key={index}
          >
            <div className="w-full aspect-video skeleton-loader bg-zinc-200 rounded-md" />
            <div className="bg-white p-3 flex-1 h-full">
              <div className="w-1/2 mb-2 h-4 bg-zinc-200 skeleton-loader rounded-md" />
              <div className="w-full h-4 mb-2 bg-zinc-200 skeleton-loader rounded-md" />
              <div className="w-full h-4 mb-2 bg-zinc-200 skeleton-loader rounded-md" />
              <div className="w-full h-4 mb-2 bg-zinc-200 skeleton-loader rounded-md" />
            </div>
            <div className="w-full p-2 flex bg-white">
              <div className="w-full h-8 mb-2 bg-zinc-200 skeleton-loader rounded-md" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default BrowseSkeleton;
