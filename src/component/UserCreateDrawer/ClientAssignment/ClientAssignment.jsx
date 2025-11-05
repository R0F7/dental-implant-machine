// import ClientSelector from "@/component/ClientSelector/ClientSelector";
// import Notice from "@/component/Notice/Notice";
// import { useEffect, useRef, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";

// const ClientAssignment = ({ selectedClients, setSelectedClients }) => {
//   const [open, setOpen] = useState(false);
//   const [clients, setClients] = useState([]);
//   const dropdownRef = useRef(null);

//   // Demo data
//   useEffect(() => {
//     const demoClients = Array.from({ length: 896 }, (_, i) => ({
//       id: i + 1,
//       name: `Client ${i + 1}`,
//     }));
//     setClients(demoClients);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div>
//       <h4 className="text-gray-900 mb-4 text-lg font-medium">
//         Client Assignment
//       </h4>
//       <h6 className="text-gray-700 mb-2 text-sm font-medium">Assign Clients</h6>

//       <div className="mb-4 relative" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="text-[#595959] font-medium text-sm border px-4 py-1.5 rounded-md flex items-center gap-2"
//         >
//           Select clients for this user
//           <IoIosArrowDown />
//         </button>

//         <div className="absolute top-10 left-0">
//           <ClientSelector
//             open={open}
//             clients={clients}
//             selectedClients={selectedClients}
//             setSelectedClients={setSelectedClients}
//           ></ClientSelector>
//         </div>
//       </div>

//       <Notice>
//         Multiple clients can be assigned to a user. This determines which client
//         data the user can access.
//       </Notice>
//     </div>
//   );
// };

// export default ClientAssignment;

// import ClientSelector from "@/component/ClientSelector/ClientSelector";
// import Notice from "@/component/Notice/Notice";
// import Table from "@/component/Table/Table";
// import { useEffect, useRef, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";

// const ClientAssignment = ({ form }) => {
//   const [open, setOpen] = useState(false);
//   const [clients, setClients] = useState([]);
//   const { values, setFieldValue } = form;
//   const dropdownRef = useRef(null);

//   // Demo client data
//   useEffect(() => {
//     const demoClients = Array.from({ length: 896 }, (_, i) => ({
//       id: i + 1,
//       name: `Client ${i + 1}`,
//     }));
//     setClients(demoClients);
//   }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ Safe handler to update selectedClients
//   const handleSelectClients = (updatedClients) => {
//     if (!Array.isArray(updatedClients)) {
//       updatedClients = [];
//     }
//     setFieldValue("selectedClients", updatedClients);
//   };

//    useEffect(() => {
//     console.log("🟢 Selected Clients:", values.selectedClients);
//   }, [values.selectedClients]);

//   return (
//     <div>
//       <h4 className="text-gray-900 mb-4 text-lg font-medium">
//         Client Assignment
//       </h4>
//       <h6 className="text-gray-700 mb-2 text-sm font-medium">Assign Clients</h6>

//       <div className="mb-4 relative" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="text-[#595959] font-medium text-sm border px-4 py-1.5 rounded-md flex items-center gap-2"
//         >
//           Select clients for this user
//           <IoIosArrowDown />
//         </button>

//         <div className="absolute top-10 left-0 z-50">
//           <ClientSelector
//             open={open}
//             clients={clients}
//             selectedClients={values.selectedClients || []}
//             setSelectedClients={handleSelectClients}
//           />
//         </div>
//       </div>

//       <div>
//         <h4>Client Permissions</h4>
//         {/* <Table columns={} data={}></Table>y */}
//       </div>

//       <Notice>
//         Multiple clients can be assigned to a user. This determines which client
//         data the user can access.
//       </Notice>
//     </div>
//   );
// };

// export default ClientAssignment;
// import ClientSelector from "@/component/ClientSelector/ClientSelector";
// import Notice from "@/component/Notice/Notice";
// import { useEffect, useRef, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";

// const ClientAssignment = ({ form }) => {
//   const [open, setOpen] = useState(false);
//   const [clients, setClients] = useState([]);
//   const dropdownRef = useRef(null);

//   // Demo clients
//   useEffect(() => {
//     const demoClients = Array.from({ length: 896 }, (_, i) => ({
//       id: i + 1,
//       name: `Client ${i + 1}`,
//     }));
//     setClients(demoClients);
//   }, []);

