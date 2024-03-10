import { Result } from "@/lib/types";
import React from "react";
import AddNewColumn from "./modal/AddNewColumn";

type Props = {
  queryData: Result;
  setQueryData: React.Dispatch<React.SetStateAction<Result | null>>;
};

export type Column = {
  name: string;
  value: string;
};

const QueryBuilder = ({ queryData, setQueryData }: Props) => {
  const [resultQuery, setResultQuery] = React.useState<string>("");
  const [showAddColumn, setShowAddColumn] = React.useState<boolean>(false);
  const [newColumnData, setNewColumnData] = React.useState<Column>({
    name: "",
    value: "",
  });

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
      })
      .catch((err) => {
        console.error("Failed to copy SQL to clipboard", err);
      });
  };

  const handleChange = (column: string, event: any) => {
    setResultQuery("");
    const updatedColumnsData = { ...queryData.columnsData };
    updatedColumnsData[column] = event.target.value;
    setQueryData({
      ...queryData,
      columnsData: updatedColumnsData,
    });
  };

  const removeColumn = (column: string) => {
    setResultQuery("");
    const updatedColumnsData = { ...queryData.columnsData };
    delete updatedColumnsData[column];
    setQueryData({
      ...queryData,
      columnsData: updatedColumnsData,
    });
  };

  const closeModal = () => {
    setShowAddColumn(false);
  };

  const addColumn = () => {
    closeModal();
    const updatedColumnsData = { ...queryData.columnsData };
    if (newColumnData) {
      updatedColumnsData[newColumnData.name] = newColumnData?.value;
      setQueryData({
        ...queryData,
        columnsData: updatedColumnsData,
      });
    }
  };

  return (
    <div className="relative w-full">
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold">{queryData.tableName}</h1>
        <div className="flex flex-col gap-5 mt-10 max-h-[50vh] overflow-y-auto">
          {Object.keys(queryData.columnsData).map((column, index) => {
            return (
              <div key={index} className="flex items-center gap-3">
                {column} :{" "}
                <input
                  className="bg-gray-100 outline-none p-1"
                  value={queryData.columnsData[column]}
                  onChange={(e) => handleChange(column, e)}
                />
                <div
                  className="bg-red-500 rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
                  onClick={() => removeColumn(column)}
                >
                  <button className="text-white">-</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10">
          <button
            className="bg-red-500 px-2 py-1 rounded-md text-white mr-5"
            onClick={generateSql}
          >
            Generate Sql
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded-md text-white"
            onClick={() => setShowAddColumn(true)}
          >
            Add new Column
          </button>
        </div>
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
      {showAddColumn && (
        <AddNewColumn
          closeModal={closeModal}
          addColumn={addColumn}
          newColumnData={newColumnData}
          setNewColumnData={setNewColumnData}
        />
      )}
    </div>
  );
};

export default QueryBuilder;
