import { Result } from "@/lib/types";
import React from "react";

type Props = {
  queryData: Result;
  setQueryData: React.Dispatch<React.SetStateAction<Result | null>>;
};

const QueryBuilder = ({ queryData, setQueryData }: Props) => {
  const [resultQuery, setResultQuery] = React.useState<string>("");

  const generateSql = () => {
    const { tableName, columnsData: rowData } = queryData;
    const columnNames = Object.keys(rowData);

    const values = Object.values(rowData);

    const columns = columnNames.join(", ");
    const rowValues = values.join(", ");

    setResultQuery(
      `INSERT INTO ${tableName} (${columns}) VALUES (${rowValues});`
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(resultQuery)
      .then(() => {
        console.log("SQL copied to clipboard");
        // You can provide user feedback here if needed
      })
      .catch((err) => {
        console.error("Failed to copy SQL to clipboard", err);
        // Handle error
      });
  };

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
        <button
          className="bg-red-500 px-2 py-1 rounded-md text-white mt-10"
          onClick={generateSql}
        >
          Generate Sql
        </button>
      </div>
      <p
        className="absolute left-5 top-5 text-lg font-bold cursor-pointer"
        onClick={() => setQueryData(null)}
      >
        {"<-"}
      </p>
      {resultQuery.length > 0 && (
        <div className="flex mt-10 bg-gray-100 mx-5 p-3 rounded-md h-24 relative overflow-y-auto">
          <p>{resultQuery}</p>
          <button
            className="bg-green-500 w-16 text-white rounded-sm p-1 absolute right-2 top-2"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default QueryBuilder;
