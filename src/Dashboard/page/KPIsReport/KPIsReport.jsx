// import KPI from "@/component/KPI/KPI";
// import React, { useMemo } from "react";
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
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import calculateAvgFirstResponseTime from "@/utility/calculateAvgFirstResponseTime";
// import hoursToDayTime from "@/utility/hoursToDayTime";
// import useAuth from "@/hooks/useAuth";
// import GoalAchieve from "@/component/GoalAchieve/GoalAchieve";
// import KPIsReportTable from "../KPIsReportTable/KPIsReportTable";
// import LineChart from "@/component/LineChart/LineChart";
// import Loading from "../Loading/Loading";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import useGetSecureData from "@/hooks/useGetSecureData";

// const KPIsReport = () => {
//   const { db_user: { permissions } = {} } = useAuth();
//   const { data: clinics } = useGetSecureData("clinics", "/clinics");
//   const axiosSecure = useAxiosSecure();
//   const locationId = import.meta.env.VITE_LOCATION_ID;
//   const authToken = import.meta.env.VITE_AUTHORIZATION;

//   const selectedClinic = useMemo(() => {
//     return clinics?.find((c) => c.selected);
//   }, [clinics]);

//   console.log(selectedClinic);

//   const conversionPipelines = selectedClinic?.conversion_pipelines || [];
//   const bookingPipelines = selectedClinic?.booking_pipelines || [];
//   const showingPipelines = selectedClinic?.showing_pipelines || [];
//   const closePipelines = selectedClinic?.close_pipelines || [];

//   const conversationPipelineStageIdSet = useMemo(
//     () => new Set(conversionPipelines.map((p) => p.id)),
//     [conversionPipelines],
//   );

//   const bookingPipelineStageIdSet = useMemo(
//     () => new Set(bookingPipelines.map((p) => p.id)),
//     [bookingPipelines],
//   );

//   const showingPipelineStageIdSet = useMemo(
//     () => new Set(showingPipelines.map((p) => p.id)),
//     [showingPipelines],
//   );

//   const closePipelineStageIdSet = useMemo(
//     () => new Set(closePipelines.map((p) => p.id)),
//     [closePipelines],
//   );

//   // const conversionRatePipelines = [
//   //   { name: "Unqualified", id: "2aeae35-d676-4a34-924b-af9a76aacce6" },
//   //   { name: "In Communication", id: "a183931d-84f3-41aa-90b3-e346924d4454" },
//   //   { name: "Not Interested", id: "8077796c-9b09-459c-b4b1-90a5491b70c8" },
//   //   { name: "VTC Appointment", id: "78906967-c7f9-4d27-903a-c55fa5007480" },
//   //   {
//   //     name: "Scheduled Appointment",
//   //     id: "bbeb7c55-c4f6-475e-9a4d-dd4ecdfc0868",
//   //   },
//   //   { name: "No Show/Cancel", id: "76f77f91-63a7-457f-841f-34d6debaa7ca" },
//   //   { name: "APPT Rescheduled", id: "95e6a5e9-dbe7-4f48-8ab5-b3b0ab853fd9" },
//   //   {
//   //     name: "Presented Treatment -> Follow Up/ Sent Brownies",
//   //     id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
//   //   },
//   //   {
//   //     name: "Tx Plan Not Accepted",
//   //     id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
//   //   },
//   //   { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
//   //   { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
//   // ];

//   // const bookingRatePipelines = [
//   //   {
//   //     name: "Scheduled Appointment",
//   //     id: "bbeb7c55-c4f6-475e-9a4d-dd4ecdfc0868",
//   //   },
//   //   { name: "No Show/Cancel", id: "76f77f91-63a7-457f-841f-34d6debaa7ca" },
//   //   { name: "APPT Rescheduled", id: "95e6a5e9-dbe7-4f48-8ab5-b3b0ab853fd9" },
//   //   {
//   //     name: "Presented Treatment -> Follow Up/ Sent Brownies",
//   //     id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
//   //   },
//   //   {
//   //     name: "Tx Plan Not Accepted",
//   //     id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
//   //   },
//   //   { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
//   //   { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
//   // ];

//   // const showingRatePipelines = [
//   //   {
//   //     name: "Presented Treatment -> Follow Up/ Sent Brownies",
//   //     id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
//   //   },
//   //   {
//   //     name: "Tx Plan Not Accepted",
//   //     id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
//   //   },
//   //   { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
//   //   { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
//   // ];

//   // const closeRatePipelines = [
//   //   { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
//   // ];

//   // const conversationPipelineStageIdSet = new Set(
//   //   conversionRatePipelines.map((p) => p.id),
//   // );

//   // const bookingPipelineStageIdSet = new Set(
//   //   bookingRatePipelines.map((p) => p.id),
//   // );

//   // const showingPipelineStageIdSet = new Set(
//   //   showingRatePipelines.map((p) => p.id),
//   // );

//   // const closePipelineStageIdSet = new Set(closeRatePipelines.map((p) => p.id));

