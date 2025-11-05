import KPI from "@/component/KPI/KPI";
import axios from "axios";
import React, { useEffect, useState } from "react";
import presentation from "../../../assets/imgi_2_presentation-icon.png";
import check from "../../../assets/imgi_3_check-icon.png";
import conference from "../../../assets/imgi_4_conference-presentation-icon.png";
import travel from "../../../assets/imgi_5_travel-agency-icon.png";
import cash from "../../../assets/imgi_6_cash-bag-icon.png";
import LineChart from "@/component/LineChart/LineChart";
import GoalAchieve from "@/component/GoalAchieve/GoalAchieve";
import { HiOutlineDocumentText } from "react-icons/hi";
import useAuth from "@/hooks/useAuth";

const Home = () => {
  const [report, setReport] = useState({});
  const { db_user: { permissions } = {} } = useAuth();


  // const { data: clinics } = useGetSecureData("clinics", "/clinics");
  // const { mergedData, isLoading } = useAllClinics(clinics);
  // console.log(mergedData);

  // Monthly data object
  const monthlyData = {
    Jan: [],
    Feb: [],
    Mar: [],
    Apr: [],
    May: [],
    Jun: [],
    Jul: [],
    Aug: [],
    Sep: [],
    Oct: [],
    Nov: [],
    Dec: [],
  };

  // Helper array to map month index to name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://services.leadconnectorhq.com/opportunities/search?location_id=HgiBOaKxNEO2RVYbuTf1&limit=100&page=5",
    headers: {
      Accept: "application/json",
      Version: "2021-07-28",
      Authorization: "Bearer pit-952e1d8e-3016-4eaf-a45a-f4bda3a2b7cc",
    },
  };

  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        const data = response.data.aggregations.pipelines.buckets;
        makeReport(data);
      })
      .catch((error) => {
        console.log("API Error:", error.response?.data || error);
      });
  }, []);

  // const { mutateAsync: add_clinic } = useMutation({
  //   mutationFn: async (info) => {
  //     const { data } = await axiosSecure.post("/api/sync", info);
  //     // const { data } = await axiosSecure.post("/api/clinics", info);
  //     return data;
  //   },
  //   onSuccess: () => toast.success("Clinic added successfully"),
  // });

  function makeReport(data) {
    // Initialize metrics
    const metrics = {
      totalLeads: 0,
      lifetimeTxValue: 0,
      currentTxValue: 0,
      sets: 0,
      presentedTX: 0,
      startedTX: 0,
      noShow: 0,
      // Additional breakdowns
      byPipeline: {},
      byStage: {},
      byStatus: {},
    };

    // Process each pipeline bucket
    data.forEach((pipeline) => {
      const pipelineKey = pipeline.key;
      const pipelineName = getPipelineName(pipelineKey); // You'll need to map pipeline IDs to names

      // Initialize pipeline in metrics
      if (!metrics.byPipeline[pipelineKey]) {
        metrics.byPipeline[pipelineKey] = {
          name: pipelineName,
          totalLeads: 0,
          lifetimeTxValue: 0,
          currentTxValue: 0,
          sets: 0,
          presentedTX: 0,
          startedTX: 0,
          noShow: 0,
        };
      }

      // Process each opportunity in the pipeline
      pipeline.pipelines.hits.hits.forEach((hit) => {
        const source = hit._source;
        const monetaryValue = source.monetaryValue || 0;
        const stageId = source.pipelineStageId;
        const tags = source.tags || [];
        const status = source.status;

        const date = new Date(source.dateAdded);
        const monthIndex = date.getMonth(); // 0-based
        const monthName = monthNames[monthIndex];
        // console.log(monthName);
        monthlyData[monthName].push(source);

        // Count total leads
        metrics.totalLeads++;
        metrics.byPipeline[pipelineKey].totalLeads++;

        // Sum lifetime transaction value
        metrics.lifetimeTxValue += monetaryValue;
        metrics.byPipeline[pipelineKey].lifetimeTxValue += monetaryValue;

        // Count by status
        if (!metrics.byStatus[status]) {
          metrics.byStatus[status] = 0;
        }
        metrics.byStatus[status]++;

        // Count by stage
        if (!metrics.byStage[stageId]) {
          metrics.byStage[stageId] = {
            name: getStageName(stageId), // You'll need to map stage IDs to names
            count: 0,
            value: 0,
          };
        }
        metrics.byStage[stageId].count++;
        metrics.byStage[stageId].value += monetaryValue;

        // Business logic for specific counts
        // "Sets" - Usually qualified leads or appointments set
        if (isSetStage(stageId) || tags.includes("scheduled appointment")) {
          metrics.sets++;
          metrics.byPipeline[pipelineKey].sets++;
          metrics.currentTxValue += monetaryValue;
          metrics.byPipeline[pipelineKey].currentTxValue += monetaryValue;
        }

        // "Presented TX" - Treatment presented
        if (
          isPresentedStage(stageId) ||
          tags.includes("presented") ||
          tags.includes("treatment presented")
        ) {
          metrics.presentedTX++;
          metrics.byPipeline[pipelineKey].presentedTX++;
        }

        // "Started TX" - Treatment started
        if (
          isStartedStage(stageId) ||
          tags.includes("started") ||
          tags.includes("treatment started")
        ) {
          metrics.startedTX++;
          metrics.byPipeline[pipelineKey].startedTX++;
        }

        // "No Show" - Missed appointments
        if (
          isNoShowStage(stageId) ||
          tags.includes("no show") ||
          tags.includes("missed appointment")
        ) {
          metrics.noShow++;
          metrics.byPipeline[pipelineKey].noShow++;
        }
      });
    });

    // Create the final report
    const report = {
      clinic_name: "Greater Washington Oral and Maxillofacial Surgery",
      location_id: "HgiBOaKxNEO2RVYbuTf1", // From your data
      report_date: new Date().toISOString(),

      // Main metrics matching your client's format
      leads: metrics.totalLeads,
      sets: metrics.sets,
      presented_tx: metrics.presentedTX,
      no_show: metrics.noShow,
      started_tx: metrics.startedTX,
      tx_value: `$${metrics.currentTxValue.toLocaleString()}`,
      lifetime_tx_value: `$${metrics.lifetimeTxValue.toLocaleString()}`,

      // Raw numbers for calculations
      raw: {
        current_tx_value: metrics.currentTxValue,
        lifetime_tx_value: metrics.lifetimeTxValue,
      },

      // Additional insights
      breakdown: {
        by_pipeline: metrics.byPipeline,
        by_stage: metrics.byStage,
        by_status: metrics.byStatus,
      },
    };

    // const financialData ={
    //   totalSpend:26000,
    //   dimMgmtFee:4000,
    //   adSpend:22000,

    // }
    // const filterMonthly =

    // generateMonthlyReport(report,)
    // console.log("Clinic Performance Report:", report);
    setReport(report);
    return report;
  }

  // Helper functions - you'll need to customize these based on your pipeline configuration
  function getPipelineName(pipelineId) {
    const pipelineMap = {
      nomfM2sEp0psPHRdrSRU: "Main Pipeline",
      JvTQ7qoVVQRcApKjFSg6: "Secondary Pipeline",
      "490094d0-9ece-4faa-a3e6-298fd6a89743": "Evaluation Pipeline",
      // Add more pipeline mappings as needed
    };
    return pipelineMap[pipelineId] || pipelineId;
  }

  function getStageName(stageId) {
    const stageMap = {
      "490094d0-9ece-4faa-a3e6-298fd6a89743": "Evaluation",
      "23c369fb-1294-4e87-aa0d-3aa11657359c": "Qualified Lead",
      "95e6a5e9-dbe7-4f48-8ab5-b3b0ab853fd9": "Scheduled Appointment",
      "07b9fa8e-d50d-4ca2-a591-8cf107d84d07": "Treatment Presented",
      "f06d0054-5e47-4084-971b-6aea7bbed727": "Treatment Started",
      // Add more stage mappings as needed
    };
    return stageMap[stageId] || stageId;
  }

  function isSetStage(stageId) {
    const setStages = [
      "95e6a5e9-dbe7-4f48-8ab5-b3b0ab853fd9", // Scheduled Appointment
      "23c369fb-1294-4e87-aa0d-3aa11657359c", // Qualified Lead
    ];
    return setStages.includes(stageId);
  }

  function isPresentedStage(stageId) {
    const presentedStages = [
      "07b9fa8e-d50d-4ca2-a591-8cf107d84d07", // Treatment Presented
    ];
    return presentedStages.includes(stageId);
  }

  function isStartedStage(stageId) {
    const startedStages = [
      "f06d0054-5e47-4084-971b-6aea7bbed727", // Treatment Started
    ];
    return startedStages.includes(stageId);
  }

  function isNoShowStage(stageId) {
    const noShowStages = [
      // Add stage IDs that represent no-shows
    ];
    return noShowStages.includes(stageId);
  }

  // console.log(monthlyData);

  // Monthly report generation function
  const generateMonthlyReport = (monthlyData, financialData) => {
    return monthlyData.map((monthData, index) => {
      const {
        month,
        leads,
        sets,
        presented_tx,
        no_show,
        started_tx,
        tx_value,
      } = monthData;
      // const { totalSpend, dimMgmtFee, adSpend, otherMgmtFee } = financialData[index];
      const { totalSpend, dimMgmtFee, adSpend, otherMgmtFee } = financialData;

      const daysInMonth = getDaysInMonth(month);
      const leadsPerDay = leads / daysInMonth;
      const avgCPL = adSpend / leads;
      const setRate = (sets / leads) * 100;
      const showRate = ((sets - no_show) / sets) * 100;
      const roi = ((tx_value - totalSpend) / totalSpend) * 100;
      const roas = tx_value / totalSpend;

      return {
        MONTHS: month,
        LEADS: leads,
        "LEADS/DAY": leadsPerDay.toFixed(2),
        "AVG CPL": `$${avgCPL.toFixed(2)}`,
        SETS: sets,
        "SET RATE": `${setRate.toFixed(2)}%`,
        "PRESENTED TX": presented_tx,
        "NS/CA": no_show,
        "SHOW RATE": `${showRate.toFixed(1)}%`,
        "STARTED TX": started_tx,
        "TX VALUE": `$${tx_value.toLocaleString()}`,
        ROI: `${roi.toFixed(2)}%`,
        ROAS: roas.toFixed(2),
        "TOTAL SPEND": `$${totalSpend.toLocaleString()}`,
        "DIM MGMT FEE": `$${dimMgmtFee.toLocaleString()}`,
        "AD SPEND": `$${adSpend.toLocaleString()}`,
        // "OTHER MGMT FEE": `$${otherMgmtFee.toLocaleString()}`
      };
    });
  };

  // Helper function
  const getDaysInMonth = (monthYear) => {
    const [month, year] = monthYear.split(" ");
    const monthIndex = new Date(Date.parse(month + " 1, " + year)).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const data = [
    { month: "Jan", leads: 17805 },
    { month: "Feb", leads: 14820 },
    { month: "Mar", leads: 17323 },
    { month: "Apr", leads: 16506 },
    { month: "May", leads: 17120 },
    { month: "Jun", leads: 16486 },
    { month: "Jul", leads: 16229 },
    { month: "Aug", leads: 13663 },
    { month: "Sep", leads: 13092 },
    { month: "Oct", leads: 11363 },
    // { month: "Nov", leads: 0 },
    // { month: "Dec", leads: 0 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-6 rounded-md shadow-sm mb-6">
        <h4 className="font-medium text-lg">2262 clients selected</h4>
        <button>calender</button>
      </div>
      {/* KPIs */}
      {!!permissions?.dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KPI
            label={"leads"}
            img={presentation}
            bg={"#6359D9"}
            value={report.leads}
          ></KPI>
          <KPI
            label={"sets"}
            img={check}
            bg={"#FB7D5B"}
            value={report.sets}
          ></KPI>
          <KPI
            label={"presented TX"}
            img={conference}
            bg={"#FCC43E"}
            value={report.presented_tx}
          ></KPI>
          <KPI
            label={"no show"}
            img={check}
            bg={"#CE74ED"}
            value={report.no_show}
          ></KPI>
          <KPI
            label={"started TX"}
            img={travel}
            bg={"#396AF3"}
            value={report.started_tx}
          ></KPI>
          <KPI
            label={"TX value"}
            img={cash}
            bg={"#39BBF3"}
            value={report.tx_value}
            lifetime_tx_value={report.lifetime_tx_value}
          ></KPI>
        </div>
      )}

      <div className="w-[calc(100vw-50px)] md:w-full flex flex-col lg:flex-row gap-6 mt-6">
        {!!permissions?.dashboard && (
          <div className="flex-1 bg-white rounded-md shadow">
            <h4 className="font-semibold text-lg p-4 border-b text-slate-800">
              Leads Over Time : 2025
            </h4>
            <LineChart data={data}></LineChart>
          </div>
        )}

        {!!permissions?.dashboardSubs?.goalAchievement && (
          <div
            className={`${
              permissions?.dashboard ? "w-full lg:w-[35%]" : "w-full"
            }`}
          >
            <GoalAchieve></GoalAchieve>
          </div>
        )}
      </div>

      {!!permissions?.dashboardSubs?.masterReportOverview && (
        <div className="bg-white rounded-md mt-6">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-lg font-semibold text-slate-800">
              Master Report Overview : 2025
            </h1>
            <button className="flex items-center gap-1 rounded-md bg-blue-500 text-white p-2.5 text-sm hover:bg-blue-600 scale-100 active:scale-95 transition-all duration-300">
              <HiOutlineDocumentText />
              View Full Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
