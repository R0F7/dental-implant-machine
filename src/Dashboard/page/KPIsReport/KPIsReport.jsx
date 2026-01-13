import KPI from "@/component/KPI/KPI";
import React, { useMemo } from "react";

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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import calculateAvgFirstResponseTime from "@/utility/calculateAvgFirstResponseTime";
import hoursToDayTime from "@/utility/hoursToDayTime";
import useAuth from "@/hooks/useAuth";
import GoalAchieve from "@/component/GoalAchieve/GoalAchieve";
import KPIsReportTable from "../KPIsReportTable/KPIsReportTable";
import LineChart from "@/component/LineChart/LineChart";
import Loading from "../Loading/Loading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const KPIsReport = () => {
  const { db_user: { permissions } = {} } = useAuth();
  const locationId = import.meta.env.VITE_LOCATION_ID;
  const authToken = import.meta.env.VITE_AUTHORIZATION;

  const conversionRatePipelines = [
    { name: "Unqualified", id: "2aeae35-d676-4a34-924b-af9a76aacce6" },
    { name: "In Communication", id: "a183931d-84f3-41aa-90b3-e346924d4454" },
    { name: "Not Interested", id: "8077796c-9b09-459c-b4b1-90a5491b70c8" },
    { name: "VTC Appointment", id: "78906967-c7f9-4d27-903a-c55fa5007480" },
    {
      name: "Scheduled Appointment",
      id: "bbeb7c55-c4f6-475e-9a4d-dd4ecdfc0868",
    },
    { name: "No Show/Cancel", id: "76f77f91-63a7-457f-841f-34d6debaa7ca" },
    { name: "APPT Rescheduled", id: "95e6a5e9-dbe7-4f48-8ab5-b3b0ab853fd9" },
    {
      name: "Presented Treatment -> Follow Up/ Sent Brownies",
      id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
    },
    {
      name: "Tx Plan Not Accepted",
      id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
    },
    { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
    { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
  ];

  const bookingRatePipelines = [
    {
      name: "Scheduled Appointment",
      id: "bbeb7c55-c4f6-475e-9a4d-dd4ecdfc0868",
    },
    { name: "No Show/Cancel", id: "76f77f91-63a7-457f-841f-34d6debaa7ca" },
    { name: "APPT Rescheduled", id: "95e6a5e9-dbe7-4f48-8ab5-b3b0ab853fd9" },
    {
      name: "Presented Treatment -> Follow Up/ Sent Brownies",
      id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
    },
    {
      name: "Tx Plan Not Accepted",
      id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
    },
    { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
    { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
  ];

  const showingRatePipelines = [
    {
      name: "Presented Treatment -> Follow Up/ Sent Brownies",
      id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
    },
    {
      name: "Tx Plan Not Accepted",
      id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
    },
    { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
    { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
  ];

  const closeRatePipelines = [
    { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
  ];

  const conversationPipelineStageIdSet = new Set(
    conversionRatePipelines.map((p) => p.id)
  );

  const bookingPipelineStageIdSet = new Set(
    bookingRatePipelines.map((p) => p.id)
  );

  const showingPipelineStageIdSet = new Set(
    showingRatePipelines.map((p) => p.id)
  );

  const closePipelineStageIdSet = new Set(closeRatePipelines.map((p) => p.id));

  const fetchAllOpportunities = async () => {
    let allData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(
        "https://services.leadconnectorhq.com/opportunities/search",
        {
          params: {
            // location_id: "***",
            location_id: locationId,
            limit: 100,
            page,
          },
          headers: {
            Accept: "application/json",
            Version: "2021-07-28",
            // Authorization: "Bearer ***",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const opportunities = response.data.opportunities || [];
      allData.push(...opportunities);

      if (opportunities.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allData;
  };

  //   const fetchAllMessages = async () => {
  //     let cursor = null;
  //     let allData = [];

  //     do {
  //       const res = await axios.get(
  //         "https://services.leadconnectorhq.com/conversations/messages/export",
  //         {
  //           params: {
  //             // locationId: "***",
  //             location_id: locationId,
  //             limit: 100,
  //             cursor,
  //           },
  //           headers: {
  //             Accept: "application/json",
  //             Version: "2021-07-28",
  //             // Authorization: "Bearer ***",
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );

  //       allData.push(...(res.data.messages || []));
  //       cursor = res.data.nextCursor || null;
  //     } while (cursor);

  //     return allData;
  //   };

  const fetchAllMessages = async () => {
    let cursor = null;
    let allData = [];

    do {
      const params = { locationId: locationId, limit: 100 };
      if (cursor) params.cursor = cursor;

      const res = await axios.get(
        "https://services.leadconnectorhq.com/conversations/messages/export",
        {
          params,
          headers: {
            Accept: "application/json",
            Version: "2021-07-28",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      allData.push(...(res.data.messages || []));
      cursor = res.data.nextCursor || null;
    } while (cursor);

    return allData;
  };

  const {
    data: leads = [],
    isLoading: opporLoading,
    //   isError,
    //   error,
  } = useQuery({
    queryKey: ["opportunities", authToken],
    queryFn: fetchAllOpportunities,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const {
    data: messages = [],
    isLoading: convLoading,
    //   isError,
    //   error,
  } = useQuery({
    queryKey: ["messages", authToken],
    queryFn: fetchAllMessages,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // const results = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["opportunities", "location_id"],
  //       queryFn: fetchAllOpportunities,
  //       staleTime: 5 * 60 * 1000,
  //     },
  //     {
  //       queryKey: ["messages", "location_id"],
  //       queryFn: fetchAllMessages,
  //       staleTime: 5 * 60 * 1000,
  //     },
  //   ],
  // });

  // const leads = results[0].data ?? [];
  // const messages = results[1].data ?? [];

  // const isLoading = results.some(r => r.isLoading);
  // const isError = results.some(r => r.isError);

  // all leads
  // let config = {
  //   method: "get",
  //   maxBodyLength: Infinity,
  //   url: "https://services.leadconnectorhq.com/opportunities/search?location_id=***",
  //   headers: {
  //     Accept: "application/json",
  //     Version: "2021-07-28",
  //     Authorization: "Bearer ***",
  //   },
  // };

  // axios
  //   .request(config)
  //   .then((response) => {
  //     setLeads(response.data.meta.total);
  //     //   console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  /* all messages */
  // useEffect(() => {
  //   let messages_config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "https://services.leadconnectorhq.com/conversations/messages/export?locationId=***",
  //     headers: {
  //       Accept: "application/json",
  //       Version: "2021-04-15",
  //       Authorization: "Bearer ***",
  //     },
  //   };

  //   axios
  //     .request(messages_config)
  //     .then((response) => {
  //       //   console.log(response.data.messages);
  //       setMessages(response.data.messages);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // ---------------- chart -----------
  const getLast12Months = () => {
    const months = [];

    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);

      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`, // unique
        month: d.toLocaleString("en-US", { month: "short" }),
        year: d.getFullYear(),
        monthIndex: d.getMonth(),
      });
    }

    return months;
  };

  const calculateMonthlyData = (leads) => {
    const last12Months = getLast12Months();
    const monthlyMap = {};

    // initialize last 12 months
    last12Months.forEach(({ key, month, year }) => {
      monthlyMap[key] = {
        month: `${month} ${year}`,
        totalLead: 0,
        conversion: 0,
        booking: 0,
        showing: 0,
        close: 0,
      };
    });

    leads.forEach((lead) => {
      const date = new Date(lead.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      if (!monthlyMap[key]) return; // ignore older data

      monthlyMap[key].totalLead += 1;

      if (conversationPipelineStageIdSet.has(lead.pipelineStageId)) {
        monthlyMap[key].conversion += 1;
      }

      if (bookingPipelineStageIdSet.has(lead.pipelineStageId)) {
        monthlyMap[key].booking += 1;
      }

      if (showingPipelineStageIdSet.has(lead.pipelineStageId)) {
        monthlyMap[key].showing += 1;
      }

      if (closePipelineStageIdSet.has(lead.pipelineStageId)) {
        monthlyMap[key].close += 1;
      }
    });

    return Object.values(monthlyMap);
  };

  const monthlyData = useMemo(() => {
    return calculateMonthlyData(leads);
  }, [leads]);

  if (opporLoading || convLoading) {
    return <Loading></Loading>;
  }

  const totalInboundCalls = messages.filter(
    (message) =>
      message.direction === "inbound" && message.messageType === "TYPE_CALL"
  );

  const answeredInboundCalls = totalInboundCalls.filter(
    (call) => call.status === "completed"
  );

  const inboundCallRate = (
    (answeredInboundCalls.length / totalInboundCalls.length) *
    100
  ).toFixed(2);

  const conversionLead = leads.filter((lead) =>
    conversationPipelineStageIdSet.has(lead.pipelineStageId)
  );

  const totalBooked = leads.filter((lead) =>
    bookingPipelineStageIdSet.has(lead.pipelineStageId)
  );

  const showingLead = leads.filter((lead) =>
    showingPipelineStageIdSet.has(lead.pipelineStageId)
  );

  const closeLead = leads.filter((lead) =>
    closePipelineStageIdSet.has(lead.pipelineStageId)
  );

  // 1
  // function calculateAvgSmsResponseTimeInHours(leads, messages) {
  //   let totalResponseHours = 0;
  //   let validLeadCount = 0;

  //   for (const lead of leads) {
  //     const leadCreatedAt = new Date(lead.createdAt);
  //     const contactId = lead.contactId;

  //     // only TYPE_SMS after lead creation
  //     const validMessages = messages.filter(
  //       (msg) =>
  //         msg.contactId === contactId &&
  //         msg.messageType === "TYPE_CALL" &&
  //         msg.dateAdded &&
  //         new Date(msg.dateAdded) >= leadCreatedAt
  //     );

  //     if (!validMessages.length) continue;

  //     // earliest SMS after lead creation
  //     const firstSms = validMessages.reduce((earliest, current) =>
  //       new Date(current.dateAdded) < new Date(earliest.dateAdded)
  //         ? current
  //         : earliest
  //     );

  //     const responseTimeHours =
  //       (new Date(firstSms.dateAdded) - leadCreatedAt) / (1000 * 60 * 60);

  //     totalResponseHours += responseTimeHours;
  //     validLeadCount++;
  //   }

  //   if (validLeadCount === 0) return 0;

  //   return totalResponseHours / validLeadCount;
  // }
  // const avgHours = calculateAvgSmsResponseTimeInHours(leads, messages);
  // console.log("Average SMS Response Time (hours):", avgHours.toFixed(2));
  // 43.71

  const avgCall = hoursToDayTime(
    calculateAvgFirstResponseTime(leads, messages, "TYPE_CALL")
  );

  const avgSMS = hoursToDayTime(
    calculateAvgFirstResponseTime(leads, messages, "TYPE_SMS")
  );

  // ------- last 30 Days Kpi Report for table --------------
  const getDayRange = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  const last30DaysKpiRows = [];

  for (let i = 0; i < 30; i++) {
    const day = new Date();
    day.setDate(day.getDate() - i);

    const { start, end } = getDayRange(day);

    // leads for this day
    const dailyLeads = leads.filter(
      (l) => new Date(l.createdAt) >= start && new Date(l.createdAt) <= end
    );

    // messages for this day
    const dailyMessages = messages.filter(
      (m) => new Date(m.dateAdded) >= start && new Date(m.dateAdded) <= end
    );

    // KPIs
    const totalLead = dailyLeads.length;

    const inboundCalls = dailyMessages.filter(
      (m) => m.direction === "inbound" && m.messageType === "TYPE_CALL"
    );

    const answeredCalls = inboundCalls.filter((c) => c.status === "completed");

    const inboundCallRate = inboundCalls.length
      ? ((answeredCalls.length / inboundCalls.length) * 100).toFixed(2)
      : "0.00";

    const conversion = dailyLeads.filter((lead) =>
      conversationPipelineStageIdSet.has(lead.pipelineStageId)
    ).length;

    const booking = dailyLeads.filter((lead) =>
      bookingPipelineStageIdSet.has(lead.pipelineStageId)
    ).length;

    const showing = dailyLeads.filter((lead) =>
      showingPipelineStageIdSet.has(lead.pipelineStageId)
    ).length;

    const close = dailyLeads.filter((lead) =>
      closePipelineStageIdSet.has(lead.pipelineStageId)
    ).length;

    const avgCall = hoursToDayTime(
      calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_CALL")
    );

    const avgSms = hoursToDayTime(
      calculateAvgFirstResponseTime(dailyLeads, dailyMessages, "TYPE_SMS")
    );

    last30DaysKpiRows.push({
      date: day.toLocaleDateString(),
      totalLead,
      inboundCallRate,
      conversion,
      avgCall,
      avgSms,
      booking,
      showing,
      close,
    });
  }
  // console.log(last30DaysKpiRows);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI
          label="Total Lead"
          icon={HiPresentationChartLine}
          bg="#4F46E5"
          value={leads.length || "00"}
        />

        <KPI
          label="Inbound Call Rate"
          icon={FaPhoneVolume}
          bg="#0EA5E9"
          value={`${inboundCallRate || "00"}%`}
        />

        <KPI
          label="Conversion"
          icon={BsGraphUp}
          bg="#22C55E"
          value={`${conversionLead.length || "00"}`}
        />

        <KPI
          label="Avg Lead Call Response Time"
          icon={FaPhoneAlt}
          bg="#F97316"
          // value={avgCallHours || "00"}
          value={`${avgCall.days}d ${avgCall.hours}h ${avgCall.minutes}m`}
        />

        <KPI
          label="Avg Lead Text Response Time"
          icon={FaSms}
          bg="#A855F7"
          // value={avgSmsHours || "00"}
          value={`${avgSMS.days}d ${avgSMS.hours}h ${avgSMS.minutes}m`}
        />

        <KPI
          label="Booking"
          icon={FaCalendarCheck}
          bg="#06B6D4"
          value={`${totalBooked.length || "00"}`}
        />

        <KPI
          label="Showing"
          icon={FaEye}
          bg="#EAB308"
          value={`${showingLead.length || "00"}`}
        />

        <KPI
          label="Close"
          icon={FaHandshake}
          bg="#EF4444"
          value={`${closeLead.length || "00"}`}
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
              totalLead={leads.length}
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
          <h2 className="text-lg font-semibold text-slate-800 mb-3">
            last 30 Days KPIs Report{" "}
          </h2>

          <Link to="/KPIs-full-report" state={{ rows: last30DaysKpiRows }}>
            <button className="flex items-center gap-1 rounded-md bg-blue-500 text-white p-2.5 text-sm hover:bg-blue-600 scale-100 active:scale-95 transition-all duration-300">
              <HiOutlineDocumentText />
              View Full Report
            </button>
          </Link>
        </div>
        <KPIsReportTable data={last30DaysKpiRows}></KPIsReportTable>
      </div>
    </div>
  );
};

export default KPIsReport;