//   // Outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const selectedClients = form.values.selectedClients;

//   return (
//     <div>
//       <h4 className="text-gray-900 mb-4 text-lg font-medium">
//         Client Assignment
//       </h4>
//       <h6 className="text-gray-700 mb-2 text-sm font-medium">Assign Clients</h6>

//       <div className="mb-4 relative" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="text-[#595959] font-medium text-sm border px-4 py-1.5 rounded-md flex items-center gap-2"
//         >
//           Select clients for this user
//           <IoIosArrowDown />
//         </button>

//         <div className="absolute top-10 left-0">
//           <ClientSelector
//             open={open}
//             clients={clients}
//             selectedClients={selectedClients}
//             setSelectedClients={(newClients) =>
//               form.setFieldValue("selectedClients", newClients)
//             }
//           />
//         </div>
//       </div>

//       <Notice>
//         Multiple clients can be assigned to a user. This determines which client
//         data the user can access.
//       </Notice>
//     </div>
//   );
// };

// export default ClientAssignment;

// import ClientSelector from "@/component/ClientSelector/ClientSelector";
// import Notice from "@/component/Notice/Notice";
// import Table from "@/component/Table/Table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { createColumnHelper } from "@tanstack/react-table";
// import React, { useEffect, useRef, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";

// const ClientAssignment = ({ form }) => {
//   const [open, setOpen] = useState(false);
//   const [clients, setClients] = useState([]);
//   const dropdownRef = useRef(null);
//   const columnHelper = createColumnHelper();
//   // const [] = useState([]);

//   // Demo data
//   useEffect(() => {
//     const demoClients = Array.from({ length: 10 }, (_, i) => ({
//       id: i + 1,
//       name: `Client ${i + 1}`,
//     }));
//     setClients(demoClients);
//   }, []);

//   // Outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const [permissions, setPermissions] = useState(
//     clients.reduce((acc, client) => {
//       acc[client.id] = { read: false, write: false, delete: false };
//       return acc;
//     }, {})
//   );

//   const handleChange = (id, type, value) => {
//     setPermissions((prev) => {
//       const updated = {
//         ...prev,
//         [id]: {
//           ...prev[id],
//           [type]: value,
//         },
//       };
//       console.log({
//         id,
//         name: clients.find((c) => c.id === id).name,
//         permission: updated[id],
//       });
//       return updated;
//     });
//   };

//   // console.log(permissions);

//   const columns = [
//     columnHelper.accessor("name", {
//       cell: (info) => <span>{info.getValue()}</span>,
//       header: "Name",
//     }),

//     columnHelper.accessor("id", {
//       cell: (info) => {
//         const id = info.getValue();

//         return (
//           <Checkbox
//             checked={permissions[id]?.read || false}
//             onCheckedChange={(value) => handleChange(id, "read", value)}
//           >
//             Accept Terms
//           </Checkbox>
//         );
//       },
//       header: "Read Access",
//       id: 1,
//     }),

//     columnHelper.accessor("id", {
//       cell: (info) => {
//         const id = info.getValue();

//         return (
//           <Checkbox
//             checked={permissions[id]?.write || false}
//             onCheckedChange={(value) => handleChange(id, "write", value)}
//           >
//             Accept Terms
//           </Checkbox>
//         );
//       },
//       header: "Write Access",
//       id: 2,
//     }),

//     columnHelper.accessor("id", {
//       cell: (info) => {
//         const id = info.getValue();

//         return (
//           <Checkbox
//             checked={permissions[id]?.delete || false}
//             onCheckedChange={(value) => handleChange(id, "delete", value)}
//           >
//             Accept Terms
//           </Checkbox>
//         );
//       },
//       header: "Delete Access",
//       id: 3,
//     }),
//   ];

//   return (
//     <div>
//       <h4 className="text-gray-900 mb-4 text-lg font-medium">
//         Client Assignment
//       </h4>
//       <h6 className="text-gray-700 mb-2 text-sm font-medium">Assign Clients</h6>

//       <div className="mb-4 relative" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="text-[#595959] font-medium text-sm border px-4 py-1.5 rounded-md flex items-center gap-2"
//         >
//           Select clients for this user
//           <IoIosArrowDown />
//         </button>

