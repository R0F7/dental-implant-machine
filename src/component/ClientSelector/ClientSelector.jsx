// import { useState } from "react";
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import { FaAngleDown } from "react-icons/fa";
// import { HiOutlineSearch } from "react-icons/hi";
// import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

// const ClientSelector = ({
//   open,
//   clients,
//   selectedClients,
//   setSelectedClients,
// }) => {
//   const [search, setSearch] = useState("");

//   // Filter clients
//   const filteredClients = clients.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Select all toggle
//   const handleSelectAll = () => {
//     if (selectedClients.length === clients.length) {
//       setSelectedClients([]);
//     } else {
//       setSelectedClients(clients.map((c) => c.id));
//     }
//   };

//   const handleSelect = (id) => {
//     setSelectedClients((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div>
//       {/* Dropdown Box */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, scaleY: 0 }}
//             animate={{ opacity: 1, scaleY: 1 }}
//             exit={{ opacity: 0, scaleY: 0 }}
//             transition={{ duration: 0.25 }}
//             style={{ originY: 0 }}
//             className="w-[575px] h-[300px] overflow-y-auto bg-white shadow-xl border rounded-lg p-2 z-50"
//           >
//             {/* Search */}
//             <div className="relative mb-2 m-1">
//               <input
//                 type="search"
//                 placeholder="Search clients..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full h-8 border rounded-md pt-2 pb-3 pl-8 text-sm outline-none placeholder:text-[13px] focus:ring-1 focus:border-transparent focus:ring-[#1677FF] hover:border-[#1677FF] transition duration-150"
//               />
//               <HiOutlineSearch
//                 size={15}
//                 className="absolute top-1/2 -translate-y-1/2 left-2.5"
//               />
//             </div>

//             {/* Select All */}
//             <div className="flex items-center justify-between gap-2 border-b pb-2 mb-2">
//               <div className="w-full">
//                 <CustomCheckbox
//                   checked={selectedClients.length === clients.length}
//                   onChange={handleSelectAll}
//                   label={"Select All"}
//                   selectedClients={selectedClients.length}
//                 ></CustomCheckbox>
//               </div>

//               <span className="text-xs text-gray-500">
//                 {selectedClients.length}/{clients.length}
//               </span>
//             </div>

//             {/* Scrollable Clients List */}
//             <div className="space-y-1">
//               {/* Selected clients */}
//               {selectedClients.length > 0 && (
//                 <>
//                   <p className="text-xs text-gray-500 mb-1">Selected Clients</p>
//                   {filteredClients
//                     .filter((c) => selectedClients.includes(c.id))
//                     .map((client) => (
//                       <CustomCheckbox
//                         checked={selectedClients.includes(client.id)}
//                         onChange={() => handleSelect(client.id)}
//                         label={client.name}
//                       ></CustomCheckbox>
//                     ))}
//                   <hr className="my-2" />
//                 </>
//               )}

//               {/* Unselected clients */}
//               {filteredClients
//                 .filter((c) => !selectedClients.includes(c.id))
//                 .map((client) => (
//                   <CustomCheckbox
//                     checked={selectedClients.includes(client.id)}
//                     onChange={() => handleSelect(client.id)}
//                     label={client.name}
//                   ></CustomCheckbox>
//                 ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ClientSelector;

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { HiOutlineSearch } from "react-icons/hi";
// import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

// const ClientSelector = ({
//   open,
//   clients,
//   selectedClients = [],
//   setSelectedClients,
// }) => {
//   const [search, setSearch] = useState("");

//   // Safe array
//   const safeSelected = Array.isArray(selectedClients)
//     ? selectedClients
//     : [];

//   const filteredClients = clients.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelectAll = () => {
//     if (safeSelected.length === clients.length) {
//       setSelectedClients([]);
//     } else {
//       setSelectedClients(clients.map((c) => c.id));
//     }
//   };

//   const handleSelect = (id) => {
//     const updated = safeSelected.includes(id)
//       ? safeSelected.filter((item) => item !== id)
//       : [...safeSelected, id];
//     setSelectedClients(updated);
//   };

