import KPI from "@/component/KPI/KPI";
import React, { useMemo, useState } from "react";
import {
  FaPhoneAlt,
  FaPhoneVolume,
  FaSms,
  FaCalendarCheck,
  FaEye,
  FaHandshake,
} from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { HiOutlineDocumentText, HiPresentationChartLine } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import GoalAchieve from "@/component/GoalAchieve/GoalAchieve";
import KPIsReportTable from "../KPIsReportTable/KPIsReportTable";
import LineChart from "@/component/LineChart/LineChart";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalendarRange from "@/component/CalendarRange/CalendarRange";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const KPIsReport = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const { db_user: { permissions } = {}, user, loading } = useAuth();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const [range, setRange] = useState([
    {
      startDate: oneMonthAgo,
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const startDate = dayjs(range[0].startDate).format("YYYY-MM-DD");
  const endDate = dayjs(range[0].endDate).format("YYYY-MM-DD");

  const axiosSecure = useAxiosSecure();

  const { data: clinics = [] } = useGetSecureData("clinics", "/clinics");

  const selectedClinics = useMemo(
    () => clinics.filter((c) => c.selected),
    [clinics],
  );

  const selectedClinicIds = useMemo(
    () => selectedClinics.map((clinic) => clinic._id),
    [selectedClinics],
  );

  const { data: reports, isLoading } = useQuery({
    queryKey: ["kpi-report", startDate, endDate, selectedClinicIds],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/kpi-report", {
        params: {
          from: startDate,
          to: endDate,
          startDate: new Date(range[0].startDate),
          endDate: new Date(range[0].endDate),
          clinicIds: JSON.stringify(selectedClinicIds),
        },
      });
      return data;
    },
    enabled: !loading && !!user && !!clinics,
  });

  if (isLoading) return <Loading />;
  if (Object.keys(reports).length < 1) return "Loading...";

  const {
    newLeads,
    inboundCallRate,
    conversionLead,
    totalBooked,
    showingLead,
    closeLead,
    avgCall,
    avgSMS,
    monthlyData,
    last30DaysKpiRows,
  } = reports || {};

  // fetch("http://localhost:5000/opportunities", {
  //   headers: {
  //     authorization: "******",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  return (
    <div>
      <div className="sticky top-[90px] z-20 bg-white py-6 mb-6 rounded-md shadow">
        {/* <h1 className="text-xl font-semibold">
          Total Selected Clinic: {selectedClinics?.length}
        </h1> */}
        <div className="mx-auto flex justify-end pr-3">
          <CalendarRange range={range} setRange={setRange} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI
          label="New Leads"
          icon={HiPresentationChartLine}
          bg="#4F46E5"
          value={newLeads}
        />
        <KPI
          label="Inbound Call Rate"
          icon={FaPhoneVolume}
          bg="#0EA5E9"
          value={`${inboundCallRate}%`}
        />
        <KPI
          label="Conversations"
          icon={BsGraphUp}
          bg="#22C55E"
          value={conversionLead}
        />
        <KPI
          label="Avg Lead Call Response Time"
          icon={FaPhoneAlt}
          bg="#F97316"
          value={`${avgCall?.days}d ${avgCall?.hours}h ${avgCall?.minutes}m`}
        />
        <KPI
          label="Avg Lead Text Response Time"
          icon={FaSms}
          bg="#A855F7"
          value={`${avgSMS?.days}d ${avgSMS?.hours}h ${avgSMS?.minutes}m`}
        />
        <KPI
          label="Booking"
          icon={FaCalendarCheck}
          bg="#06B6D4"
          value={totalBooked}
        />
        <KPI label="Showing" icon={FaEye} bg="#EAB308" value={showingLead} />
        <KPI label="Close" icon={FaHandshake} bg="#EF4444" value={closeLead} />
      </div>

      <div className="w-[calc(100vw-50px)] md:w-full flex flex-col lg:flex-row gap-6 mt-6">
        {!!permissions?.dashboard && (
          <div className="flex-1 bg-white rounded-md shadow">
            <h4 className="font-semibold text-lg p-4 border-b text-slate-800">
              Leads Over Sales Funnel
            </h4>
            <LineChart data={monthlyData}></LineChart>
          </div>
        )}

        {!!permissions?.dashboardSubs?.goalAchievement && (
          <div
            className={`${
              permissions?.dashboard ? "w-full lg:w-[35%]" : "w-full"
            }`}
          >
            <GoalAchieve
              totalLead={newLeads}
              inboundCallRate={inboundCallRate}
              conversionLead={conversionLead}
              totalBooked={totalBooked}
              showingLead={showingLead}
              closeLead={closeLead}
            ></GoalAchieve>
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Last 30 Days KPIs Report</h2>
          <Link to="/KPIs-full-report" state={{ rows: last30DaysKpiRows }}>
            <button className="flex items-center gap-1 rounded-md bg-blue-500 text-white p-2.5 text-sm">
              <HiOutlineDocumentText /> View Full Report
            </button>
          </Link>
        </div>
        <KPIsReportTable data={last30DaysKpiRows} />
      </div>
    </div>
  );
};