//   const fetchAllOpportunities = async () => {
//     let allData = [];
//     let page = 1;
//     let hasMore = true;

//     while (hasMore) {
//       const response = await axios.get(
//         "https://services.leadconnectorhq.com/opportunities/search",
//         {
//           params: {
//             // location_id: "***",
//             location_id: locationId,
//             limit: 100,
//             page,
//           },
//           headers: {
//             Accept: "application/json",
//             Version: "2021-07-28",
//             // Authorization: "Bearer ***",
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       );

//       const opportunities = response.data.opportunities || [];
//       allData.push(...opportunities);

//       if (opportunities.length < 100) {
//         hasMore = false;
//       } else {
//         page++;
//       }
//     }

//     return allData;
//   };

//   const fetchAllMessages = async () => {
//     let cursor = null;
//     let allData = [];

//     do {
//       const params = { locationId: locationId, limit: 100 };
//       if (cursor) params.cursor = cursor;

//       const res = await axios.get(
//         "https://services.leadconnectorhq.com/conversations/messages/export",
//         {
//           params,
//           headers: {
//             Accept: "application/json",
//             Version: "2021-07-28",
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       );

//       allData.push(...(res.data.messages || []));
//       cursor = res.data.nextCursor || null;
//     } while (cursor);

//     return allData;
//   };

//   const {
//     data: leads = [],
//     isLoading: opporLoading,
//     //   isError,
//     //   error,
//   } = useQuery({
//     queryKey: ["opportunities", authToken],
//     // queryFn: fetchAllOpportunities,
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/opportunities");
//       return data;
//     },
//     // staleTime: 5 * 60 * 1000, // 5 minutes cache
//   });
//   // console.log(leads);

//   const {
//     data: messages = [],
//     isLoading: convLoading,
//     //   isError,
//     //   error,
//   } = useQuery({
//     queryKey: ["messages", authToken],
//     // queryFn: fetchAllMessages,
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/messages");
//       return data;
//     },
//     // staleTime: 5 * 60 * 1000, // 5 minutes cache
//   });

//   // const results = useQueries({
//   //   queries: [
//   //     {
//   //       queryKey: ["opportunities", "location_id"],
//   //       queryFn: fetchAllOpportunities,
//   //       staleTime: 5 * 60 * 1000,
//   //     },
//   //     {
//   //       queryKey: ["messages", "location_id"],
//   //       queryFn: fetchAllMessages,
//   //       staleTime: 5 * 60 * 1000,
//   //     },
//   //   ],
//   // });

//   // const leads = results[0].data ?? [];
//   // const messages = results[1].data ?? [];

//   // const isLoading = results.some(r => r.isLoading);
//   // const isError = results.some(r => r.isError);

//   // all leads
//   // let config = {
//   //   method: "get",
//   //   maxBodyLength: Infinity,
//   //   url: "https://services.leadconnectorhq.com/opportunities/search?location_id=***",
//   //   headers: {
//   //     Accept: "application/json",
//   //     Version: "2021-07-28",
//   //     Authorization: "Bearer ***",
//   //   },
//   // };

//   // axios
//   //   .request(config)
//   //   .then((response) => {
//   //     setLeads(response.data.meta.total);
//   //     //   console.log(response.data);
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });

//   /* all messages */
//   // useEffect(() => {
//   //   let messages_config = {
//   //     method: "get",
//   //     maxBodyLength: Infinity,
//   //     url: "https://services.leadconnectorhq.com/conversations/messages/export?locationId=***",
//   //     headers: {
//   //       Accept: "application/json",
//   //       Version: "2021-04-15",
//   //       Authorization: "Bearer ***",
//   //     },
//   //   };

//   //   axios
//   //     .request(messages_config)
//   //     .then((response) => {
//   //       //   console.log(response.data.messages);
//   //       setMessages(response.data.messages);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // }, []);

//   // ---------------- chart -----------

//   const getLast12Months = () => {
//     const months = [];

//     for (let i = 11; i >= 0; i--) {
//       const d = new Date();
//       d.setMonth(d.getMonth() - i);

//       months.push({
//         key: `${d.getFullYear()}-${d.getMonth()}`, // unique
//         month: d.toLocaleString("en-US", { month: "short" }),
//         year: d.getFullYear(),
//         monthIndex: d.getMonth(),
//       });
//     }

//     return months;
//   };

//   const calculateMonthlyData = (leads) => {
//     const last12Months = getLast12Months();
//     const monthlyMap = {};

//     // initialize last 12 months
//     last12Months.forEach(({ key, month, year }) => {
//       monthlyMap[key] = {
//         month: `${month} ${year}`,
//         totalLead: 0,
//         conversion: 0,
//         booking: 0,
//         showing: 0,
//         close: 0,
//       };
//     });

//     leads.forEach((lead) => {
//       const date = new Date(lead.createdAt);
//       const key = `${date.getFullYear()}-${date.getMonth()}`;

//       if (!monthlyMap[key]) return; // ignore older data

