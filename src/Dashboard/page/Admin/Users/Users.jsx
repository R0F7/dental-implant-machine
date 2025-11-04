import React, { useState } from "react";
import PageLocation from "../../../../component/PageLocation/PageLocation";
import Table from "../../../../component/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import UserCreateDrawer from "../../../../component/UserCreateDrawer/UserCreateDrawer";
import useGetSecureData from "@/hooks/useGetSecureData";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { userInitialValues } from "@/schema/user/userInitialValues";
import TableHeader from "@/component/TableHeader/TableHeader";

const Users = () => {
  const columnHelper = createColumnHelper();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const [initialSchema, setInitialSchema] = useState(userInitialValues);
  const { data: users, refetch: refetch_users } = useGetSecureData(
    "users",
    `/users`
  );

  const filteredClients = users.filter((c) => {
    const searchText = search.toLowerCase();

    return (
      c.name.toLowerCase().includes(searchText) ||
      c.email.toLowerCase().includes(searchText) ||
      c.role.toLowerCase().includes(searchText) ||
      c.phone.includes(searchText) ||
      c.city.toLowerCase().includes(searchText) ||
      c.province.toLowerCase().includes(searchText)
    );
  });

  const { mutateAsync: user_delete } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/delete-user/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch_users();
      toast.success("User deleted Successfully");
    },
    onError: () => {
      toast.error("Try again");
    },
  });

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div>
            <h4 className="text-[rgb(17,24,39)] font-medium text-sm">
              {row.name}
            </h4>
            <p className="text-sm">{row.email}</p>
          </div>
        );
      },
      header: "Name",
    }),

    columnHelper.accessor("role", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Role",
    }),

    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "phone",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-0.5">
            <h6>{row.city}</h6>
            <span>, </span>
            <span>{row.province}</span>
          </div>
        );
      },
      header: "Location",
      id: "location",
    }),

    columnHelper.accessor("status", {
      cell: (info) =>
        info.getValue() && (
          <span className="border border-green-300 text-xs px-3 py-1.5 rounded-md bg-[#F6FFED] text-green-400">
            Active
          </span>
        ),
      header: "Status",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span>{new Date(info.getValue()).toLocaleDateString()}</span>
      ),
      header: "Created",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const { _id, ...data } = info.row.original;

        return (
          <div className="space-x-2.5">
            <button
              onClick={() => {
                setOpen(true);
                setInitialSchema(data);
              }}
              className="text-green-500 hover:bg-green-100 rounded-md p-1"
            >
              <CiEdit />
            </button>
            <button
              onClick={() => user_delete(_id)}
              className="text-red-500 hover:bg-red-100 rounded-md p-1"
            >
              <AiOutlineDelete />
            </button>
          </div>
        );
      },
      header: "Actions",
      id: "action",
    }),
  ];

  return (
    <div className="">
      <PageLocation addresses={["Admin", "Users"]}></PageLocation>

      <div className="p-6 w-full bg-white rounded-md">
        <TableHeader
          title={"users"}
          label={"user"}
          search={search}
          setSearch={setSearch}
          setOpen={setOpen}
          setInitialSchema={setInitialSchema}
          initialValues={userInitialValues}
        ></TableHeader>

        <Table
          key={"all-users"}
          columns={columns}
          data={filteredClients}
        ></Table>

        <UserCreateDrawer
          open={open}
          onClose={() => setOpen(false)}
          refetch_users={refetch_users}
          initialValues={initialSchema}
        ></UserCreateDrawer>
      </div>
    </div>
  );
};

export default Users;
