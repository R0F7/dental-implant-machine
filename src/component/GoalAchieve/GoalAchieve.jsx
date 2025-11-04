import React from "react";

const GoalAchieve = () => {
  return (
    <div className="bg-white rounded-md shadow">
      <h4 className="border-b text-lg font-semibold p-4 text-slate-800">
        Goal Achievement Summary
      </h4>
      <div className="space-y-6 p-4">

        <div>
          <div className="flex items-center justify-between text-sm font-medium">
            <p className="text-slate-500 text-base">Avg CPL</p> <span className="text-slate-500 font-normal">$0.00(0%)</span>
          </div>
          <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
            <div
              className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
          <h6 className="text-xs font-medium text-slate-500">Target: <span className="text-slate-500 font-normal">&lt;$50</span></h6>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium">
            <p className="text-slate-500 text-base">Set Rate %</p> <span className="text-slate-500 font-normal">$11.7(78%)</span>
          </div>
          <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
            <div
              className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
              style={{ width: "78%" }}
            ></div>
          </div>
          <h6 className="text-xs font-medium text-slate-500">Target: <span className="text-slate-500 font-normal">$5 - 20%</span></h6>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium">
            <p className="text-slate-500 text-base">Show Rate %</p> <span className="text-slate-500 font-normal">-91.7%(0%)</span>
          </div>
          <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
            <div
              className="bg-[#10B981] absolute top-0 left-0 h-full rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
          <h6 className="text-xs font-medium text-slate-500">Target: <span className="text-slate-500 font-normal">&gt;80%</span></h6>
        </div>
      </div>
    </div>
  );
};

export default GoalAchieve;
