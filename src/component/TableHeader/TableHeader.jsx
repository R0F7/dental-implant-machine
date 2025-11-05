import React from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineSearch } from "react-icons/hi";

const TableHeader = ({
  title,
  label,
  search,
  setSearch,
  setOpen,
  setInitialSchema,
  initialValues,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-5">
      <h1 className="title">{title}</h1>

      <div className="flex items-center gap-4">
        <form className="flex items-center ">
          <div className="relative lg:w-[300px]">
            <input
              type="search"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-r-0 py-2 pl-7 rounded-r-none"
            />
            <HiOutlineSearch
              size={15}
              className="absolute top-1/2 -translate-y-1/2 left-2.5 text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="border w-8 h-8 flex items-center justify-center rounded-md rounded-l-none hover:border-[#1677FF] text-gray-600 submit-button"
          >
            <HiOutlineSearch />
          </button>
        </form>

        <button
          onClick={() => {
            setOpen(true);
            setInitialSchema(initialValues);
          }}
          className="flex items-center gap-1 border rounded-full md:px-4 px-2 py-1.5 text-sm bg-[#247CFF] text-white text-nowrap"
        >
          <GoPlus />
          Add {label}
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