//       monthlyMap[key].totalLead += 1;

//       if (conversationPipelineStageIdSet.has(lead.pipelineStageId)) {
//         monthlyMap[key].conversion += 1;
//       }

//       if (bookingPipelineStageIdSet.has(lead.pipelineStageId)) {
//         monthlyMap[key].booking += 1;
//       }

//       if (showingPipelineStageIdSet.has(lead.pipelineStageId)) {
//         monthlyMap[key].showing += 1;
//       }

//       if (closePipelineStageIdSet.has(lead.pipelineStageId)) {
//         monthlyMap[key].close += 1;
//       }
//     });

//     return Object.values(monthlyMap);
//   };

//   const monthlyData = useMemo(() => {
//     return calculateMonthlyData(leads);
//   }, [leads]);

//   if (opporLoading || convLoading) {
//     return <Loading></Loading>;
//   }

//   // const newLeads = leads.filter(
//   //   (lead) => lead.pipelineId === "nomfM2sEp0psPHRdrSRU",
//   // );

//   const newLeads = leads.filter(
//     (lead) => lead.pipelineId === selectedClinic?.pipeline_id,
//   );

//   const totalInboundCalls = messages.filter(
//     (message) =>
//       message.direction === "inbound" && message.messageType === "TYPE_CALL",
//   );

//   const answeredInboundCalls = totalInboundCalls.filter(
//     (call) => call.status === "completed",
//   );

//   const inboundCallRate = (
//     (answeredInboundCalls.length / totalInboundCalls.length) *
//     100
//   ).toFixed(2);

//   const conversionLead = leads.filter((lead) =>
//     conversationPipelineStageIdSet.has(lead.pipelineStageId),
//   );

//   const totalBooked = leads.filter((lead) =>
//     bookingPipelineStageIdSet.has(lead.pipelineStageId),
//   );

//   const showingLead = leads.filter((lead) =>
//     showingPipelineStageIdSet.has(lead.pipelineStageId),
//   );

//   const closeLead = leads.filter((lead) =>
//     closePipelineStageIdSet.has(lead.pipelineStageId),
//   );

//   // 1
//   // function calculateAvgSmsResponseTimeInHours(leads, messages) {
//   //   let totalResponseHours = 0;
//   //   let validLeadCount = 0;

//   //   for (const lead of leads) {
//   //     const leadCreatedAt = new Date(lead.createdAt);
//   //     const contactId = lead.contactId;

//   //     // only TYPE_SMS after lead creation
//   //     const validMessages = messages.filter(
//   //       (msg) =>
//   //         msg.contactId === contactId &&
//   //         msg.messageType === "TYPE_CALL" &&
//   //         msg.dateAdded &&
//   //         new Date(msg.dateAdded) >= leadCreatedAt
//   //     );

//   //     if (!validMessages.length) continue;

//   //     // earliest SMS after lead creation
//   //     const firstSms = validMessages.reduce((earliest, current) =>
//   //       new Date(current.dateAdded) < new Date(earliest.dateAdded)
//   //         ? current
//   //         : earliest
//   //     );

//   //     const responseTimeHours =
//   //       (new Date(firstSms.dateAdded) - leadCreatedAt) / (1000 * 60 * 60);

//   //     totalResponseHours += responseTimeHours;
//   //     validLeadCount++;
//   //   }

//   //   if (validLeadCount === 0) return 0;

//   //   return totalResponseHours / validLeadCount;
//   // }
//   // const avgHours = calculateAvgSmsResponseTimeInHours(leads, messages);
//   // console.log("Average SMS Response Time (hours):", avgHours.toFixed(2));
//   // 43.71

//   const avgCall = hoursToDayTime(
//     calculateAvgFirstResponseTime(leads, messages, "TYPE_CALL"),
//   );

//   const avgSMS = hoursToDayTime(
//     calculateAvgFirstResponseTime(leads, messages, "TYPE_SMS"),
//   );

//   // ------- last 30 Days Kpi Report for table --------------
//   const getDayRange = (date) => {
//     const start = new Date(date);
//     start.setHours(0, 0, 0, 0);

//     const end = new Date(date);
//     end.setHours(23, 59, 59, 999);

//     return { start, end };
//   };

//   const last30DaysKpiRows = [];

//   for (let i = 0; i < 30; i++) {
//     const day = new Date();
//     day.setDate(day.getDate() - i);

//     const { start, end } = getDayRange(day);

//     // leads for this day
//     const dailyLeads = leads.filter(
//       (l) => new Date(l.createdAt) >= start && new Date(l.createdAt) <= end,
//     );

//     // messages for this day
//     const dailyMessages = messages.filter(
//       (m) => new Date(m.dateAdded) >= start && new Date(m.dateAdded) <= end,
//     );

//     // KPIs
//     const totalLead = dailyLeads.length;

//     const inboundCalls = dailyMessages.filter(
//       (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
//     );

//     const answeredCalls = inboundCalls.filter((c) => c.status === "completed");

