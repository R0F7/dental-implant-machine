// import { useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import PropTypes from "prop-types";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// const Table = ({ columns, data }) => {
//   const [sorting, setSorting] = useState([]);

//   const table = useReactTable({
//     data,
//     columns,
//     state: { sorting },
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//   });

//   const pageSize = table.getState().pagination.pageSize;
//   const pageIndex = table.getState().pagination.pageIndex;
//   const totalRows = table.getPrePaginationRowModel().rows.length;

//   const start = pageIndex * pageSize + 1;
//   const end = Math.min((pageIndex + 1) * pageSize, totalRows);

//   return (
//     <section className="">
//       <table className="w-full text-left ext-sm">
//         <thead className="bg-[#5985FF] text-white">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header, idx) => (
//                 <th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className="uppercase px-3.5 py-2 lg:py-4 cursor-pointer text-xs font-semibold select-none first:rounded-tl-xl last:rounded-tr-xl"
//                 >
//                   <div
//                     className={`w-full flex items-center justify-between ${
//                       idx !== headerGroup.headers.length - 1 ? "border-r" : ""
//                     }`}
//                   >
//                     {/* Header Text */}
//                     <span className="truncate">
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </span>

//                     {/* Sort Icon */}
//                     <span className="mr-4 flex-shrink-0">
//                       {header.column.getIsSorted() === "asc"
//                         ? "🔼"
//                         : header.column.getIsSorted() === "desc"
//                         ? "🔽"
//                         : ""}
//                     </span>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.length
//             ? table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className={`bg-white text-[rgb(107,114,128)] hover:bg-gray-50 border-b border-dashed`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="px-3.5 py-3">
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             : null}
//         </tbody>
//       </table>

//       {/* Pagination and page size controls */}
//       <div className="flex items-center justify-end text-black mt-2.5 gap-2">
//         <p className="text-[rgb(107,107,107)] text-xs uppercase">
//           {start}–{end} of {totalRows} users
//         </p>

//         {/* current data position */}
//         <div className="flex gap-2">
//           <button
//             onClick={() => {
//               table.previousPage();
//             }}
//             disabled={!table.getCanPreviousPage()}
//             className="border border-gray-300 w-[26px] h-[26px] flex items-center justify-center rounded-md disabled:opacity-30 active:scale-90 scale-100 transition duration-300 shadow-sm disabled:cursor-not-allowed"
//           >
//             <IoIosArrowBack />
//           </button>
//           <span className="border w-[26px] h-[26px] flex items-center justify-center rounded-md bg-[#1A4BD2] text-white text-sm">
//             {pageIndex + 1}
//           </span>
//           <button
//             onClick={() => {
//               table.nextPage();
//             }}
//             disabled={!table.getCanNextPage()}
//             className="border border-gray-300 w-[26px] h-[26px] flex items-center justify-center rounded-md disabled:opacity-30 active:scale-90 scale-100 transition duration-300 shadow-sm disabled:cursor-not-allowed"
//           >
//             <IoIosArrowForward />
//           </button>
//         </div>

//         {/* Page 1 of 2 */}
//         {/* <span className="flex items-center gap-1 font-semibold">
//           <div>Page</div>
//           <strong className="font-semibold">
//             {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </strong>
//         </span> */}

//         {/* Go to page */}
//         {/* <span className="flex items-center gap-1 font-semibold">
//           | Go to page:
//           <input
//             type="number"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               table.setPageIndex(page);
//             }}
//             className="border p-1 pl-2 rounded w-14 bg-transparent shadow-sm"
//           />
//         </span> */}

//         {/* total data per page */}
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//           className="h-9 bg-transparent border px-1.5 rounded shadow-sm text-sm text-[rgb(107,107,107)] outline-none w-fit"
//         >
//           {[10, 20, 30, 50, 100].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               {pageSize} / page
//             </option>
//           ))}
//         </select>
//       </div>
//     </section>
//   );
// };

// Table.propTypes = {
//   columns: PropTypes.array,
//   data: PropTypes.array,
// };

// export default Table;

import { Fragment, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Table = ({ columns, data, pagination, nestedColumns, nestedData }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  });

  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const totalRows = table.getPrePaginationRowModel().rows.length;
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <section className="">
      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-[#5985FF] text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={idx}
                  onClick={header.column.getToggleSortingHandler()}
                  className="uppercase px-3.5 py-2 lg:py-3 cursor-pointer text-xs font-semibold select-none first:rounded-tl-xl last:rounded-tr-xl"
                >
                  <div
                    className={`w-full flex items-center justify-between ${
                      idx !== headerGroup.headers.length - 1 ? "border-r" : ""
                    }`}
                  >
                    <span className="truncate">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>

                    <span className="ml-2 flex-shrink-0">
                      {header.column.getIsSorted() === "asc"
                        ? "🔼"
                        : header.column.getIsSorted() === "desc"
                        ? "🔽"
                        : ""}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Fragment key={row.id}>
                <tr
                  className={`bg-white text-gray-700 hover:bg-gray-50 border-b border-dashed`}
                >
                  {row.getVisibleCells().map((cell,idx) => (
                    <td
                      key={idx}
                      className="px-3.5 py-3 align-top"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>

                {/* nested row */}
                {nestedData && nestedData.row_id == row.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={columns.length} className="p-6">
                      {nestedData?.data?.length > 0 ? (
                        <Table data={nestedData.data} columns={nestedColumns} />
                      ) : (
                        <div className="text-gray-500 text-sm italic text-center">
                          No data found.
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-end text-black mt-2.5 gap-2">
          <p className="text-gray-600 text-xs uppercase">
            {start}–{end} of {totalRows} users
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border border-gray-300 w-[26px] h-[26px] flex items-center justify-center rounded-md disabled:opacity-30 active:scale-90 transition"
            >
              <IoIosArrowBack />
            </button>
            <span className="border w-[26px] h-[26px] flex items-center justify-center rounded-md bg-[#1A4BD2] text-white text-sm">
              {pageIndex + 1}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border border-gray-300 w-[26px] h-[26px] flex items-center justify-center rounded-md disabled:opacity-30 active:scale-90 transition"
            >
              <IoIosArrowForward />
            </button>
          </div>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="h-fit py-0.5 bg-transparent border px-1.5 rounded shadow-sm text-sm text-[rgb(107,107,107)] outline-none w-fit"
          >
            {[10, 20, 30, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} / page
              </option>
            ))}
          </select>
        </div>
      )}
    </section>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  nestedColumns: PropTypes.array,
};

export default Table;