export default KPIsReport;

// import KPI from "@/component/KPI/KPI";
// import React, { useMemo, useState } from "react";
// import {
//   FaPhoneAlt,
//   FaPhoneVolume,
//   FaSms,
//   FaCalendarCheck,
//   FaEye,
//   FaHandshake,
// } from "react-icons/fa";
// import { BsGraphUp } from "react-icons/bs";
// import { HiOutlineDocumentText, HiPresentationChartLine } from "react-icons/hi";
// import { useQuery } from "@tanstack/react-query";
// import calculateAvgFirstResponseTime from "@/utility/calculateAvgFirstResponseTime";
// import hoursToDayTime from "@/utility/hoursToDayTime";
// import useAuth from "@/hooks/useAuth";
// import GoalAchieve from "@/component/GoalAchieve/GoalAchieve";
// import KPIsReportTable from "../KPIsReportTable/KPIsReportTable";
// import LineChart from "@/component/LineChart/LineChart";
// import Loading from "../Loading/Loading";
// import { Link } from "react-router-dom";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import useGetSecureData from "@/hooks/useGetSecureData";
// import { format } from "date-fns";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import CalendarRange from "@/component/CalendarRange/CalendarRange";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";

// const KPIsReport = () => {
//   dayjs.extend(utc);
//   dayjs.extend(timezone);
//   const { db_user: { permissions } = {}, user, loading } = useAuth();
//   const oneMonthAgo = new Date();
//   oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

//   const [range, setRange] = useState([
//     {
//       startDate: oneMonthAgo,
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

//   // row
//   // const startDate = dayjs
//   //   .tz(dayjs(range[0].startDate).format("YYYY-MM-DD"), "America/New_York")
//   //   .startOf("day")
//   //   .toISOString();
//   // const endDate = dayjs
//   //   .tz(dayjs(range[0].endDate).format("YYYY-MM-DD"), "America/New_York")
//   //   .endOf("day")
//   //   .toISOString();
//   // console.log(startDate, endDate);

//   // *****
//   const startDate = dayjs(range[0].startDate).format("YYYY-MM-DD");
//   const endDate = dayjs(range[0].endDate).format("YYYY-MM-DD");

//   const axiosSecure = useAxiosSecure();

//   /* ---------------- clinics ---------------- */
//   const { data: clinics = [] } = useGetSecureData("clinics", "/clinics");

//   const selectedClinics = useMemo(
//     () => clinics.filter((c) => c.selected),
//     [clinics],
//   );

//   const selectedClinicIds = useMemo(
//     () => selectedClinics.map((clinic) => clinic._id),
//     [selectedClinics],
//   );
//   // console.log(selectedClinicIds);

//   /* ---------------- helper ---------------- */
//   const mergePipelineIds = (clinics, key) =>
//     clinics.flatMap((c) => c[key]?.map((p) => p.id) || []);

