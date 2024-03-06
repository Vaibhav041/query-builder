import { Result } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setQueryData: Dispatch<SetStateAction<Result | null>>;
};

const Navbar = ({ setQueryData }: Props) => {
  return (
    <div className="h-[70px] bg-blue-500 w-100 flex items-center p-5">
      <p
        className="font-bold text-gray-300 text-xl cursor-pointer"
        onClick={() => setQueryData(null)}
      >
        Query Builder
      </p>
    </div>
  );
};

export default Navbar;