//         <div className="absolute top-10 left-0">
//           <ClientSelector
//             open={open}
//             clients={clients}
//             selectedClients={form.values.selectedClients || []}
//             // ✅ Formik setter
//             setSelectedClients={(val) =>
//               form.setFieldValue("selectedClients", val)
//             }
//           />
//         </div>
//       </div>

//       {form.values.selectedClients && (
//         <Table data={form.values.selectedClients} columns={columns}></Table>
//       )}

//       <Notice>
//         Multiple clients can be assigned to a user. This determines which client
//         data the user can access.
//       </Notice>
//     </div>
//   );
// };

// export default ClientAssignment;

import ClientSelector from "@/component/ClientSelector/ClientSelector";
import Notice from "@/component/Notice/Notice";
import Table from "@/component/Table/Table";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ClientAssignment = ({
  form,
  label,
  createUser = true,
  noticeType,
  notice,
}) => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const dropdownRef = useRef(null);
  const columnHelper = createColumnHelper();

  // Demo clients
  useEffect(() => {
    const demoClients = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Client ${i + 1}`,
    }));
    setClients(demoClients);
  }, []);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Permission Change
  const handlePermissionChange = (id, type, value) => {
    const updatedClients = form.values.selectedClients.map((client) =>
      client.id === id
        ? {
            ...client,
            permission: {
              ...client.permission,
              [type]: value,
            },
          }
        : client
    );
    form.setFieldValue("selectedClients", updatedClients);
  };

  // Table Columns
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Client Name",
    }),

    columnHelper.accessor("id", {
      id: "read",
      header: "Read Access",
      cell: (info) => {
        const id = info.getValue();
        const client = form.values.selectedClients.find((c) => c.id === id);
        return (
          <Checkbox
            checked={client?.permission?.read || false}
            onCheckedChange={(value) =>
              handlePermissionChange(id, "read", value)
            }
          />
        );
      },
    }),

    columnHelper.accessor("id", {
      id: "write",
      header: "Write Access",
      cell: (info) => {
        const id = info.getValue();
        const client = form.values.selectedClients.find((c) => c.id === id);
        return (
          <Checkbox
            checked={client?.permission?.write || false}
            onCheckedChange={(value) =>
              handlePermissionChange(id, "write", value)
            }
          />
        );
      },
    }),

    columnHelper.accessor("id", {
      id: "delete",
      header: "Delete Access",
      cell: (info) => {
        const id = info.getValue();
        const client = form.values.selectedClients.find((c) => c.id === id);
        return (
          <Checkbox
            checked={client?.permission?.delete || false}
            onCheckedChange={(value) =>
              handlePermissionChange(id, "delete", value)
            }
          />
        );
      },
    }),
  ];

  return (
    <div>
      <h4 className="text-gray-900 mb-4 text-lg font-medium">
        {createUser && "Client Assignment"}
      </h4>
      <h6 className="text-gray-700 mb-2 text-sm font-medium">
        {label ? label : "Assign Clients"}
      </h6>

      {/* Client Selector */}
      <div className="mb-4 relative w-fit" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-[#595959] font-medium text-sm border px-4 py-1.5 rounded-md flex items-center gap-2"
        >
          Select clients for this user
          <IoIosArrowDown />
        </button>

        <div className="absolute top-10 left-0">
          <ClientSelector
            open={open}
            clients={clients}
            selectedClients={form.values.selectedClients || []}
            setSelectedClients={(val) => {
              const updated = val.map((c) => {
                const existing = form.values.selectedClients?.find(
                  (item) => item.id === c.id
                );
                return (
                  existing || {
                    id: c.id,
                    name: c.name,
                    permission: {
                      read: false,
                      write: false,
                      delete: false,
                    },
                  }
                );
              });
              form.setFieldValue("selectedClients", updated);
            }}
          />
        </div>
      </div>

      {/* Table */}
      {form.values.selectedClients?.length > 0 && (
        <div className="mb-6">
          <Table data={form.values.selectedClients} columns={columns} />
        </div>
      )}

      <Notice type={noticeType}>
        {notice
          ? notice
          : `Multiple clients can be assigned to a user. This determines which client
        data the user can access.`}
      </Notice>
    </div>
  );
};

export default ClientAssignment;