//   /* ---------------- pipeline sets ---------------- */
//   const conversationPipelineStageIdSet = useMemo(
//     () => new Set(mergePipelineIds(selectedClinics, "conversion_pipelines")),
//     [selectedClinics],
//   );

//   const bookingPipelineStageIdSet = useMemo(
//     () => new Set(mergePipelineIds(selectedClinics, "booking_pipelines")),
//     [selectedClinics],
//   );

//   const showingPipelineStageIdSet = useMemo(
//     () => new Set(mergePipelineIds(selectedClinics, "showing_pipelines")),
//     [selectedClinics],
//   );

//   const closePipelineStageIdSet = useMemo(
//     () => new Set(mergePipelineIds(selectedClinics, "close_pipelines")),
//     [selectedClinics],
//   );

//   // const selectedClinicPipelineIds = useMemo(
//   //   () => new Set(selectedClinics.map((c) => c.pipeline_id)),
//   //   [selectedClinics],
//   // );

//   /* ---------------- data fetch ---------------- */
//   // const { data: leads = [], isLoading: opporLoading } = useQuery({
//   //   queryKey: ["opportunities", startDate, endDate,selectedClinicIds],
//   //   queryFn: async () => {
//   //     const { data } = await axiosSecure.get(
//   //       `/opportunities?from=${startDate}&to=${endDate}&clinicIds=${selectedClinicIds}`,
//   //     );
//   //     return data;
//   //   },
//   //   enabled: !loading && !!user,
//   // });
//   const { data: leads = [], isLoading: opporLoading } = useQuery({
//     queryKey: ["opportunities", startDate, endDate, selectedClinicIds],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/opportunities", {
//         params: {
//           from: startDate,
//           to: endDate,
//           clinicIds: JSON.stringify(selectedClinicIds),
//         },
//       });
//       return data;
//     },
//     enabled: !loading && !!user && !!clinics,
//   });
//   // console.log(leads);

//   // const { data: messages = [], isLoading: convLoading } = useQuery({
//   //   queryKey: ["messages", startDate, endDate],
//   //   queryFn: async () => {
//   //     const { data } = await axiosSecure.get(
//   //       `/messages?from=${startDate}&to=${endDate}&clinicId=696dfd4719d8c1c8737994b2`,
//   //     );
//   //     return data;
//   //   },
//   //   enabled: !loading && !!user,
//   // });

//   // 81.82% 1-10 dec
//   // const { data: messages = [], isLoading: convLoading } = useQuery({
//   //   // queryKey: ["messages", startDate, endDate, selectedClinicIds],
//   //   queryKey: ["messages", startDateForMsg, endDateForMsg, selectedClinicIds],
//   //   queryFn: async () => {
//   //     const { data } = await axiosSecure.get("/messages", {
//   //       params: {
//   //         from: startDateForMsg,
//   //         to: endDateForMsg,
//   //         clinicIds: JSON.stringify(selectedClinicIds),
//   //       },
//   //     });
//   //     return data;
//   //   },
//   //   enabled: !loading && !!user && !!clinics,
//   // });

//   const { data: messages = [], isLoading: convLoading } = useQuery({
//     queryKey: ["messages", startDate, endDate, selectedClinicIds],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/messages", {
//         params: {
//           from: startDate,
//           to: endDate,
//           clinicIds: JSON.stringify(selectedClinicIds),
//         },
//       });
//       return data;
//     },
//     enabled: !loading && !!user && !!clinics,
//   });

//   const { data: reports, isLoading } = useQuery({
//     queryKey: ["kpi-report", startDate, endDate, selectedClinicIds],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/kpi-report", {
//         params: {
//           from: startDate,
//           to: endDate,

//           startDate: new Date(range[0].startDate),
//           endDate: new Date(range[0].endDate),
//           clinicIds: JSON.stringify(selectedClinicIds),
//         },
//       });
//       return data;
//     },
//     enabled: !loading && !!user && !!clinics,
//   });

