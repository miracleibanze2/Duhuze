const BrowseSkeleton = ({ three }) => {
  return (
    <div
      className={`w-full flex-1 h-full flex flex-wrap justify-center bg-zinc-100 gap-12 p-3 ${
        !three && "flex-wrap"
      }`}
    >
      {Array(three ? 3 : 5)
        .fill("")
        .map((item, index) => (
          <div
            className="max-w-[21rem] w-full h-[30rem] rounded-md flex flex-col"
            key={index}
          >
            <div className="w-full aspect-video skeleton-loader bg-zinc-200 rounded-md" />
            <div className="bg-white p-3 flex-1 h-full">
              <div className="w-1/2 mb-4 h-8 bg-zinc-200 skeleton-loader rounded-md" />
              <div className="w-full h-6 mb-2 bg-zinc-200 skeleton-loader rounded-md" />
              <div className="w-full h-6 mb-2 bg-zinc-200 skeleton-loader rounded-md" />
              <div className="w-full h-6 mb-2 bg-zinc-200 skeleton-loader rounded-md" />
            </div>
            <div className="w-full p-2 flex bg-white">
              <div className="w-full h-12 mb-2 bg-zinc-200 skeleton-loader rounded-md" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default BrowseSkeleton;
