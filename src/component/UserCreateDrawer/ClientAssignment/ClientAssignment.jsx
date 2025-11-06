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