//   /* ---------------- filtered leads (multi clinic) ---------------- */
//   // const selectedClinicIds = useMemo(
//   //   () =>
//   //     new Set(
//   //       clinics.filter((c) => c.selected === true).map((c) => String(c._id)),
//   //     ),
//   //   [clinics],
//   // );

//   // ***
//   // const selectedClinicIdsArray = clinics.map((clinic) => clinic._id);
//   // // console.log(selectedClinicIdsArray);

//   // const check = axiosSecure.post("/kpi-report", {
//   //   from: startDate,
//   //   to: endDate,
//   //   clinicIds: selectedClinicIds,
//   // });
//   // console.log(check);

//   // const filteredLeads = useMemo(() => {
//   //   return leads.filter((lead) => selectedClinicIds.has(String(lead.clinicId)));
//   // }, [leads, selectedClinicIds]);

//   // const filteredMessages = useMemo(() => {
//   //   return messages.filter((m) => selectedClinicIds.has(String(m.clinicId)));
//   // }, [messages, selectedClinicIds]);

//   // const unSelectedClinicIds = useMemo(
//   //   () =>
//   //     new Set(
//   //       clinics.filter((c) => c.selected === false).map((c) => String(c._id)),
//   //     ),
//   //   [clinics],
//   // );

//   // const filteredLeads = useMemo(() => {
//   //   return leads.filter(
//   //     (lead) =>
//   //       !unSelectedClinicIds.has(String(lead.clinicId)) &&
//   //       selectedClinicPipelineIds.has(lead.pipelineId),
//   //   );
//   // }, [leads, unSelectedClinicIds]);

//   // const filteredMessages = useMemo(() => {
//   //   return messages.filter((m) => !unSelectedClinicIds.has(String(m.clinicId)));
//   // }, [messages, unSelectedClinicIds]);

//   // const filteredLeads = useMemo(() => {
//   //   return leads.filter((lead) =>
//   //     selectedClinicPipelineIds.has(lead.pipelineId),
//   //   );
//   // }, [leads, selectedClinicPipelineIds]);

//   // const filteredMessages = useMemo(() => {
//   //   // return messages.filter(
//   //   // (m) =>
//   //   // (!dateFrom || new Date(m.dateAdded) >= dateFrom) &&
//   //   // (!dateTo || new Date(m.dateAdded) <= dateTo),
//   //   // );
//   //   return messages;
//   // }, [messages]);

//   /* ---------------- KPIs ---------------- */
//   // const newLeads = filteredLeads;
//   const newLeads = leads;
//   const filteredLeads = leads;

//   const filteredMessages = messages;

//   const totalInboundCalls = filteredMessages.filter(
//     (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
//   );

//   const answeredInboundCalls = totalInboundCalls.filter(
//     (c) => c.status === "completed",
//   );

//   const inboundCallRate = totalInboundCalls.length
//     ? ((answeredInboundCalls.length / totalInboundCalls.length) * 100).toFixed(
//         2,
//       )
//     : "0.00";

//   // const conversionLead = filteredLeads.filter((lead) => {
//   //   const isInConversationStage = conversationPipelineStageIdSet.has(
//   //     lead.pipelineStageId,
//   //   );

//   //   if (!isInConversationStage || !lead.lastStageChangeAt) return false;

//   //   const leadStageChangeDate = dayjs(lead.lastStageChangeAt)
//   //     .tz(lead.clinicTimezone)
//   //     .format("YYYY-MM-DD");

//   //   return leadStageChangeDate >= startDate && leadStageChangeDate <= endDate;
//   // });

//   // const conversionLead = filteredLeads.filter((lead) =>
//   //   conversationPipelineStageIdSet.has(lead.pipelineStageId),
//   // );

//   // const totalBooked = filteredLeads.filter((lead) =>
//   //   bookingPipelineStageIdSet.has(lead.pipelineStageId),
//   // );

//   // const showingLead = filteredLeads.filter((lead) =>
//   //   showingPipelineStageIdSet.has(lead.pipelineStageId),
//   // );

