import KPI from "@/component/KPI/KPI";
import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CalendarRange from "@/component/CalendarRange/CalendarRange";
import useGetSecureData from "@/hooks/useGetSecureData";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import Loading from "../Loading/Loading";
import ScatterChart from "@/component/ScatterChart/ScatterChart";

const CDRReport = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const { user, loading } = useAuth();

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

  // ----------- data -----------
  const { data: clinics = [] } = useGetSecureData("clinics", "/clinics");

  const selectedClinicIds = useMemo(
    () =>
      clinics.filter((clinic) => clinic.selected).map((clinic) => clinic._id),
    [clinics],
  );
  // console.log(selectedClinicIds);

  const { data: reports = [], isLoading: reportLoading } = useQuery({
    queryKey: ["cdr-report", startDate, endDate, selectedClinicIds],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/cdr-report", {
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

  // function mapCallsToScatterPoints(calls, wins) {
  //   return calls.map((item) => {
  //     const date = wins ? dayjs(item.createdAt) : dayjs(item.dateAdded);

  //     return {
  //       x: date.toDate(), // Chart.js time scale
  //       y: date.hour(), // 0–23
  //       clinicName: item.clinicName,
  //     };
  //   });
  // }

  // function mapCallsToScatterPoints(calls, wins) {
  //   return calls.map((item) => {
  //     const rawDate = wins ? item.createdAt : item.dateAdded;

  //     const date = dayjs.utc(rawDate).tz("America/Denver");

  //     return {
  //       x: date.toDate(),
  //       y: date.hour(),
  //       clinicName: item.clinicName,
  //     };
  //   });
  // }

  function mapCallsToScatterPoints(calls, wins) {
  return calls.map((item) => {
    const rawDate = wins ? (item.createdAt?.$date || item.createdAt) : (item.dateAdded?.$date || item.dateAdded);

    const date = dayjs.utc(rawDate).tz("America/Denver");

    return {
      x: date.format("YYYY-MM-DDTHH:mm:ss"), 
      y: date.hour(),
      clinicName: item.clinicName,
    };
  });
}

  //   function mapCallsToScatterPoints(calls, wins) {
  //   if (!calls) return [];
  //   return calls.map((item) => {
  //     const rawDate = wins ? item.createdAt : item.dateAdded;

  //     const tzDate = dayjs(rawDate).tz("America/Denver");

  //     return {
  //       // x: tzDate.toDate(),
  //       x: tzDate.format("YYYY-MM-DDTHH:mm:ss"),
  //       y: tzDate.hour(),
  //       clinicName: item.clinicName,
  //     };
  //   });
  // }

  // const {
  //   inbound_calls_answer,
  //   missed_call,
  //   outbound_call,
  //   booked_call,
  //   wins,
  // } = reports;
  // console.log(reports);

  const scatterDatasets = useMemo(() => {
    if (!reports) return [];

    return [
      {
        label: "Inbound Answer Call",
        data: mapCallsToScatterPoints(reports.inbound_calls_answer || []),
        backgroundColor: "#0EA5E9",
      },
      {
        label: "Missed Call",
        data: mapCallsToScatterPoints(reports.missed_call || []),
        backgroundColor: "#EF4444",
      },
      {
        label: "Outbound Call",
        data: mapCallsToScatterPoints(reports.outbound_call || []),
        backgroundColor: "#F97316",
      },
      {
        label: "Booked Call",
        data: mapCallsToScatterPoints(reports.booked_call || []),
        backgroundColor: "#8B5CF6",
      },
      {
        label: "Wins",
        data: mapCallsToScatterPoints(reports.wins || [], true),
        backgroundColor: "#22C55E",
      },
    ];
  }, [reports]);

  if (reportLoading) return <Loading></Loading>;

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

      <ScatterChart datasets={scatterDatasets} />
    </div>
  );
};

export default CDRReport;