//   return (
//     <div>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, scaleY: 0 }}
//             animate={{ opacity: 1, scaleY: 1 }}
//             exit={{ opacity: 0, scaleY: 0 }}
//             transition={{ duration: 0.25 }}
//             style={{ originY: 0 }}
//             className="w-[575px] h-[300px] overflow-y-auto bg-white shadow-xl border rounded-lg p-2 z-50"
//           >
//             <div className="relative mb-2 m-1">
//               <input
//                 type="search"
//                 placeholder="Search clients..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full h-8 border rounded-md pt-2 pb-3 pl-8 text-sm outline-none placeholder:text-[13px] focus:ring-1 focus:border-transparent focus:ring-[#1677FF]"
//               />
//               <HiOutlineSearch
//                 size={15}
//                 className="absolute top-1/2 -translate-y-1/2 left-2.5"
//               />
//             </div>

//             <div className="flex items-center justify-between gap-2 border-b pb-2 mb-2">
//               <div className="w-full">
//                 <CustomCheckbox
//                   checked={safeSelected.length === clients.length}
//                   onChange={handleSelectAll}
//                   label={"Select All"}
//                 />
//               </div>
//               <span className="text-xs text-gray-500">
//                 {safeSelected.length}/{clients.length}
//               </span>
//             </div>

//             <div className="space-y-1">
//               {filteredClients.map((client) => (
//                 <CustomCheckbox
//                   key={client.id}
//                   checked={safeSelected.includes(client.id)}
//                   onChange={() => handleSelect(client.id)}
//                   label={client.name}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ClientSelector;

// ****
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { HiOutlineSearch } from "react-icons/hi";
// import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

// const ClientSelector = ({
//   open,
//   clients,
//   selectedClients = [],
//   setSelectedClients,
// }) => {
//   const [search, setSearch] = useState("");
//   console.log(clients);

//   // safe selectedClients array
//   const safeSelected = Array.isArray(selectedClients) ? selectedClients : [];

//   // filter clients by search
//   const filteredClients = clients.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // select / deselect all
//   const handleSelectAll = () => {
//     if (safeSelected.length === clients.length) {
//       setSelectedClients([]);
//     } else {
//       setSelectedClients(clients.map((c) => ({ id: c._id, name: c.name })));
//     }
//   };

//   // select / deselect single client
//   const handleSelect = (client) => {
//     const exists = safeSelected.some((item) => item._id === client._id);

//     if (exists) {
//       setSelectedClients(
//         safeSelected.filter((item) => item._id !== client._id)
//       );
//     } else {
//       setSelectedClients([...safeSelected, { id: client._id, name: client.name }]);
//     }
//   };

//   return (
//     <div>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, scaleY: 0 }}
//             animate={{ opacity: 1, scaleY: 1 }}
//             exit={{ opacity: 0, scaleY: 0 }}
//             transition={{ duration: 0.25 }}
//             style={{ originY: 0 }}
//             className="md:w-[575px] h-[300px] overflow-y-auto bg-white shadow-xl border rounded-lg p-2 z-50"
//           >
//             {/* Search */}
//             <div className="relative mb-2 m-1">
//               <input
//                 type="search"
//                 placeholder="Search clients..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full h-8 border rounded-md pt-2 pb-3 pl-8 text-sm outline-none placeholder:text-[13px] focus:ring-1 focus:border-transparent focus:ring-[#1677FF]"
//               />
//               <HiOutlineSearch
//                 size={15}
//                 className="absolute top-1/2 -translate-y-1/2 left-2.5"
//               />
//             </div>

//             {/* Select All */}
//             <div className="flex items-center justify-between gap-2 border-b pb-2 mb-2">
//               <div className="w-full">
//                 <CustomCheckbox
//                   checked={safeSelected.length === clients.length}
//                   onChange={handleSelectAll}
//                   label={"Select All"}
//                 />
//               </div>
//               <span className="text-xs text-gray-500">
//                 {safeSelected.length}/{clients.length}
//               </span>
//             </div>

