import percentage from "@/utility/percentage";
import ProgressRow from "../ProgressRow/ProgressRow";

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

      <div className="space-y-4 p-4 pt-0.5">
        {/* Total Lead */}
        <div>
          <div className="flex justify-between text-sm font-medium">
            <p className="text-slate-500 text-base m-0">New Leads</p>
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