//     const inboundCallRate = inboundCalls.length
//       ? ((answeredCalls.length / inboundCalls.length) * 100).toFixed(2)
//       : "0.00";

//     const conversion = dailyLeads.filter((lead) =>
//       conversationPipelineStageIdSet.has(lead.pipelineStageId),
//     ).length;

//     const booking = dailyLeads.filter((lead) =>
//       bookingPipelineStageIdSet.has(lead.pipelineStageId),
//     ).length;

//     const showing = dailyLeads.filter((lead) =>
//       showingPipelineStageIdSet.has(lead.pipelineStageId),
//     ).length;

//     const close = dailyLeads.filter((lead) =>
//       closePipelineStageIdSet.has(lead.pipelineStageId),
//     ).length;

//     const avgCall = hoursToDayTime(
//       calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_CALL"),
//     );

//     const avgSms = hoursToDayTime(
//       calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_SMS"),
//     );

//     last30DaysKpiRows.push({
//       date: day.toLocaleDateString(),
//       totalLead,
//       inboundCallRate,
//       conversion,
//       avgCall,
//       avgSms,
//       booking,
//       showing,
//       close,
//     });
//   }
//   // console.log(last30DaysKpiRows);

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <KPI
//           label="New Leads"
//           icon={HiPresentationChartLine}
//           bg="#4F46E5"
//           value={newLeads.length || "00"}
//         />

//         <KPI
//           label="Inbound Call Rate"
//           icon={FaPhoneVolume}
//           bg="#0EA5E9"
//           value={`${inboundCallRate || "00"}%`}
//         />

//         <KPI
//           label="Conversations"
//           icon={BsGraphUp}
//           bg="#22C55E"
//           value={`${conversionLead.length || "00"}`}
//         />

//         <KPI
//           label="Avg Lead Call Response Time"
//           icon={FaPhoneAlt}
//           bg="#F97316"
//           // value={avgCallHours || "00"}
//           value={`${avgCall.days}d ${avgCall.hours}h ${avgCall.minutes}m`}
//         />

//         <KPI
//           label="Avg Lead Text Response Time"
//           icon={FaSms}
//           bg="#A855F7"
//           // value={avgSmsHours || "00"}
//           value={`${avgSMS.days}d ${avgSMS.hours}h ${avgSMS.minutes}m`}
//         />

//         <KPI
//           label="Booking"
//           icon={FaCalendarCheck}
//           bg="#06B6D4"
//           value={`${totalBooked.length || "00"}`}
//         />

//         <KPI
//           label="Showing"
//           icon={FaEye}
//           bg="#EAB308"
//           value={`${showingLead.length || "00"}`}
//         />

//         <KPI
//           label="Close"
//           icon={FaHandshake}
//           bg="#EF4444"
//           value={`${closeLead.length || "00"}`}
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
//           <h2 className="text-lg font-semibold text-slate-800 mb-3">
//             last 30 Days KPIs Report{" "}
//           </h2>

//           <Link to="/KPIs-full-report" state={{ rows: last30DaysKpiRows }}>
//             <button className="flex items-center gap-1 rounded-md bg-blue-500 text-white p-2.5 text-sm hover:bg-blue-600 scale-100 active:scale-95 transition-all duration-300">
//               <HiOutlineDocumentText />
//               View Full Report
//             </button>
//           </Link>
//         </div>
//         <KPIsReportTable data={last30DaysKpiRows}></KPIsReportTable>
//       </div>
//     </div>
//   );
// };

