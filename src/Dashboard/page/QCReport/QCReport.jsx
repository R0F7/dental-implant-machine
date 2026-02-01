import CalendarRange from "@/component/CalendarRange/CalendarRange";
import Table from "@/component/Table/Table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Loading from "../Loading/Loading";
import countLeadsByFirstResponseTimeRange from "@/utility/countLeadsByFirstResponseTimeRange";
// import countLeadsWithFirstResponseGreaterThan30Min from "@/utility/countLeadsWithFirstResponseGreaterThan30Min";
// import countLeadsFirstResponseBetween0To15Min from "@/utility/countLeadsWithFirstResponseGreaterThan30Min";

const QCReport = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [clinicIds, setClinicIds] = useState([]);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [range, setRange] = useState([
    {
        startDate: thirtyDaysAgo,
        endDate: new Date(),
      // startDate: new Date("2025-12-21T18:00:00.000Z"),
      // endDate: new Date("2026-01-21T18:00:00.000Z"),
      key: "selection",
    },
  ]);

  const startDate = dayjs(range[0].startDate).format("YYYY-MM-DD");
  const endDate = dayjs(range[0].endDate).format("YYYY-MM-DD");
  // console.log(range[0].startDate, range[0].endDate);

  const { data: all_setter } = useQuery({
    queryKey: ["all_setter"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all_setter`);
      return data;
    },
  });

  useEffect(() => {
    if (all_setter?.length >= 1) {
      setSelected(all_setter[0]);
    }
  }, [all_setter]);

  //   console.log(selected.selectedClients);
  //   console.log(clinicIds);

  useEffect(() => {
    const ids = selected?.selectedClients?.map((clinic) => clinic.id);
    setClinicIds(ids);
  }, [selected]);

  const { data: leads = [], isLoading: opporLoading } = useQuery({
    queryKey: ["opportunities", startDate, endDate, clinicIds],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/opportunities", {
        params: {
          from: startDate,
          to: endDate,
          clinicIds: JSON.stringify(clinicIds),
        },
      });
      return data;
    },
    //   enabled: !loading && !!user && !!clinics,
  });

  const { data: messages = [], isLoading: convLoading } = useQuery({
    queryKey: ["messages", startDate, endDate, clinicIds],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/messages", {
        params: {
          from: startDate,
          to: endDate,
          clinicIds: JSON.stringify(clinicIds),
        },
      });
      return data;
    },
    //   enabled: !loading && !!user && !!clinics,
  });
  //   console.log(leads.length, messages.length);

  // let config = {
  //   method: "get",
  //   maxBodyLength: Infinity,
  //   url: "https://services.leadconnectorhq.com/calendars/events?locationId=HgiBOaKxNEO2RVYbuTf1&calendarId=S72YP1CH8mYdmuXYnTlW&startTime=1766361600000&endTime=1769126399000",
  //   headers: {
  //     Accept: "application/json",
  //     Version: "2021-04-15",
  //     Authorization: "Bearer pit-30babb36-fc7b-4715-8fe3-92f87956ee64",
  //   },
  // };

  // axios
  //   .request(config)
  //   .then((response) => {
  //     console.log((response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const isLeadInStageWithinRange = (lead, stageSet) => {
    if (!stageSet.has(lead.pipelineStageId) || !lead.lastStageChangeAt)
      return false;

    const stageChangeDate = dayjs(lead.lastStageChangeAt)
      .tz(lead.clinicTimezone)
      .format("YYYY-MM-DD");

    return stageChangeDate >= startDate && stageChangeDate <= endDate;
  };

  const reports = selected?.selectedClients?.map((clinic) => {
    // const start = new Date(range[0].startDate);
    // const end = new Date(range[0].endDate);
    // const diff = Math.abs(end - start);
    // const working_day =  Math.ceil(diff / (1000 * 60 * 60 * 24));

    const clinicLeads = leads.filter(
      (lead) => String(lead.clinicId) === String(clinic.id),
    );

    const clinicMessages = messages.filter(
      (msg) => String(msg.clinicId) === String(clinic.id),
    );
    // console.log(clinicLeads.length,clinicMessages.length);

    const d1 = dayjs(startDate);
    const d2 = dayjs(endDate);
    const diff = d2.diff(d1, "day");

    const working_day = diff;

    const total_of_call = clinicMessages.filter(
      (message) =>
        message.direction === "outbound" &&
        message.messageType === "TYPE_CALL" &&
        message.userId === clinic.userID,
    ).length;

    const OB_call_per_day = Math.round(total_of_call / working_day);

    const bookingStageIdSet = new Set(
      clinic?.booking_pipelines?.map((p) => p.id),
    );

    const total_of_sets = clinicLeads.filter((lead) =>
      isLeadInStageWithinRange(lead, bookingStageIdSet),
    ).length;

    const inbound_calls_total = clinicMessages.filter(
      (message) =>
        message.direction === "inbound" && message.messageType === "TYPE_CALL",
    );

    const inbound_calls_answer = inbound_calls_total.filter(
      (call) => call.status === "completed",
    );

    const IBAR = (
      (inbound_calls_answer.length / inbound_calls_total.length) *
      100
    ).toFixed(2);

    const thirty_plus_minutes_to_respond = countLeadsByFirstResponseTimeRange(
      clinicLeads,
      clinicMessages,
      30,
      null,
      "TYPE_CALL",
    );

    const with_in_15_minutes = countLeadsByFirstResponseTimeRange(
      clinicLeads,
      clinicMessages,
      0,
      15,
      "TYPE_CALL",
    );

    const total_leads_reviewed =
      thirty_plus_minutes_to_respond + with_in_15_minutes;

    const percentage_of_leads_w_thirty_plus_mins = (
      (thirty_plus_minutes_to_respond / total_leads_reviewed) *
      100
    ).toFixed(2);

    const percentage_of_leads_with_in_fifteen_mins = (
      (with_in_15_minutes / total_leads_reviewed) *
      100
    ).toFixed(2);

    return {
      office: clinic.name,
      setter: selected?.name,
      date_range: `${startDate + " - " + endDate}`,
      working_day: working_day,
      total_of_call,
      OB_call_per_day,
      total_of_opportunities: clinicLeads.length,

      total_of_sets,
      set_day: working_day ? (total_of_sets / working_day).toFixed(2) : 0,
      lead_to_schedule_ratio: clinicLeads.length
        ? ((total_of_sets / clinicLeads.length) * 100).toFixed(2)
        : 0,

      inbound_calls_total: inbound_calls_total.length,
      inbound_calls_answer: inbound_calls_answer.length,
      IBAR,
      thirty_plus_minutes_to_respond,
      with_in_15_minutes,
      total_leads_reviewed,
      percentage_of_leads_w_thirty_plus_mins,
      percentage_of_leads_with_in_fifteen_mins,
    };
  });

  if (opporLoading || convLoading) return <Loading />;

  const columns = [
    columnHelper.accessor("office", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Office",
    }),

    columnHelper.accessor("setter", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "setter",
    }),

    columnHelper.accessor("date_range", {
      cell: (info) => <span className="text-nowrap">{info.getValue()}</span>,
      header: "date range",
    }),
    columnHelper.accessor("working_day", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "working day",
    }),
    columnHelper.accessor("total_of_call", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "total of call",
    }),
    columnHelper.accessor("OB_call_per_day", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "OB call per day",
    }),
    columnHelper.accessor("total_of_opportunities", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "total of opportunities",
    }),
    columnHelper.accessor("total_of_sets", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "total of sets",
    }),
    columnHelper.accessor("set_day", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "set/day",
    }),
    columnHelper.accessor("lead_to_schedule_ratio", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "lead to schedule ratio",
    }),
    columnHelper.accessor("inbound_calls_total", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "inbound calls total",
    }),
    columnHelper.accessor("inbound_calls_answer", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "inbound calls answer",
    }),
    columnHelper.accessor("IBAR", {
      cell: (info) => (
        <span
          className={`${info.getValue() <= 20 ? "bg-red-200" : ""} inline-block px-2 py-0.5`}
        >
          {info.getValue()}%
        </span>
      ),
      header: "IBAR",
    }),
    columnHelper.accessor("thirty_plus_minutes_to_respond", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "30 + minutes to respond",
    }),
    columnHelper.accessor("with_in_15_minutes", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "within 15 minutes",
    }),
    columnHelper.accessor("total_leads_reviewed", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "total leads reviewed",
    }),
    columnHelper.accessor("percentage_of_leads_w_thirty_plus_mins", {
      cell: (info) => (
        <span
          className={`${info.getValue() > 20 ? "bg-red-200" : ""} inline-block px-2 py-0.5`}
        >
          {info.getValue()}%
        </span>
      ),
      header: "% of Leads w/ 30+ mins",
    }),
    columnHelper.accessor("percentage_of_leads_with_in_fifteen_mins", {
      cell: (info) => <span>{info.getValue()}%</span>,
      header: "% of Leads within 15 mins",
    }),
  ];

  return (
    <div>
      <div className="sticky top-[90px] z-20 bg-white py-6 mb-6 rounded-md shadow flex items-center justify-between px-4">
        <div className="relative w-64">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 text-left border rounded-md bg-white shadow-sm flex justify-between items-center"
          >
            <span>{selected?.name || "Select an option"}</span>
            <span>
              <MdKeyboardArrowDown />
            </span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10">
              {all_setter.map((setter) => (
                <label
                  key={setter._id}
                  className="flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-gray-100 border-b"
                >
                  <input
                    type="radio"
                    name="dropdown"
                    value={setter.email}
                    checked={selected?.email === setter.email}
                    onChange={() => {
                      setSelected({
                        name: setter.name,
                        email: setter.email,
                        selectedClients: setter.selectedClients,
                      });
                      setIsOpen(false);
                    }}
                    className="accent-blue-600 w-4 translate-y-0.5"
                  />
                  {setter.name}
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <CalendarRange range={range} setRange={setRange} />
        </div>
      </div>

      <div className="overflow-hidden max-w-[calc(100vw-305px)]">
        <Table columns={columns} data={reports || []}></Table>
      </div>
    </div>
  );
};

export default QCReport;
