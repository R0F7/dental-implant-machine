// import React from "react";

import percentage from "@/utility/percentage";
import ProgressRow from "../ProgressRow/ProgressRow";

// const GoalAchieve = ({
//   totalLead,
//   inboundCallRate,
//   conversionLead,
//   totalBooked,
//   showingLead,
//   closeLead,
// }) => {
//   // if (
//   //   !totalLead ||
//   //   !inboundCallRate ||
//   //   !conversionLead ||
//   //   !totalBooked ||
//   //   !showingLead ||
//   //   !closeLead
//   // )
//   //   return;

//   const inboundPercentage = (inboundCallRate / 80) * 100;

//   function calculateFillUpPercentage(target, achieved) {
//     // Formula: (achieved / target) * 100
//     const percentage = (achieved / target) * 100;
//     return percentage.toFixed(2);
//   }

//   const conversations_target_rate = (
//     ((totalLead * 0.6) / totalLead) *
//     100
//   ).toFixed(2);

//   const conversationRate = calculateFillUpPercentage(totalLead, conversionLead);
//   // const conversationRate = (conversionLead / totalLead) * 100;

//   const filupConversationRate = calculateFillUpPercentage(
//     conversations_target_rate,
//     conversationRate
//   );

//   const booking_target_rate = (((totalLead * 0.25) / totalLead) * 100).toFixed(
//     2
//   );
//   // console.log((booking_target_rate/));

//   const bookingRate = calculateFillUpPercentage(totalLead, totalBooked);

//   const filupBookingRate = calculateFillUpPercentage(
//     booking_target_rate,
//     bookingRate
//   );
//   // console.log(totalBooked);

//   const showing_target_rate = bookingRate * 0.5;

//   const showingRate = calculateFillUpPercentage(totalLead, showingLead);

//   const fillupShowingRate = calculateFillUpPercentage(
//     showing_target_rate,
//     showingRate
//   );
//   // console.log(fillupShowingRate);

//   const close_target_rate = showingRate * 0.25;

//   const closeRate = calculateFillUpPercentage(totalLead, closeLead);

//   const fillupCloseRate = calculateFillUpPercentage(
//     close_target_rate,
//     closeRate
//   );

//   return (
//     <div className="bg-white rounded-md shadow">
//       <h4 className="border-b text-lg font-semibold p-4 text-slate-800">
//         Goal Achievement Summary
//       </h4>

//       <div className="space-y-6 p-4">
//         {/* Total Lead */}
//         <div>
//           <div className="flex items-center justify-between text-sm font-medium">
//             <p className="text-slate-500 text-base">Total Lead</p>{" "}
//             <span className="text-slate-500 font-normal">{totalLead}</span>
//           </div>

//           <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
//             <div
//               className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
//               style={{ width: "100%" }}
//             ></div>
//           </div>
//         </div>

//         {/* Inbound Call Rate */}
//         <div>
//           <div className="flex items-center justify-between text-sm font-medium">
//             <p className="text-slate-500 text-base">Inbound Call Rate %</p>{" "}
//             <span className="text-slate-500 font-normal">
//               {inboundCallRate}%
//             </span>
//           </div>
//           <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
//             <div
//               className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
//               style={{ width: `${inboundPercentage}%` }}
//             ></div>
//           </div>
//           <h6 className="text-xs font-medium text-slate-500">
//             Target: <span className="text-slate-500 font-normal">80%</span>
//           </h6>
//         </div>

//         {/* Conversations Rate  */}
//         <div>
//           <div className="flex items-center justify-between text-sm font-medium">
//             <p className="text-slate-500 text-base">Conversations Rate %</p>{" "}
//             <span className="text-slate-500 font-normal">
//               {conversationRate}%
//             </span>
//           </div>
//           <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
//             <div
//               className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
//               style={{ width: `${filupConversationRate}%` }}
//             ></div>
//           </div>
//           <h6 className="text-xs font-medium text-slate-500">
//             Target:{" "}
//             <span className="text-slate-500 font-normal">
//               &gt;{conversations_target_rate}%
//             </span>
//           </h6>
//         </div>

