import React from "react";

const KPI = ({ label, img, value, bg, lifetime_tx_value }) => {
  return (
    <div className="flex bg-white items-center gap-3 h-[125px] px-4 rounded-md shadow">
      <div
        className="h-12 w-12 rounded-full flex items-center justify-center"
        style={{ background: `${bg}` }}
      >
        <img className="w-[50%] h-[50%] rounded-full" src={img} alt="" />
      </div>
      <div>
        <h4 className=" capitalize font-medium text-gray-500">{label}</h4>
        <h1 className="text-3xl font-semibold">{value}</h1>
        {lifetime_tx_value && (
          <p className="text-xs mt-1 font-medium leading-5">
            Lifetime Tx Value <span>{lifetime_tx_value}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default KPI;
