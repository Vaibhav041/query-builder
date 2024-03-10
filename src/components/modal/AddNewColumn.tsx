import React from "react";
import { Column } from "../QueryBuilder";

type Props = {
  closeModal: () => void;
  addColumn: () => void;
  newColumnData: Column;
  setNewColumnData: React.Dispatch<React.SetStateAction<Column>>;
};

const AddNewColumn = ({
  closeModal,
  addColumn,
  newColumnData,
  setNewColumnData,
}: Props) => {
  return (
    <div className="w-screen flex justify-center items-center h-[90vh] absolute top-0 bg-[rgba(0,0,0,0.7)]">
      <div className=" w-96 h-72 bg-blue-500 relative">
        <p
          className="absolute right-1 top-0 text-white cursor-pointer"
          onClick={closeModal}
        >
          x
        </p>
        <h1 className="text-gray-200 text-center text-2xl font-bold mt-4">
          Add New Column
        </h1>
        <div className="flex items-center flex-col p-2">
          <label className="text-white mt-5">Column Name</label>
          <input
            className="w-56 outline-none p-1"
            onChange={(e) =>
              setNewColumnData({ ...newColumnData, name: e.target.value })
            }
          />
          <label className="text-white mt-5">Column Value</label>
          <input
            className="w-56 outline-none p-1"
            onChange={(e) =>
              setNewColumnData({ ...newColumnData, value: e.target.value })
            }
          />
          <button
            className="bg-green-500 mt-5 py-1 px-2 rounded-sm text-white"
            onClick={addColumn}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewColumn;
