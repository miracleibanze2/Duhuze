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

const Loader = ({ screen }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-zinc-100 flex flex-col py-4">
      <LoadingSticks />
      {screen && <Reserved />}
    </div>
  );
};

export default Loader;
