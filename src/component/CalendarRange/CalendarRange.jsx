// import React, { useState } from "react";
// import { DateRange } from "react-date-range";
// import { addDays } from "date-fns";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

// const CalendarRange = () => {
//   const [range, setRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: "selection"
//     }
//   ]);

//   const handleClear = () => {
//     setRange([
//       {
//         startDate: null,
//         endDate: null,
//         key: "selection"
//       }
//     ]);
//   };

//   const handleConfirm = () => {
//     console.log("Start:", range[0].startDate);
//     console.log("End:", range[0].endDate);
//     alert("Date range confirmed ✅");
//   };

//   return (
//     <div style={{ border: "1px solid #ddd", width: "fit-content" }}>
//       <DateRange
//         ranges={range}
//         onChange={(item) => setRange([item.selection])}
//         months={2}
//         direction="horizontal"
//         showDateDisplay={false}
//         moveRangeOnFirstSelection={false}
//       />

//       {/* Footer buttons (Clear & Confirm) */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: "10px",
//           padding: "10px",
//           borderTop: "1px solid #eee"
//         }}
//       >
//         <button onClick={handleClear}>Clear</button>
//         <button
//           onClick={handleConfirm}
//           style={{
//             background: "#1677ff",
//             color: "#fff",
//             border: "none",
//             padding: "6px 14px",
//             borderRadius: "4px"
//           }}
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CalendarRange;

// ***
// import { DatePicker, Button } from "antd";
// import { useState } from "react";
// import "antd/dist/reset.css";

// const { RangePicker } = DatePicker;

// const CalendarRange = () => {
//   const [tempValue, setTempValue] = useState(null);
//   const [value, setValue] = useState(null);
//   const [open, setOpen] = useState(false);

//   return (
//     <RangePicker
//       open={open}
//       value={tempValue}
//       format="DD-MM-YYYY"
//       onCalendarChange={(val) => {
//         setTempValue(val);
//       }}
//       onOpenChange={(o) => {
//         // auto close completely block
//         if (!o) return;
//         setOpen(true);
//       }}
//       onClick={() => setOpen(true)}
//       panelRender={(panel) => (
//         <div>
//           {panel}

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 8,
//               padding: "8px 12px",
//               borderTop: "1px solid #f0f0f0",
//               background: "#fff",
//             }}
//           >
//             <Button
//               size="small"
//               onClick={() => {
//                 setTempValue(null);
//                 setValue(null);
//                 setOpen(false); // ✅ close only here
//               }}
//             >
//               Clear
//             </Button>

//             <Button
//               size="small"
//               type="primary"
//               disabled={!tempValue || !tempValue[0] || !tempValue[1]}
//               onClick={() => {
//                 setValue(tempValue);
//                 setOpen(false); // ✅ close only here
//               }}
//             >
//               Confirm
//             </Button>
//           </div>
//         </div>
//       )}
//     />
//   );
// };

// export default CalendarRange;

// ****
// import { DatePicker, Button } from "antd";
// import { useEffect, useRef, useState } from "react";
// import "antd/dist/reset.css";

// const { RangePicker } = DatePicker;

// const CalendarRange = ({ range, setRange }) => {
//   const [tempValue, setTempValue] = useState([]);
//   // const [value, setValue] = useState(null);
//   const [open, setOpen] = useState(false);

//   const isCalendarAction = useRef(false);
//   return (
//     <RangePicker
//       open={open}
//       value={tempValue}
//       format="DD-MM-YYYY"
//       onClick={() => setOpen(true)}
//       onCalendarChange={(val) => {
//         isCalendarAction.current = true;
//         setTempValue(val);
//       }}
//       onOpenChange={(o) => {
//         if (!o) {
//           // outside click / esc
//           if (isCalendarAction.current) {
//             isCalendarAction.current = false;
//             setOpen(true); // block close for calendar action
//             return;
//           }
//           setOpen(false); // ✅ allow outside click
//           return;
//         }
//         setOpen(true);
//       }}
//       panelRender={(panel) => (
//         <div>
//           {panel}

//           <div className="flex justify-end gap-2 py-2 px-3 border-t bg-white">
//             <Button
//               size="small"
//               onClick={() => {
//                 setTempValue(null);
//                 setRange(null);
//                 setOpen(false);
//               }}
//             >
//               Clear
//             </Button>

//             <Button
//               size="small"
//               type="primary"
//               disabled={!tempValue || !tempValue[0] || !tempValue[1]}
//               onClick={() => {
//                 // setValue(tempValue);
//                 setRange([
//                   {
//                     startDate: tempValue[0].$d,
//                     endDate: tempValue[1].$d,
//                   },
//                 ]);
//                 setOpen(false);
//               }}
//             >
//               Confirm
//             </Button>
//           </div>
//         </div>
//       )}
//     />
//   );
// };

// export default CalendarRange;

import { DatePicker, Button } from "antd";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import "antd/dist/reset.css";

const { RangePicker } = DatePicker;

const CalendarRange = ({ range, setRange }) => {
  const [tempValue, setTempValue] = useState(() => {
    if (!range?.[0]) return [];
    return [
      dayjs(range[0].startDate),
      dayjs(range[0].endDate),
    ];
  });

  const [open, setOpen] = useState(false);
  const isCalendarAction = useRef(false);

  return (
    <RangePicker
    getPopupContainer={(trigger) => trigger.parentElement}
      open={open}
      value={tempValue}
      format="DD-MM-YYYY"
      onClick={() => setOpen(true)}
      onCalendarChange={(val) => {
        isCalendarAction.current = true;
        setTempValue(val);
      }}
      onOpenChange={(o) => {
        if (!o) {
          if (isCalendarAction.current) {
            isCalendarAction.current = false;
            setOpen(true);
            return;
          }
          setOpen(false);
          return;
        }
        setOpen(true);
      }}
      panelRender={(panel) => (
        <div>
          {panel}

          <div className="flex justify-end gap-2 py-2 px-3 border-t bg-white">
            <Button
              size="small"
              onClick={() => {
                setTempValue([]);
                setRange(range);
                setOpen(false);
              }}
            >
              Clear
            </Button>

            <Button
              size="small"
              type="primary"
              disabled={!tempValue?.[0] || !tempValue?.[1]}
              onClick={() => {
                setRange([
                  {
                    startDate: tempValue[0].toDate(),
                    endDate: tempValue[1].toDate(),
                    key: "selection",
                  },
                ]);
                setOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    />
  );
};

export default CalendarRange;
