import Drawer from "@/component/Drawer/Drawer";
import Input from "@/component/Input/Input";
import Table from "@/component/Table/Table";
import TableHeader from "@/component/TableHeader/TableHeader";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import { urlInitialVAlue } from "@/schema/url/urlInitialValue";
import { urlValidationSchema } from "@/schema/url/urlValidationSchema";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

const AddUrl = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [initialSchema, setInitialSchema] = useState(urlInitialVAlue);
  const axiosSecure = useAxiosSecure();
  const { data: all_url, refetch: refetch_url } = useGetSecureData(
    "all-url",
    "/all-url"
  );
  const columnHelper = createColumnHelper();

  const { mutateAsync: add_url } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch(
        `/add-url?id=${info?._id}`,
        info
      );
      return data;
    },
    onSuccess: () => {
      refetch_url();
      toast.success("Url added successfully");
      setOpen(false)
    },
  });

    const { mutateAsync: delete_url } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/delete-url/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch_url();
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
    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "email",
    }),
    columnHelper.accessor("url_1", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "url_1",
    }),
    columnHelper.accessor("url_2", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "url_2",
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
                onClick={() => delete_url(_id)}
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
    <div>
      <TableHeader
        label={"URL"}
        title={"Url"}
        search={search}
        setSearch={setSearch}
        setOpen={setOpen}
        setInitialSchema={setInitialSchema}
        initialValues={urlInitialVAlue}
      ></TableHeader>

      <Table data={all_url} columns={columns}></Table>

      <Drawer name={"URL"} onClose={() => setOpen(false)} open={open}>
        <div>
          <Formik
            initialValues={initialSchema}
            validateOnChange={true}
            enableReinitialize={true}
            validationSchema={urlValidationSchema}
            onSubmit={add_url}
          >
            {(form) => (
              <Form className="m-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto pb-8">
                <Input
                  form={form}
                  label={"Name"}
                  name={"name"}
                  placeholder={"Enter name"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"Email"}
                  name={"email"}
                  type={"email"}
                  placeholder={"Enter email"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Input
                  form={form}
                  label={"URL_1"}
                  name={"url_1"}
                  placeholder={"Enter url_1"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>
                <Input
                  form={form}
                  label={"URL_2"}
                  name={"url_2"}
                  placeholder={"Enter url_2"}
                  required={true}
                  className="col-span-3 md:col-span-1"
                ></Input>

                <Button
                  type="submit"
                  className="w-fit col-span-3 bg-blue-500 hover:bg-blue-600"
                >
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

export default AddUrl;