//   // const closeLead = filteredLeads.filter((lead) =>
//   //   closePipelineStageIdSet.has(lead.pipelineStageId),
//   // );

//   const isLeadInRangeAndStage = (lead, stageSet) => {
//     if (!stageSet.has(lead.pipelineStageId) || !lead.lastStageChangeAt)
//       return false;

//     const stageChangeDate = dayjs(lead.lastStageChangeAt)
//       .tz(lead.clinicTimezone)
//       .format("YYYY-MM-DD");
//     // console.log(stageChangeDate);

//     return stageChangeDate >= startDate && stageChangeDate <= endDate;
//   };

//   const conversionLead = filteredLeads.filter((lead) =>
//     isLeadInRangeAndStage(lead, conversationPipelineStageIdSet),
//   );

//   const totalBooked = filteredLeads.filter((lead) =>
//     isLeadInRangeAndStage(lead, bookingPipelineStageIdSet),
//   );

//   const showingLead = filteredLeads.filter((lead) =>
//     isLeadInRangeAndStage(lead, showingPipelineStageIdSet),
//   );

//   const closeLead = filteredLeads.filter((lead) =>
//     isLeadInRangeAndStage(lead, closePipelineStageIdSet),
//   );

//   const avgCall = useMemo(() => {
//     return hoursToDayTime(
//       calculateAvgFirstResponseTime(
//         filteredLeads,
//         filteredMessages,
//         "TYPE_CALL",
//       ),
//     );
//   }, [filteredLeads, filteredMessages]);

//   const avgSMS = useMemo(() => {
//     return hoursToDayTime(
//       calculateAvgFirstResponseTime(
//         filteredLeads,
//         filteredMessages,
//         "TYPE_SMS",
//       ),
//     );
//   }, [filteredLeads, filteredMessages]);

//   const baseDate = useMemo(() => new Date(range[0].endDate), [range]);

//   /* ---------------- chart ---------------- */
//   const getLast12Months = (baseDate) => {
//     const months = [];

//     for (let i = 11; i >= 0; i--) {
//       const d = dayjs(baseDate).subtract(i, "month");

//       months.push({
//         key: d.format("YYYY-M"),
//         month: d.format("MMM YYYY"),
//       });
//     }

//     return months;
//   };

//   const getMonthKey = (date, tz = "UTC") => dayjs(date).tz(tz).format("YYYY-M");

//   const calculateMonthlyData = (leads, baseDate) => {
//     const monthlyMap = {};

//     // init last 12 months
//     getLast12Months(baseDate).forEach(({ key, month }) => {
//       monthlyMap[key] = {
//         month,
//         totalLead: 0,
//         conversion: 0,
//         booking: 0,
//         showing: 0,
//         close: 0,
//       };
//     });

//     leads.forEach((lead) => {
//       const tz = lead.clinicTimezone || "UTC";

//       // total leads → createdAt month
//       const createdKey = getMonthKey(lead.createdAt, tz);
//       if (monthlyMap[createdKey]) {
//         monthlyMap[createdKey].totalLead++;
//       }

//       // stage metrics → lastStageChangeAt month
//       if (!lead.lastStageChangeAt) return;

//       const stageKey = getMonthKey(lead.lastStageChangeAt, tz);
//       if (!monthlyMap[stageKey]) return;

//       if (conversationPipelineStageIdSet.has(lead.pipelineStageId))
//         monthlyMap[stageKey].conversion++;

//       if (bookingPipelineStageIdSet.has(lead.pipelineStageId))
//         monthlyMap[stageKey].booking++;

//       if (showingPipelineStageIdSet.has(lead.pipelineStageId))
//         monthlyMap[stageKey].showing++;

//       if (closePipelineStageIdSet.has(lead.pipelineStageId))
//         monthlyMap[stageKey].close++;
//     });

//     return Object.values(monthlyMap);
//   };

