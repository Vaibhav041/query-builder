import { Result } from "@/lib/types";
import React from "react";

type Props = {
  queryData: Result;
  setQueryData: React.Dispatch<React.SetStateAction<Result | null>>;
};

const QueryBuilder = ({ queryData, setQueryData }: Props) => {
  return (
    <div className="relative w-full">
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold">{queryData.tableName}</h1>
        <div className="flex flex-col gap-5 mt-10 max-h-[50vh] overflow-y-auto">
          {Object.keys(queryData.columnsData).map((column, index) => {
            return (
              <div key={index}>
                {column} :{" "}
                <input
                  className="bg-gray-100 outline-none p-1"
                  value={queryData.columnsData[column]}
                />
              </div>
            );
          })}
        </div>
        <button className="bg-red-500 px-2 py-1 rounded-md text-white mt-10">
          Generate Sql
        </button>
      </div>
      <p
        className="absolute left-5 top-5 text-lg font-bold cursor-pointer"
        onClick={() => setQueryData(null)}
      >
        {"<-"}
      </p>
    </div>
  );
};

export default QueryBuilder;