// export default KPIsReport;

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
import calculateAvgFirstResponseTime from "@/utility/calculateAvgFirstResponseTime";
import hoursToDayTime from "@/utility/hoursToDayTime";
import useAuth from "@/hooks/useAuth";
import GoalAchieve from "@/component/GoalAchieve/GoalAchieve";
import KPIsReportTable from "../KPIsReportTable/KPIsReportTable";
import LineChart from "@/component/LineChart/LineChart";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalendarRange from "@/component/CalendarRange/CalendarRange";
import axios from "axios";
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

  // row
  // const startDate = dayjs
  //   .tz(dayjs(range[0].startDate).format("YYYY-MM-DD"), "America/New_York")
  //   .startOf("day")
  //   .toISOString();
  // const endDate = dayjs
  //   .tz(dayjs(range[0].endDate).format("YYYY-MM-DD"), "America/New_York")
  //   .endOf("day")
  //   .toISOString();
  // console.log(startDate, endDate);

  // *****
  const startDate = dayjs(range[0].startDate).format("YYYY-MM-DD");
  const endDate = dayjs(range[0].endDate).format("YYYY-MM-DD");

  const axiosSecure = useAxiosSecure();

  /* ---------------- clinics ---------------- */
  const { data: clinics = [] } = useGetSecureData("clinics", "/clinics");

  const selectedClinics = useMemo(
    () => clinics.filter((c) => c.selected),
    [clinics],
  );

  const selectedClinicIds = useMemo(
    () => selectedClinics.map((clinic) => clinic._id),
    [selectedClinics],
  );
  // console.log(selectedClinicIds);

  /* ---------------- helper ---------------- */
  const mergePipelineIds = (clinics, key) =>
    clinics.flatMap((c) => c[key]?.map((p) => p.id) || []);

  /* ---------------- pipeline sets ---------------- */
  const conversationPipelineStageIdSet = useMemo(
    () => new Set(mergePipelineIds(selectedClinics, "conversion_pipelines")),
    [selectedClinics],
  );

  const bookingPipelineStageIdSet = useMemo(
    () => new Set(mergePipelineIds(selectedClinics, "booking_pipelines")),
    [selectedClinics],
  );

  const showingPipelineStageIdSet = useMemo(
    () => new Set(mergePipelineIds(selectedClinics, "showing_pipelines")),
    [selectedClinics],
  );

  const closePipelineStageIdSet = useMemo(
    () => new Set(mergePipelineIds(selectedClinics, "close_pipelines")),
    [selectedClinics],
  );

  // const selectedClinicPipelineIds = useMemo(
  //   () => new Set(selectedClinics.map((c) => c.pipeline_id)),
  //   [selectedClinics],
  // );

  /* ---------------- data fetch ---------------- */
  // const { data: leads = [], isLoading: opporLoading } = useQuery({
  //   queryKey: ["opportunities", startDate, endDate,selectedClinicIds],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get(
  //       `/opportunities?from=${startDate}&to=${endDate}&clinicIds=${selectedClinicIds}`,
  //     );
  //     return data;
  //   },
  //   enabled: !loading && !!user,
  // });
  const { data: leads = [], isLoading: opporLoading } = useQuery({
    queryKey: ["opportunities", startDate, endDate, selectedClinicIds],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/opportunities", {
        params: {
          from: startDate,
          to: endDate,
          clinicIds: JSON.stringify(selectedClinicIds),
        },
      });
      return data;
    },
    enabled: !loading && !!user && !!clinics,
  });
  // console.log(leads);

  // const { data: messages = [], isLoading: convLoading } = useQuery({
  //   queryKey: ["messages", startDate, endDate],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get(
  //       `/messages?from=${startDate}&to=${endDate}&clinicId=696dfd4719d8c1c8737994b2`,
  //     );
  //     return data;
  //   },
  //   enabled: !loading && !!user,
  // });

  // 81.82% 1-10 dec
  // const { data: messages = [], isLoading: convLoading } = useQuery({
  //   // queryKey: ["messages", startDate, endDate, selectedClinicIds],
  //   queryKey: ["messages", startDateForMsg, endDateForMsg, selectedClinicIds],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get("/messages", {
  //       params: {
  //         from: startDateForMsg,
  //         to: endDateForMsg,
  //         clinicIds: JSON.stringify(selectedClinicIds),
  //       },
  //     });
  //     return data;
  //   },
  //   enabled: !loading && !!user && !!clinics,
  // });

  const { data: messages = [], isLoading: convLoading } = useQuery({
    queryKey: ["messages", startDate, endDate, selectedClinicIds],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/messages", {
        params: {
          from: startDate,
          to: endDate,
          clinicIds: JSON.stringify(selectedClinicIds),
        },
      });
      return data;
    },
    enabled: !loading && !!user && !!clinics,
  });

  /* ---------------- filtered leads (multi clinic) ---------------- */
  // const selectedClinicIds = useMemo(
  //   () =>
  //     new Set(
  //       clinics.filter((c) => c.selected === true).map((c) => String(c._id)),
  //     ),
  //   [clinics],
  // );

  // ***
  // const selectedClinicIdsArray = clinics.map((clinic) => clinic._id);
  // // console.log(selectedClinicIdsArray);

  // const check = axiosSecure.post("/kpi-report", {
  //   from: startDate,
  //   to: endDate,
  //   clinicIds: selectedClinicIds,
  // });
  // console.log(check);

  // const filteredLeads = useMemo(() => {
  //   return leads.filter((lead) => selectedClinicIds.has(String(lead.clinicId)));
  // }, [leads, selectedClinicIds]);

  // const filteredMessages = useMemo(() => {
  //   return messages.filter((m) => selectedClinicIds.has(String(m.clinicId)));
  // }, [messages, selectedClinicIds]);

  // const unSelectedClinicIds = useMemo(
  //   () =>
  //     new Set(
  //       clinics.filter((c) => c.selected === false).map((c) => String(c._id)),
  //     ),
  //   [clinics],
  // );

  // const filteredLeads = useMemo(() => {
  //   return leads.filter(
  //     (lead) =>
  //       !unSelectedClinicIds.has(String(lead.clinicId)) &&
  //       selectedClinicPipelineIds.has(lead.pipelineId),
  //   );
  // }, [leads, unSelectedClinicIds]);

  // const filteredMessages = useMemo(() => {
  //   return messages.filter((m) => !unSelectedClinicIds.has(String(m.clinicId)));
  // }, [messages, unSelectedClinicIds]);

  // const filteredLeads = useMemo(() => {
  //   return leads.filter((lead) =>
  //     selectedClinicPipelineIds.has(lead.pipelineId),
  //   );
  // }, [leads, selectedClinicPipelineIds]);

  // const filteredMessages = useMemo(() => {
  //   // return messages.filter(
  //   // (m) =>
  //   // (!dateFrom || new Date(m.dateAdded) >= dateFrom) &&
  //   // (!dateTo || new Date(m.dateAdded) <= dateTo),
  //   // );
  //   return messages;
  // }, [messages]);

  /* ---------------- KPIs ---------------- */
  // const newLeads = filteredLeads;
  const newLeads = leads;
  const filteredLeads = leads;

  const filteredMessages = messages;

  const totalInboundCalls = filteredMessages.filter(
    (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
  );

  const answeredInboundCalls = totalInboundCalls.filter(
    (c) => c.status === "completed",
  );

  const inboundCallRate = totalInboundCalls.length
    ? ((answeredInboundCalls.length / totalInboundCalls.length) * 100).toFixed(
        2,
      )
    : "0.00";

  // const conversionLead = filteredLeads.filter((lead) => {
  //   const isInConversationStage = conversationPipelineStageIdSet.has(
  //     lead.pipelineStageId,
  //   );

  //   if (!isInConversationStage || !lead.lastStageChangeAt) return false;

  //   const leadStageChangeDate = dayjs(lead.lastStageChangeAt)
  //     .tz(lead.clinicTimezone)
  //     .format("YYYY-MM-DD");

  //   return leadStageChangeDate >= startDate && leadStageChangeDate <= endDate;
  // });

  // const conversionLead = filteredLeads.filter((lead) =>
  //   conversationPipelineStageIdSet.has(lead.pipelineStageId),
  // );

  // const totalBooked = filteredLeads.filter((lead) =>
  //   bookingPipelineStageIdSet.has(lead.pipelineStageId),
  // );

  // const showingLead = filteredLeads.filter((lead) =>
  //   showingPipelineStageIdSet.has(lead.pipelineStageId),
  // );

  // const closeLead = filteredLeads.filter((lead) =>
  //   closePipelineStageIdSet.has(lead.pipelineStageId),
  // );

  const isLeadInRangeAndStage = (lead, stageSet) => {
    if (!stageSet.has(lead.pipelineStageId) || !lead.lastStageChangeAt)
      return false;

    const stageChangeDate = dayjs(lead.lastStageChangeAt)
      .tz(lead.clinicTimezone)
      .format("YYYY-MM-DD");
    // console.log(stageChangeDate);

    return stageChangeDate >= startDate && stageChangeDate <= endDate;
  };

  const conversionLead = filteredLeads.filter((lead) =>
    isLeadInRangeAndStage(lead, conversationPipelineStageIdSet),
  );

  const totalBooked = filteredLeads.filter((lead) =>
    isLeadInRangeAndStage(lead, bookingPipelineStageIdSet),
  );

  const showingLead = filteredLeads.filter((lead) =>
    isLeadInRangeAndStage(lead, showingPipelineStageIdSet),
  );

  const closeLead = filteredLeads.filter((lead) =>
    isLeadInRangeAndStage(lead, closePipelineStageIdSet),
  );

  const avgCall = useMemo(() => {
    return hoursToDayTime(
      calculateAvgFirstResponseTime(
        filteredLeads,
        filteredMessages,
        "TYPE_CALL",
      ),
    );
  }, [filteredLeads, filteredMessages]);

  const avgSMS = useMemo(() => {
    return hoursToDayTime(
      calculateAvgFirstResponseTime(
        filteredLeads,
        filteredMessages,
        "TYPE_SMS",
      ),
    );
  }, [filteredLeads, filteredMessages]);

  const baseDate = useMemo(() => new Date(range[0].endDate), [range]);

  /* ---------------- chart ---------------- */
  const getLast12Months = (baseDate) => {
    const months = [];

    for (let i = 11; i >= 0; i--) {
      const d = dayjs(baseDate).subtract(i, "month");

      months.push({
        key: d.format("YYYY-M"),
        month: d.format("MMM YYYY"),
      });
    }

    return months;
  };

  const getMonthKey = (date, tz = "UTC") => dayjs(date).tz(tz).format("YYYY-M");

  const calculateMonthlyData = (leads, baseDate) => {
    const monthlyMap = {};

    // init last 12 months
    getLast12Months(baseDate).forEach(({ key, month }) => {
      monthlyMap[key] = {
        month,
        totalLead: 0,
        conversion: 0,
        booking: 0,
        showing: 0,
        close: 0,
      };
    });

    leads.forEach((lead) => {
      const tz = lead.clinicTimezone || "UTC";

      // total leads → createdAt month
      const createdKey = getMonthKey(lead.createdAt, tz);
      if (monthlyMap[createdKey]) {
        monthlyMap[createdKey].totalLead++;
      }

      // stage metrics → lastStageChangeAt month
      if (!lead.lastStageChangeAt) return;

      const stageKey = getMonthKey(lead.lastStageChangeAt, tz);
      if (!monthlyMap[stageKey]) return;

      if (conversationPipelineStageIdSet.has(lead.pipelineStageId))
        monthlyMap[stageKey].conversion++;

      if (bookingPipelineStageIdSet.has(lead.pipelineStageId))
        monthlyMap[stageKey].booking++;

      if (showingPipelineStageIdSet.has(lead.pipelineStageId))
        monthlyMap[stageKey].showing++;

      if (closePipelineStageIdSet.has(lead.pipelineStageId))
        monthlyMap[stageKey].close++;
    });

    return Object.values(monthlyMap);
  };

  const monthlyData = useMemo(
    () => calculateMonthlyData(filteredLeads, baseDate),
    [filteredLeads, baseDate],
  );

  /* ---------------- last 30 days table ---------------- */
  // const last30DaysKpiRows = useMemo(() => {
  //   const rows = [];
  //   const baseDate = new Date();

  //   for (let i = 0; i < 30; i++) {
  //     const day = new Date(baseDate);
  //     day.setDate(day.getDate() - i);

  //     const start = new Date(day.setHours(0, 0, 0, 0));
  //     const end = new Date(day.setHours(23, 59, 59, 999));

  //     const dailyLeads = filteredLeads.filter(
  //       (l) => new Date(l.createdAt) >= start && new Date(l.createdAt) <= end,
  //     );

  //     const dailyMessages = filteredMessages.filter(
  //       (m) => new Date(m.dateAdded) >= start && new Date(m.dateAdded) <= end,
  //     );

  //     const inboundCalls = dailyMessages.filter(
  //       (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
  //     );

  //     const answeredCalls = inboundCalls.filter(
  //       (c) => c.status === "completed",
  //     );

  //     rows.push({
  //       date: day.toLocaleDateString(),
  //       totalLead: dailyLeads.length,
  //       inboundCallRate: inboundCalls.length
  //         ? ((answeredCalls.length / inboundCalls.length) * 100).toFixed(2)
  //         : "0.00",
  //       conversion: dailyLeads.filter((l) =>
  //         conversationPipelineStageIdSet.has(l.pipelineStageId),
  //       ).length,
  //       booking: dailyLeads.filter((l) =>
  //         bookingPipelineStageIdSet.has(l.pipelineStageId),
  //       ).length,
  //       showing: dailyLeads.filter((l) =>
  //         showingPipelineStageIdSet.has(l.pipelineStageId),
  //       ).length,
  //       close: dailyLeads.filter((l) =>
  //         closePipelineStageIdSet.has(l.pipelineStageId),
  //       ).length,
  //       avgCall: hoursToDayTime(
  //         calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_CALL"),
  //       ),
  //       avgSms: hoursToDayTime(
  //         calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_SMS"),
  //       ),
  //     });
  //   }

  //   return rows;
  // }, [filteredLeads, filteredMessages]);

  const rangeDays = useMemo(() => {
    const start = new Date(range[0].startDate);
    const end = new Date(range[0].endDate);

    const diff = Math.abs(end - start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  }, [range]);

  const daysToShow = rangeDays > 30 ? 30 : rangeDays;

  const groupByLocalDay = (items, dateField) => {
    const map = new Map();

    for (const item of items) {
      const tz = item.clinicTimezone || "UTC";
      // const tz = "America/Denver";

      const key = dayjs(item[dateField]).tz(tz).format("YYYY-MM-DD");

      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    }

    return map;
  };

  const leadMap = useMemo(
    () => groupByLocalDay(filteredLeads, "createdAt"),
    [filteredLeads],
  );

  const messageMap = useMemo(
    () => groupByLocalDay(filteredMessages, "dateAdded"),
    [filteredMessages],
  );

  const last30DaysKpiRows = useMemo(() => {
    const rows = [];

    for (let i = 0; i < daysToShow; i++) {
      const dayKey = dayjs(baseDate).subtract(i, "day").format("YYYY-MM-DD");

      const dailyLeads = leadMap.get(dayKey) || [];
      const dailyMessages = messageMap.get(dayKey) || [];
      const isLeadInStageOnDay = (lead, stageSet, dayKey) => {
        if (!stageSet.has(lead.pipelineStageId) || !lead.lastStageChangeAt)
          return false;

        const stageChangeDay = dayjs(lead.lastStageChangeAt)
          .tz(lead.clinicTimezone)
          .format("YYYY-MM-DD");

        return stageChangeDay === dayKey;
      };

      const inboundCalls = dailyMessages.filter(
        (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
      );

      const answeredCalls = inboundCalls.filter(
        (c) => c.status === "completed",
      );

      rows.push({
        date: dayKey,
        totalLead: dailyLeads.length,

        inboundCallRate: inboundCalls.length
          ? ((answeredCalls.length / inboundCalls.length) * 100).toFixed(2)
          : "0.00",

        conversion: dailyLeads.filter((l) =>
          // conversationPipelineStageIdSet.has(l.pipelineStageId),
          isLeadInStageOnDay(l, conversationPipelineStageIdSet, dayKey),
        ).length,

        booking: dailyLeads.filter((l) =>
          // bookingPipelineStageIdSet.has(l.pipelineStageId),
          isLeadInStageOnDay(l, bookingPipelineStageIdSet, dayKey),
        ).length,

        showing: dailyLeads.filter((l) =>
          // showingPipelineStageIdSet.has(l.pipelineStageId),
          isLeadInStageOnDay(l, showingPipelineStageIdSet, dayKey),
        ).length,

        close: dailyLeads.filter((l) =>
          // closePipelineStageIdSet.has(l.pipelineStageId),
          isLeadInStageOnDay(l, closePipelineStageIdSet, dayKey),
        ).length,

        avgCall: hoursToDayTime(
          calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_CALL"),
        ),
        avgSms: hoursToDayTime(
          calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_SMS"),
        ),
      });
    }

    return rows;
  }, [leadMap, messageMap, baseDate, daysToShow]);

  // a clinic
  // const last30DaysKpiRows = useMemo(() => {
  //   const rows = [];

  //   for (let i = 0; i < daysToShow; i++) {
  //     const day = dayjs(baseDate).subtract(i, "day");

  //     const dayKey = day.format("YYYY-MM-DD");

  //     const dailyLeads = filteredLeads.filter(
  //       (l) =>
  //         dayjs(l.createdAt).tz(l.clinicTimezone).format("YYYY-MM-DD") ===
  //         dayKey,
  //     );

  //     const dailyMessages = filteredMessages.filter(
  //       (m) =>
  //         dayjs(m.dateAdded).tz(m.clinicTimezone).format("YYYY-MM-DD") ===
  //         dayKey,
  //     );

  //     const inboundCalls = dailyMessages.filter(
  //       (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL",
  //     );

  //     const answeredCalls = inboundCalls.filter(
  //       (c) => c.status === "completed",
  //     );

  //     rows.push({
  //       date: day.format("MM/DD/YYYY"),
  //       totalLead: dailyLeads.length,
  //       inboundCallRate: inboundCalls.length
  //         ? ((answeredCalls.length / inboundCalls.length) * 100).toFixed(2)
  //         : "0.00",
  //       conversion: dailyLeads.filter((l) =>
  //         conversationPipelineStageIdSet.has(l.pipelineStageId),
  //       ).length,
  //       booking: dailyLeads.filter((l) =>
  //         bookingPipelineStageIdSet.has(l.pipelineStageId),
  //       ).length,
  //       showing: dailyLeads.filter((l) =>
  //         showingPipelineStageIdSet.has(l.pipelineStageId),
  //       ).length,
  //       close: dailyLeads.filter((l) =>
  //         closePipelineStageIdSet.has(l.pipelineStageId),
  //       ).length,
  //       avgCall: hoursToDayTime(
  //         calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_CALL"),
  //       ),
  //       avgSms: hoursToDayTime(
  //         calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_SMS"),
  //       ),
  //     });
  //   }

  //   return rows;
  // }, [filteredLeads, filteredMessages, baseDate, daysToShow]);

  if (opporLoading || convLoading) return <Loading />;
  // if (!selectedClinics.length) {
  //   return <Loading />;
  // }

  /* ---------------- UI ---------------- */
  return (
    <div>
      {/* <div className="flex justify-end mb-4 bg-black w-full py-10 fixed top-0 left-0 mt-20 mx-auto px-10">
        <div className="relativ ">
          <CalendarRange range={range} setRange={setRange}></CalendarRange>
        </div>
      </div> */}

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
          value={newLeads.length}
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
          value={conversionLead.length}
        />
        <KPI
          label="Avg Lead Call Response Time"
          icon={FaPhoneAlt}
          bg="#F97316"
          value={`${avgCall.days}d ${avgCall.hours}h ${avgCall.minutes}m`}
        />
        <KPI
          label="Avg Lead Text Response Time"
          icon={FaSms}
          bg="#A855F7"
          value={`${avgSMS.days}d ${avgSMS.hours}h ${avgSMS.minutes}m`}
        />
        <KPI
          label="Booking"
          icon={FaCalendarCheck}
          bg="#06B6D4"
          value={totalBooked.length}
        />
        <KPI
          label="Showing"
          icon={FaEye}
          bg="#EAB308"
          value={showingLead.length}
        />
        <KPI
          label="Close"
          icon={FaHandshake}
          bg="#EF4444"
          value={closeLead.length}
        />
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
              totalLead={newLeads.length}
              inboundCallRate={inboundCallRate}
              conversionLead={conversionLead.length}
              totalBooked={totalBooked.length}
              showingLead={showingLead.length}
              closeLead={closeLead.length}
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