//   const monthlyData = useMemo(
//     () => calculateMonthlyData(filteredLeads, baseDate),
//     [filteredLeads, baseDate],
//   );

//   /* ---------------- last 30 days table ---------------- */
//   // const last30DaysKpiRows = useMemo(() => {
//   //   const rows = [];
//   //   const baseDate = new Date();

//   //   for (let i = 0; i < 30; i++) {
//   //     const day = new Date(baseDate);
//   //     day.setDate(day.getDate() - i);

//   //     const start = new Date(day.setHours(0, 0, 0, 0));
//   //     const end = new Date(day.setHours(23, 59, 59, 999));

//   //     const dailyLeads = filteredLeads.filter(
//   //       (l) => new Date(l.createdAt) >= start && new Date(l.createdAt) <= end,
//   //     );

//   //     const dailyMessages = filteredMessages.filter(
//   //       (m) => new Date(m.dateAdded) >= start && new Date(m.dateAdded) <= end,
//   //     );

//   //     const inboundCalls = dailyMessages.filter(
//   //       (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
//   //     );

//   //     const answeredCalls = inboundCalls.filter(
//   //       (c) => c.status === "completed",
//   //     );

//   //     rows.push({
//   //       date: day.toLocaleDateString(),
//   //       totalLead: dailyLeads.length,
//   //       inboundCallRate: inboundCalls.length
//   //         ? ((answeredCalls.length / inboundCalls.length) * 100).toFixed(2)
//   //         : "0.00",
//   //       conversion: dailyLeads.filter((l) =>
//   //         conversationPipelineStageIdSet.has(l.pipelineStageId),
//   //       ).length,
//   //       booking: dailyLeads.filter((l) =>
//   //         bookingPipelineStageIdSet.has(l.pipelineStageId),
//   //       ).length,
//   //       showing: dailyLeads.filter((l) =>
//   //         showingPipelineStageIdSet.has(l.pipelineStageId),
//   //       ).length,
//   //       close: dailyLeads.filter((l) =>
//   //         closePipelineStageIdSet.has(l.pipelineStageId),
//   //       ).length,
//   //       avgCall: hoursToDayTime(
//   //         calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_CALL"),
//   //       ),
//   //       avgSms: hoursToDayTime(
//   //         calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_SMS"),
//   //       ),
//   //     });
//   //   }

//   //   return rows;
//   // }, [filteredLeads, filteredMessages]);

//   const rangeDays = useMemo(() => {
//     const start = new Date(range[0].startDate);
//     const end = new Date(range[0].endDate);

//     const diff = Math.abs(end - start);
//     return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
//   }, [range]);

//   const daysToShow = rangeDays > 30 ? 30 : rangeDays;

//   const groupByLocalDay = (items, dateField) => {
//     const map = new Map();

//     for (const item of items) {
//       const tz = item.clinicTimezone || "UTC";
//       // const tz = "America/Denver";

//       const key = dayjs(item[dateField]).tz(tz).format("YYYY-MM-DD");

//       if (!map.has(key)) map.set(key, []);
//       map.get(key).push(item);
//     }

//     return map;
//   };

//   const leadMap = useMemo(
//     () => groupByLocalDay(filteredLeads, "createdAt"),
//     [filteredLeads],
//   );

//   const messageMap = useMemo(
//     () => groupByLocalDay(filteredMessages, "dateAdded"),
//     [filteredMessages],
//   );

//   const last30DaysKpiRows = useMemo(() => {
//     const rows = [];

//     for (let i = 0; i < daysToShow; i++) {
//       const dayKey = dayjs(baseDate).subtract(i, "day").format("YYYY-MM-DD");

//       const dailyLeads = leadMap.get(dayKey) || [];
//       const dailyMessages = messageMap.get(dayKey) || [];
//       const isLeadInStageOnDay = (lead, stageSet, dayKey) => {
//         if (!stageSet.has(lead.pipelineStageId) || !lead.lastStageChangeAt)
//           return false;

