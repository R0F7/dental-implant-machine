const ProgressRow = ({ label, value, fill, target, rate }) => {
  const width = Math.min(Number(fill), 100);

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-medium">
        <p className="text-slate-500 text-base">{label}</p>
        <span className="text-slate-500 font-normal">
          {value}
          {rate && "%"}
        </span>
      </div>

      <div className="bg-gray-200 rounded-full w-full h-3 my-2.5 relative">
        <div
          className="bg-[#10B981] absolute top-0 left-0  h-full rounded-full"
          style={{ width: `${width}%` }}
        >
          <span className="text-xs font-semibold absolute left-1/2 top-1/2 -translate-y-1/2 text-white">
            {fill}%
          </span>
        </div>
      </div>

      {target && (
        <h6 className="text-xs font-medium text-slate-500">
          Target:{" "}
          <span className="font-normal">
            &gt; {target}
            {rate && "%"}
          </span>
        </h6>
      )}
    </div>
  );
};

export default ProgressRow;
