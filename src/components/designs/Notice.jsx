import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

const Notice = () => {
  const { notice, setNotice } = useContext(AppContext);

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
      <div className="py-2 w-full bg-zinc-300 border-y border-zinc-400 text-center body-1 z-[1000] sticky top-[4rem]">
        {notice}
      </div>
    )
  );
};

export default Notice;
