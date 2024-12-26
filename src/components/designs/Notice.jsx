import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

const Notice = () => {
  const context = useContext(AppContext);
  if (!context) return;
  const { notice, setNotice } = context;

  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => {
        setNotice("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notice]);

  return (
    notice !== "" && (
      <div className=" py-1 w-full bg-zinc-300 border-b border-zinc-400 text-center body-1 z-[1000] sticky top-[6.5rem]">
        {notice}
      </div>
    )
  );
};

export default Notice;