//         const stageChangeDay = dayjs(lead.lastStageChangeAt)
//           .tz(lead.clinicTimezone)
//           .format("YYYY-MM-DD");

//         return stageChangeDay === dayKey;
//       };

//       const inboundCalls = dailyMessages.filter(
//         (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
//       );

//       const answeredCalls = inboundCalls.filter(
//         (c) => c.status === "completed",
//       );

//       rows.push({
//         date: dayKey,
//         totalLead: dailyLeads.length,

//         inboundCallRate: inboundCalls.length
//           ? ((answeredCalls.length / inboundCalls.length) * 100).toFixed(2)
//           : "0.00",

//         conversion: dailyLeads.filter((l) =>
//           // conversationPipelineStageIdSet.has(l.pipelineStageId),
//           isLeadInStageOnDay(l, conversationPipelineStageIdSet, dayKey),
//         ).length,

//         booking: dailyLeads.filter((l) =>
//           // bookingPipelineStageIdSet.has(l.pipelineStageId),
//           isLeadInStageOnDay(l, bookingPipelineStageIdSet, dayKey),
//         ).length,

//         showing: dailyLeads.filter((l) =>
//           // showingPipelineStageIdSet.has(l.pipelineStageId),
//           isLeadInStageOnDay(l, showingPipelineStageIdSet, dayKey),
//         ).length,

//         close: dailyLeads.filter((l) =>
//           // closePipelineStageIdSet.has(l.pipelineStageId),
//           isLeadInStageOnDay(l, closePipelineStageIdSet, dayKey),
//         ).length,

//         avgCall: hoursToDayTime(
//           calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_CALL"),
//         ),
//         avgSms: hoursToDayTime(
//           calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_SMS"),
//         ),
//       });
//     }

//     return rows;
//   }, [leadMap, messageMap, baseDate, daysToShow]);

//   // a clinic
//   // const last30DaysKpiRows = useMemo(() => {
//   //   const rows = [];

//   //   for (let i = 0; i < daysToShow; i++) {
//   //     const day = dayjs(baseDate).subtract(i, "day");

//   //     const dayKey = day.format("YYYY-MM-DD");

//   //     const dailyLeads = filteredLeads.filter(
//   //       (l) =>
//   //         dayjs(l.createdAt).tz(l.clinicTimezone).format("YYYY-MM-DD") ===
//   //         dayKey,
//   //     );

//   //     const dailyMessages = filteredMessages.filter(
//   //       (m) =>
//   //         dayjs(m.dateAdded).tz(m.clinicTimezone).format("YYYY-MM-DD") ===
//   //         dayKey,
//   //     );

//   //     const inboundCalls = dailyMessages.filter(
//   //       (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
//   //     );

//   //     const answeredCalls = inboundCalls.filter(
//   //       (c) => c.status === "completed",
//   //     );

//   //     rows.push({
//   //       date: day.format("MM/DD/YYYY"),
//   //       totalLead: dailyLeads.length,
//   //       inboundCallRate: inboundCalls.length
//   //         ? ((answeredCalls.length / inboundCalls.length) * 100).toFixed(2)
//   //         : "0.00",
//   //       conversion: dailyLeads.filter((l) =>
//   //         conversationPipelineStageIdSet.has(l.pipelineStageId),
//   //       ).length,
//   //       booking: dailyLeads.filter((l) =>
//   //         bookingPipelineStageIdSet.has(l.pipelineStageId),
//   //       ).length,
//   //       showing: dailyLeads.filter((l) =>
//   //         showingPipelineStageIdSet.has(l.pipelineStageId),
//   //       ).length,
//   //       close: dailyLeads.filter((l) =>
//   //         closePipelineStageIdSet.has(l.pipelineStageId),
//   //       ).length,
//   //       avgCall: hoursToDayTime(
//   //         calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_CALL"),
//   //       ),
//   //       avgSms: hoursToDayTime(
//   //         calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_SMS"),
//   //       ),
//   //     });
//   //   }

//   //   return rows;
//   // }, [filteredLeads, filteredMessages, baseDate, daysToShow]);

