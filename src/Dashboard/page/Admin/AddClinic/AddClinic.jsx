import Drawer from "@/component/Drawer/Drawer";
import Input from "@/component/Input/Input";
import Table from "@/component/Table/Table";
import TableHeader from "@/component/TableHeader/TableHeader";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import { clinicInitialValue } from "@/schema/clinic/clinicInitialValues";
import clinicValidationSchema from "@/schema/clinic/clinicValidationSchema";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

const AddClinic = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [initialSchema, setInitialSchema] = useState(clinicInitialValue);
  const axiosSecure = useAxiosSecure();
  const columnHelper = createColumnHelper();
  const { data: clinic, refetch: refetch_clinic } = useGetSecureData(
    "clinics",
    "/clinics"
  );

  const { mutateAsync: add_clinic } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch(
        `/add-clinic?id=${info?._id}`,
        info
      );
      return data;
    },
    onSuccess: () => {
      refetch_clinic();
      toast.success("Clinic added successfully");
    },
  });

  const { mutateAsync: delete_clinic } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/delete-clinic/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch_clinic();
      toast.success("User deleted Successfully");
    },
    onError: () => {
      toast.error("Try again");
    },
  });

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),

    columnHelper.accessor("owner", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "owner",
    }),

    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "email",
    }),

    columnHelper.accessor("Version", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Version",
    }),

    columnHelper.accessor("Authorization", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Authorization",
    }),

    columnHelper.accessor("location_id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "location_id",
    }),

    columnHelper.accessor("adSpend", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ad Spend",
    }),

    columnHelper.accessor("mgmtFee", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "mgmt Fee",
    }),

    columnHelper.accessor("avgTxValue", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "avg Tx Value",
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
              onClick={() => delete_clinic(_id)}
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
    <div className="bg-white w-[calc(100vw-48px)]  md:w-[calc(100vw-130px)] lg:w-full p-6 rounded-md">
      <TableHeader
        label={"clinic"}
        title={"clinic"}
        search={search}
        setSearch={setSearch}
        setOpen={setOpen}
        setInitialSchema={setInitialSchema}
        initialValues={clinicInitialValue}
      ></TableHeader>

      <Table data={clinic} columns={columns}></Table>

      <Drawer name={"clinic"} onClose={() => setOpen(false)} open={open}>
        <div>
          <Formik
            initialValues={initialSchema}
            validateOnChange={true}
            enableReinitialize={true}
            validationSchema={clinicValidationSchema}
            onSubmit={add_clinic}
          >
            {(form) => (
              <Form className="m-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto pb-8">
                <Input
                  form={form}
                  label={"Name"}
                  name={"name"}
                  placeholder={"Enter clinic name"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"Owner"}
                  name={"owner"}
                  placeholder={"Enter clinic owner name"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"Email"}
                  name={"email"}
                  placeholder={"Enter clinic email"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"Timezone"}
                  name={"timezone"}
                  placeholder={"Enter timezone"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"location ID"}
                  name={"location_id"}
                  placeholder={"Enter location Id"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"Version"}
                  name={"Version"}
                  placeholder={"Enter Version date 2028-07-28"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"Authorization"}
                  name={"Authorization"}
                  placeholder={"Enter Authorization token"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"Ad Spend"}
                  name={"adSpend"}
                  placeholder={"Enter adSpend amount"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"MGMT Fee"}
                  name={"mgmtFee"}
                  placeholder={"Enter mgmtFee amount"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"Avg Tx Value"}
                  name={"avgTxValue"}
                  placeholder={"Enter avgTxValue amount"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Button className="w-fit bg-blue-500 hover:bg-blue-600 col-span-3">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Drawer>
    </div>
  );
};

export default AddClinic;