//             {/* Client list */}
//             <div className="space-y-1">
//               {/* selected clients on top */}
//               {safeSelected.length > 0 && (
//                 <>
//                   <p className="text-xs text-gray-500 mb-1">Selected Clients</p>
//                   {filteredClients
//                     .filter((c) =>
//                       safeSelected.some((item) => item._id === c._id)
//                     )
//                     .map((client) => (
//                       <CustomCheckbox
//                         key={client.id}
//                         checked={safeSelected.some((item) => item._id === client._id)}
//                         onChange={() => handleSelect(client)}
//                         label={client.name}
//                       />
//                     ))}
//                   <hr className="my-2" />
//                 </>
//               )}

//               {/* remaining unselected clients */}
//               {filteredClients
//                 .filter((c) => !safeSelected.some((item) => item._id === c._id))
//                 .map((client) => (
//                   <CustomCheckbox
//                     key={client.id}
//                     checked={safeSelected.some((item) => item.id === client.id)}
//                     onChange={() => handleSelect(client)}
//                     label={client.name}
//                   />
//                 ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ClientSelector;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ClientSelector = ({
  open,
  clients = [],
  selectedClients = [],
  setSelectedClients,
  refetch
}) => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  const safeSelected = Array.isArray(selectedClients)
    ? selectedClients
    : [];

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // React Query mutation (FIXED)
  const { mutateAsync: updateClinicSelected } = useMutation({
    mutationFn: async ({ clinicId, selected }) => {
      const { data } = await axiosSecure.patch("/clinic/select", {
        clinicId,
        selected,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Clinic selection updated");
      refetch()
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update clinic");
    },
  });

  // Select / Deselect All
  const handleSelectAll = async () => {
    const selectAll = safeSelected.length !== clients.length;

    const previous = [...safeSelected];

    // optimistic UI
    const updated = selectAll
      ? clients.map((c) => ({ _id: c._id, name: c.name }))
      : [];

    setSelectedClients(updated);

    try {
      await Promise.all(
        clients.map((c) =>
          updateClinicSelected({
            clinicId: c._id,
            selected: selectAll,
          })
        )
      );
    } catch {
      setSelectedClients(previous);
    }
  };

  // ✅ Single select
  const handleSelect = async (client) => {
    const previous = [...safeSelected];
    const exists = previous.some((i) => i._id === client._id);
    const newSelected = !exists;

    // optimistic UI
    if (newSelected) {
      setSelectedClients([
        ...previous,
        { _id: client._id, name: client.name },
      ]);
    } else {
      setSelectedClients(
        previous.filter((i) => i._id !== client._id)
      );
    }

    try {
      await updateClinicSelected({
        clinicId: client._id,
        selected: newSelected,
      });
    } catch {
      setSelectedClients(previous); // rollback
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.25 }}
          style={{ originY: 0 }}
          className="md:w-[575px] h-[300px] bg-white border rounded-lg shadow-xl p-3 overflow-y-auto"
        >
          {/* Search */}
          <div className="relative mb-3">
            <input
              type="search"
              placeholder="Search clinics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 border rounded-md pl-8 text-sm outline-none focus:ring-1 focus:ring-[#1677FF]"
            />
            <HiOutlineSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
          </div>

          {/* Select All */}
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <CustomCheckbox
              checked={safeSelected.length === clients.length}
              onChange={handleSelectAll}
              label="Select All"
            />
            <span className="text-xs text-gray-500">
              {safeSelected.length}/{clients.length}
            </span>
          </div>

          {/* Selected Clinics */}
          {safeSelected.length > 0 && (
            <>
              <p className="text-xs text-gray-500 mb-1">
                Selected Clinics
              </p>
              {filteredClients
                .filter((c) =>
                  safeSelected.some((s) => s._id === c._id)
                )
                .map((client) => (
                  <CustomCheckbox
                    key={client._id}
                    checked
                    onChange={() => handleSelect(client)}
                    label={client.name}
                  />
                ))}
              <hr className="my-2" />
            </>
          )}

          {/* Unselected Clinics */}
          {filteredClients
            .filter(
              (c) => !safeSelected.some((s) => s._id === c._id)
            )
            .map((client) => (
              <CustomCheckbox
                key={client._id}
                checked={false}
                onChange={() => handleSelect(client)}
                label={client.name}
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClientSelector;