//   if (opporLoading || convLoading || isLoading) return <Loading />;
//   // if (!selectedClinics.length) {
//   //   return <Loading />;
//   // }
//   console.log(reports);
//   /* ---------------- UI ---------------- */
//   return (
//     <div>
//       {/* <div className="flex justify-end mb-4 bg-black w-full py-10 fixed top-0 left-0 mt-20 mx-auto px-10">
//         <div className="relativ ">
//           <CalendarRange range={range} setRange={setRange}></CalendarRange>
//         </div>
//       </div> */}

//       <div className="sticky top-[90px] z-20 bg-white py-6 mb-6 rounded-md shadow">
//         {/* <h1 className="text-xl font-semibold">
//           Total Selected Clinic: {selectedClinics?.length}
//         </h1> */}
//         <div className="mx-auto flex justify-end pr-3">
//           <CalendarRange range={range} setRange={setRange} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <KPI
//           label="New Leads"
//           icon={HiPresentationChartLine}
//           bg="#4F46E5"
//           value={newLeads.length}
//         />
//         <KPI
//           label="Inbound Call Rate"
//           icon={FaPhoneVolume}
//           bg="#0EA5E9"
//           value={`${inboundCallRate}%`}
//         />
//         <KPI
//           label="Conversations"
//           icon={BsGraphUp}
//           bg="#22C55E"
//           value={conversionLead.length}
//         />
//         <KPI
//           label="Avg Lead Call Response Time"
//           icon={FaPhoneAlt}
//           bg="#F97316"
//           value={`${avgCall.days}d ${avgCall.hours}h ${avgCall.minutes}m`}
//         />
//         <KPI
//           label="Avg Lead Text Response Time"
//           icon={FaSms}
//           bg="#A855F7"
//           value={`${avgSMS.days}d ${avgSMS.hours}h ${avgSMS.minutes}m`}
//         />
//         <KPI
//           label="Booking"
//           icon={FaCalendarCheck}
//           bg="#06B6D4"
//           value={totalBooked.length}
//         />
//         <KPI
//           label="Showing"
//           icon={FaEye}
//           bg="#EAB308"
//           value={showingLead.length}
//         />
//         <KPI
//           label="Close"
//           icon={FaHandshake}
//           bg="#EF4444"
//           value={closeLead.length}
//         />
//       </div>

//       <div className="w-[calc(100vw-50px)] md:w-full flex flex-col lg:flex-row gap-6 mt-6">
//         {!!permissions?.dashboard && (
//           <div className="flex-1 bg-white rounded-md shadow">
//             <h4 className="font-semibold text-lg p-4 border-b text-slate-800">
//               Leads Over Sales Funnel
//             </h4>
//             <LineChart data={monthlyData}></LineChart>
//           </div>
//         )}

//         {!!permissions?.dashboardSubs?.goalAchievement && (
//           <div
//             className={`${
//               permissions?.dashboard ? "w-full lg:w-[35%]" : "w-full"
//             }`}
//           >
//             <GoalAchieve
//               totalLead={newLeads.length}
//               inboundCallRate={inboundCallRate}
//               conversionLead={conversionLead.length}
//               totalBooked={totalBooked.length}
//               showingLead={showingLead.length}
//               closeLead={closeLead.length}
//             ></GoalAchieve>
//           </div>
//         )}
//       </div>

//       <div className="mt-6">
//         <div className="flex justify-between mb-4">
//           <h2 className="text-lg font-semibold">Last 30 Days KPIs Report</h2>
//           <Link to="/KPIs-full-report" state={{ rows: last30DaysKpiRows }}>
//             <button className="flex items-center gap-1 rounded-md bg-blue-500 text-white p-2.5 text-sm">
//               <HiOutlineDocumentText /> View Full Report
//             </button>
//           </Link>
//         </div>
//         <KPIsReportTable data={last30DaysKpiRows} />
//       </div>
//     </div>
//   );
// };

// export default KPIsReport;