//         {/* Booking Rate  */}
//         <div>
//           <div className="flex items-center justify-between text-sm font-medium">
//             <p className="text-slate-500 text-base">Booking Rate %</p>{" "}
//             <span className="text-slate-500 font-normal">{bookingRate}%</span>
//           </div>
//           <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
//             <div
//               className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
//               style={{ width: `${filupBookingRate}%` }}
//             ></div>
//           </div>
//           <h6 className="text-xs font-medium text-slate-500">
//             Target:{" "}
//             <span className="text-slate-500 font-normal">
//               &gt;{booking_target_rate}%
//             </span>
//           </h6>
//         </div>

//         {/* Showing Rate  */}
//         <div>
//           <div className="flex items-center justify-between text-sm font-medium">
//             <p className="text-slate-500 text-base">Showing Rate %</p>{" "}
//             <span className="text-slate-500 font-normal">{showingRate}%</span>
//           </div>
//           <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
//             <div
//               className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
//               style={{
//                 width: `${fillupShowingRate > 100 ? 100 : fillupShowingRate}%`,
//               }}
//             ></div>
//           </div>
//           <h6 className="text-xs font-medium text-slate-500">
//             Target:{" "}
//             <span className="text-slate-500 font-normal">
//               &gt;{showing_target_rate}%
//             </span>
//           </h6>
//         </div>

//         {/* Close Rate */}
//         <div>
//           <div className="flex items-center justify-between text-sm font-medium">
//             <p className="text-slate-500 text-base">Close Rate %</p>{" "}
//             <span className="text-slate-500 font-normal">{closeRate}%</span>
//           </div>
//           <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
//             <div
//               className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
//               style={{
//                 width: `${fillupCloseRate > 100 ? 100 : fillupCloseRate}%`,
//               }}
//             ></div>
//           </div>
//           <h6 className="text-xs font-medium text-slate-500">
//             Target:{" "}
//             <span className="text-slate-500 font-normal">
//               &gt;{close_target_rate}%
//             </span>
//           </h6>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoalAchieve;

const GoalAchieve = ({
  totalLead = 0,
  inboundCallRate = 0,
  conversionLead = 0,
  totalBooked = 0,
  showingLead = 0,
  closeLead = 0,
}) => {
  const conversationRate = percentage(conversionLead, totalLead * 0.6);
  const bookingRate = percentage(totalBooked, totalLead * 0.25);

  const showingRate = percentage(showingLead, totalLead * 0.25 * 0.5);
  const closeRate = percentage(closeLead, totalLead * 0.25 * 0.5 * 0.25);
  // const closeRate = percentage(closeLead, totalLead);

  const rows = [
    {
      label: "Inbound Call Rate",
      value: inboundCallRate,
      fill: percentage(inboundCallRate, 80),
      target: 80,
      rate: true,
    },
    {
      label: "Conversation Rate",
      value: conversionLead,
      fill: conversationRate,
      target: Math.round(totalLead * 0.6),
    },
    {
      label: "Booking Rate",
      value: totalBooked,
      fill: bookingRate,
      target: Math.round(totalLead * 0.25),
    },
    {
      label: "Showing Rate",
      value: showingLead,
      fill: showingRate,
      // target: (bookingRate * 0.5).toFixed(2),
      target: Math.round(totalLead * 0.25 * 0.5),
    },
    {
      label: "Close Rate",
      value: closeLead,
      fill: closeRate,
      target: Math.round(totalLead * 0.25 * 0.5 * 0.25),
    },
  ];

  return (
    <div className="bg-white rounded-md shadow pb-4">
      <h4 className="border-b text-lg font-semibold p-4 text-slate-800">
        Goal Achievement Summary
      </h4>

      <div className="space-y-6 p-4">
        {/* Total Lead */}
        <div>
          <div className="flex items-center justify-between text-sm font-medium">
            <p className="text-slate-500 text-base">New Leads</p>
            <span className="text-slate-500 font-normal">{totalLead}</span>
          </div>
          <div className="bg-gray-200 rounded-full w-full h-3 my-2.5">
            <div className="bg-[#10B981] h-full rounded-full w-full" />
          </div>
        </div>

        {rows.map((row, i) => (
          <ProgressRow key={i} {...row} />
        ))}
      </div>
    </div>
  );
};

export default GoalAchieve;
