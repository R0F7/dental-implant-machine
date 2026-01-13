import Table from "@/component/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const KPIsReportTable = ({ data }) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("date", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "date",
    }),

    columnHelper.accessor("totalLead", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "New Leads",
    }),

    columnHelper.accessor("inboundCallRate", {
      cell: (info) => <span>{info.getValue()}%</span>,
      header: "inbound Call Rate",
    }),

    columnHelper.accessor("avgCall", {
      cell: ({ getValue }) => {
        const { days, hours, minutes } = getValue();
        return <span>{`${days}d ${hours}h ${minutes}m`}</span>;
      },
      header: "Avg Lead Call Response Time",
    }),

    columnHelper.accessor("avgSms", {
      cell: ({ getValue }) => {
        const { days, hours, minutes } = getValue();
        return <span>{`${days}d ${hours}h ${minutes}m`}</span>;
      },
      header: "Avg Lead SMS Response Time",
    }),

    columnHelper.accessor("conversion", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Conversations",
    }),

    columnHelper.accessor("booking", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Appt Booking",
    }),

    columnHelper.accessor("showing", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Appt Showing",
    }),

    columnHelper.accessor("close", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Close",
    }),
  ];

  //   console.log(data);
  return (
    <>
      <Table columns={columns} data={data} pagination={true}></Table>
    </>
  );
};

export default KPIsReportTable;
