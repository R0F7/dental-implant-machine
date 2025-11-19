import Drawer from "@/component/Drawer/Drawer";
import Input from "@/component/Input/Input";
import PageLocation from "@/component/PageLocation/PageLocation";
import Table from "@/component/Table/Table";
import TableHeader from "@/component/TableHeader/TableHeader";
import Textarea from "@/component/Textarea/Textarea";
import PermissionGroup from "@/component/UserCreateDrawer/RolesAndPermissions/PermissionGroup/PermissionGroup";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { roleInitialValues } from "@/schema/role/roleInitialValues";
import CreateRoleDrawer from "./CreateRole/CreateRole";
import rolesValidationSchema from "@/schema/role/rolesValidationSchema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CiEdit, CiLock } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const Roles = () => {
  const columnHelper = createColumnHelper();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const [initialSchema, setInitialSchema] = useState(roleInitialValues);
  const { data: users } = useGetSecureData("all-user", "/users");
  const { data: roles, refetch: refetch_roles } = useGetSecureData(
    "roles",
    `/roles`
  );

  const { mutateAsync: create_role } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch(
        `/create-role?id=${info._id}`,
        info
      );
      return data;
    },
    onSuccess: () => {
      refetch_roles();
      toast.success("Roles created successfully");
    },
    onError: () => {
      toast.error("Try again");
    },
  });

  const { mutateAsync: delete_role } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/delete-role/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch_roles();
      toast.success("Role deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete role. Try again.");
    },
  });

  const filteredRoles = roles.filter((r) => {
    const searchText = search.toString().toLowerCase();

    return (
      r.name.toLowerCase().includes(searchText) ||
      r.description.toLowerCase().includes(searchText)
    );
  });

  const countTruthyFields = (obj) => {
    let count = 0;

    for (const key in obj) {
      const value = obj[key];
      if (key === "admin" || key === "dashboard" || key === "selectAll") continue;

      if (typeof obj[key] === "object" && value !== null) {
        count += countTruthyFields(value);
      } else if (value) {
        count += 1;
      }
    }

    return count;
  };

  const findUserByRole = (role) => {
    const findUser = users.filter(
      (user) => user.role.toLowerCase() === role.toLowerCase()
    );
    return findUser.length || 0;
  };

  const handelSubmit = async (values, { resetForm }) => {
    try {
      await create_role(values);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      header: "Role Name",
    }),

    columnHelper.accessor("description", {
      cell: (info) => <p className="w-[330px]">{info.getValue()}</p>,
      header: "Description",
    }),

    columnHelper.accessor("permissions", {
      cell: (info) => (
        <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-0.5 text-center inline-block">
          {countTruthyFields(info.getValue()) + " Features"}
        </span>
      ),
      header: "permissions",
    }),

    columnHelper.accessor("name", {
      cell: (info) => {
        const role = info.getValue();
        const users = findUserByRole(role);
        return (
          <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-0.5 text-center inline-block font-medium">
            {users + " Users"}
          </span>
        );
      },
      header: "users",
      id: "users",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span>{new Date(info.getValue()).toLocaleDateString("en-GB")}</span>
      ),
      header: "created",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const row = info.row.original;

        return (
          <div className="space-x-2.5">
            <button
              disabled={row.name.toLowerCase() === "admin"}
              onClick={() => {
                setOpen(true);
                setInitialSchema(row);
              }}
              className={`${
                row.name.toLowerCase() === "admin"
                  ? "text-gray-800 cursor-not-allowed"
                  : "text-green-500 hover:bg-green-100"
              } rounded-md p-1`}
            >
              {row.name.toLowerCase() === "admin" ? <CiLock /> : <CiEdit />}
            </button>
            <button
              disabled={row.name.toLowerCase() === "admin"}
              onClick={() => delete_role(row._id)}
              className={`${
                row.name.toLowerCase() === "admin"
                  ? "text-gray-800 cursor-not-allowed"
                  : "text-red-500 hover:bg-red-100"
              } rounded-md p-1`}
            >
              {row.name.toLowerCase() === "admin" ? (
                <CiLock />
              ) : (
                <AiOutlineDelete />
              )}
            </button>
          </div>
        );
      },
      header: "Actions",
    }),
  ];

  return (
    <div>
      <PageLocation addresses={["Admin", "Roles"]}></PageLocation>

      <div className="p-6 w-[calc(100vw-48px)]  md:w-[calc(100vw-130px)] lg:w-full bg-white rounded-md">
        <TableHeader
          title={"ROLES MANAGEMENT"}
          label={"role"}
          search={search}
          setSearch={setSearch}
          setOpen={setOpen}
          setInitialSchema={setInitialSchema}
          initialValues={roleInitialValues}
        ></TableHeader>

        <Table key={"all-roles"} columns={columns} data={filteredRoles}></Table>

        <Drawer name={"Add role"} open={open} onClose={() => setOpen(false)}>
          <Formik
            initialValues={initialSchema}
            validationSchema={rolesValidationSchema}
            enableReinitialize={true}
            validateOnChange={true}
            onSubmit={handelSubmit}
          >
            {(form) => (
              <Form className="space-y-3 m-6 p-6 bg-white rounded-md shadow-sm">
                <Input
                  form={form}
                  label={"Role Name"}
                  name={"name"}
                  placeholder={"Enter role name"}
                  required={true}
                ></Input>

                <Textarea
                  form={form}
                  label={"Description"}
                  name={"description"}
                  placeholder={"Enter role description"}
                ></Textarea>

                <CreateRoleDrawer form={form}></CreateRoleDrawer>

                <div className="text-end space-x-2.5">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="h-9 px-4 border rounded-md bg-black/5 text-sm text-[rgb(89,89,89)] font-medium hover:text-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="h-9 px-4 border rounded-md bg-[#52C31A] text-sm text-white font-medium hover:bg-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Drawer>
      </div>
    </div>
  );
};

export default Roles;
