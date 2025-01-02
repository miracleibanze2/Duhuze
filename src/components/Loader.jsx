import BrowseSkeleton from "./designs/BrowseSkeleton";
import { Reserved } from "./Footer";

export const LoadingSticks = () => {
  return (
    <div className="flex-center-hor gap-1 w-full flex-1">
      {Array(8)
        .fill("")
        .map((item, index) => (
          <div
            className={`w-1 h-5 bg-green-400 pin-load-${index}`}
            key={index}
          />
        ))}
    </div>
  );
};

export const Skeleton = () => {
  return (
    <div className="w-full h-full flex container flex-col pt-[3.5rem]">
      <div className="w-full h-[3rem] skeleton-loader bg-white"></div>

      <div className="w-full h-full skeleton-loader bg-zinc-200"></div>
    </div>
  );
};

const Loader = ({ screen }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-zinc-100 flex flex-col py-4 items-center">
      <Skeleton />
      {screen && <Reserved />}
    </div>
  );
};

export default Loader;
