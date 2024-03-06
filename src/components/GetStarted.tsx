import { Result } from "@/lib/types";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setQueryData: Dispatch<SetStateAction<Result | null>>;
};

const GetStarted = ({ setQueryData }: Props) => {
  const [query, setQuery] = useState<string>("");

  const handleClick = () => {
    const regex = /INSERT INTO\s+(\w+)\s+\((.*?)\)\s+VALUES\s+\((.*?)\);/i;
    const matches = query.match(regex);

    if (!matches || matches.length < 4) {
      console.error("Invalid INSERT query format");
      return;
    }

    const tableName = matches[1];
    const columnNames = matches[2].split(",").map((column) => column.trim());
    const values = matches[3].split(",").map((value) => value.trim());

    const data: { [key: string]: string } = {};
    for (let i = 0; i < columnNames.length; i++) {
      data[columnNames[i]] = values[i];
    }

    setQueryData({
      tableName: tableName,
      columnsData: data,
    });

    console.log(tableName, data);
  };

  return (
    <section className="flex flex-col mt-20 justify-center items-center gap-3">
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Insert query here."
        className="outline-none border h-10 bg-gray-100 rounded-md w-96 p-2"
      />
      <button
        type="button"
        className="bg-red-500 p-2 w-[70px] rounded-sm  text-white"
        onClick={handleClick}
      >
        Go!
      </button>
    </section>
  );
};

export default GetStarted;
