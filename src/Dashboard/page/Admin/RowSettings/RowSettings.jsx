import Drawer from "@/component/Drawer/Drawer";
import PageLocation from "@/component/PageLocation/PageLocation";
import Table from "@/component/Table/Table";
import TableHeader from "@/component/TableHeader/TableHeader";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuUserRound } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { RiAsterisk } from "react-icons/ri";
import { userInitialValues } from "@/schema/user/userInitialValues";
import userValidationSchema from "@/schema/user/userValidationSchema";
import ClientAssignment from "@/component/UserCreateDrawer/ClientAssignment/ClientAssignment";
import { Form, Formik } from "formik";

const RowSettings = () => {
  const columnHelper = createColumnHelper();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [nestedData, setNestedData] = useState(null);
  const [initialSchema, setInitialSchema] = useState(userInitialValues);
  const { data: users, refetch } = useGetSecureData("users", "/users");
  const axiosSecure = useAxiosSecure();

  const handleAccess = (val) => {
    const findUser = users.find((user) => user.email == val);
    setInitialSchema(findUser);
  };

  const { mutateAsync: remove_permission } = useMutation({
    mutationFn: async (params) => {
      const { data } = await axiosSecure.delete(`/remove-client`, {
        data: params,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("permission remove successfully");
      refetch();
    },
    onError: () => toast.error("Try again"),
  });

  const { mutateAsync: update_user } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch("/update-user", info);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("updated Successfully");
    },
    onError: () => toast.error("Try again"),
  });

  const handleRemove = async ({ id, user_id }) => {
    await remove_permission({ id, user_id });

    setNestedData((prev) =>
      prev ? { ...prev, data: prev.data.filter((c) => c.id !== id) } : prev
    );
  };

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

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex gap-2.5 items-center">
            <div className="h-8 w-8 flex items-center justify-center bg-blue-100 rounded-full">
              <LuUserRound />
            </div>
            <div>
              <h4 className="text-[rgb(17,24,39)] font-medium text-sm">
                {row.name}
              </h4>
              <p className="text-sm">{row.email}</p>
            </div>
          </div>
        );
      },
    }),

    columnHelper.accessor("selectedClients", {
      cell: (info) => (
        <div className="text-center">
          <h4 className="text-base font-medium">
            {info.getValue()?.length || 0}
          </h4>{" "}
          <span>clients</span>
        </div>
      ),
      header: "Total Clients",
    }),

    columnHelper.accessor("_id", {
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setInitialSchema(user);
                setOpen(true);
                console.log(user);
              }}
              className="flex items-center gap-1.5 bg-blue-500 text-white rounded-md px-2 py-1 text-sm scale-100 active:scale-95 transition duration-300 hover:bg-blue-400"
            >
              <CiEdit />
              Manage
            </button>

            <button
              onClick={() =>
                setNestedData((prev) =>
                  prev?.row_id == row?.id
                    ? null
                    : {
                        row_id: row.id,
                        data: user.selectedClients?.map((c) => ({
                          ...c,
                          user_id: user._id,
                          createdAt: user.createdAt,
                        })),
                      }
                )
              }
              className="flex items-center gap-1.5 text-blue-500 border border-blue-500 rounded-md px-2 py-1 text-sm scale-100 active:scale-95 transition duration-300 hover:bg-blue-50"
            >
              <FaRegUser />
              View ({user?.selectedClients?.length || 0})
            </button>
          </div>
        );
      },
      header: "Actions",
    }),
  ];

  const columnsZ = [
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Client Name",
    }),

    columnHelper.accessor("id", {
      cell: (info) => <span>ID: {info.getValue()}</span>,
      header: "Client Id",
    }),

    columnHelper.accessor("permission", {
      cell: (info) => {
        const permissions = info.getValue();

        return (
          <div className="flex items-center gap-3">
            {permissions?.read && (
              <button className="border border-green-400 text-green-400 bg-green-50 text-xs rounded-md px-2 py-0.5">
                Read
              </button>
            )}
            {permissions?.write && (
              <button className="border border-blue-400 text-blue-400 bg-blue-50 text-xs rounded-md px-2 py-0.5">
                Write
              </button>
            )}
            {permissions?.delete && (
              <button className="border border-red-400 text-red-400 bg-red-50 text-xs rounded-md px-2 py-0.5">
                Delete
              </button>
            )}
          </div>
        );
      },
      header: "Permissions",
    }),

    columnHelper.accessor("id", {
      cell: ({ row }) => {
        const date = row.original.createdAt;

        return <span>{new Date(date).toLocaleDateString()}</span>;
      },
      header: "Created",
      id: "id",
    }),

    columnHelper.accessor("permission", {
      cell: (info) => {
        const { id, user_id } = info.row.original;

        return (
          <button
            onClick={() => handleRemove({ id, user_id })}
            className="flex items-center gap-1 text-red-400 hover:bg-red-50 border border-accent hover:border-red-400 rounded-md px-1 py-0.5"
          >
            <AiOutlineDelete /> Remove
          </button>
        );
      },
      header: "",
      id: "action",
    }),
  ];

  return (
    <div>
      <PageLocation addresses={["Admin", "Row Level Settings"]}></PageLocation>

      <div className="p-6 w-full bg-white rounded-md">
        <TableHeader
          title={"ROW LEVEL SETTINGS"}
          label={"Setting"}
          setOpen={setOpen}
          search={search}
          setSearch={setSearch}
          initialValues={userInitialValues}
          setInitialSchema={setInitialSchema}
        ></TableHeader>

        <Table
          columns={columns}
          data={filteredClients}
          nestedColumns={columnsZ}
          nestedData={nestedData}
          pagination={true}
        ></Table>

        <Drawer
          name={"Add Row Level Settings"}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="m-4 p-4 bg-white rounded-md shadow-sm">
            <Formik
              initialValues={initialSchema}
              validationSchema={userValidationSchema[4] || null}
              validateOnChange={true}
              enableReinitialize={true}
              onSubmit={({ email, selectedClients }) =>
                update_user({ email, selectedClients })
              }
            >
              {(form) => (
                <Form>
                  <div>
                    <label htmlFor="clients" className="label-inline ">
                      <RiAsterisk size={12} className="text-red-400" />
                      Select User
                    </label>

                    <Select
                      onValueChange={(val) => handleAccess(val)}
                      value={initialSchema.email || ""}
                    >
                      <SelectTrigger id="clients" className="w-full ">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user, idx) => (
                          <SelectItem key={idx} value={user.email}>
                            {user?.name}{" "}
                            <span className="text-gray-600">
                              ({user.email})
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <ClientAssignment
                    form={form}
                    label={"Select Clients"}
                    createUser={false}
                    noticeType={"Summary"}
                    notice={`${
                      form.values?.selectedClients?.length || 0
                    } client(s) assigned with permissions`}
                  ></ClientAssignment>

                  <div className="mt-6 mb-2 space-x-4">
                    <button
                      onClick={() => setOpen(false)}
                      type="button"
                      className="border px-4 py-1.5 rounded-md"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="border px-4 py-1.5 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default RowSettings;
