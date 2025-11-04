import { usStates } from "@/data/state";
import { userInitialValues } from "@/schema/user/userInitialValues";
import userValidationSchema from "@/schema/user/userValidationSchema";
import { Form, Formik } from "formik";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "@/component/Input/Input";
import { Button } from "@/components/ui/button";


const UserDetails = ({ db_user, handleSubmit }) => {
  return (
    <div className="bg-white p-6 shadow rounded-md">
      <Formik
        initialValues={db_user || userInitialValues}
        validationSchema={userValidationSchema[1]}
        validateOnChange={true}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(form) => (
          <Form className="grid grid-cols-6 gap-6">
            <Input
              form={form}
              name={"first_name"}
              label={"First Name"}
              placeholder={"Enter your first name"}
              required={true}
              className="col-span-3"
            ></Input>

            <Input
              form={form}
              name={"last_name"}
              label={"Last Name"}
              placeholder={"Enter your last name"}
              required={true}
              className="col-span-3"
            ></Input>

            <Input
              name={"phone"}
              label={"Phone"}
              form={form}
              placeholder={"(555)-555-5555"}
              className="col-span-6"
            ></Input>

            <Input
              form={form}
              label={"Address Line 1"}
              name={"address_line_1"}
              placeholder={"Enter address line 1"}
              className="col-span-6"
            ></Input>

            <Input
              form={form}
              label={"Address Line 2"}
              name={"address_line_2"}
              placeholder={"Enter address line 2"}
              className="col-span-6"
            ></Input>

            <Input
              form={form}
              label={"City"}
              name={"city"}
              placeholder={"Enter City"}
              className="col-span-2"
            ></Input>

            <div className="flex flex-col gap-1.5 col-span-2">
              <label htmlFor="state" className="label-inline">
                State/Province
              </label>

              <Select
                onValueChange={(value) => {
                  form.setFieldValue("province", value);
                }}
                value={form?.values?.province}
              >
                <SelectTrigger id="province" className="w-full">
                  <SelectValue placeholder={"Select state/province"} />
                </SelectTrigger>
                <SelectContent>
                  {usStates.map((d, idx) => (
                    <SelectItem key={idx} value={d.code}>
                      {d.name}({d.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {form.errors.province &&
                (form.touched.province || form.values.province) && (
                  <div className="text-sm text-red-500 mt-1.5">
                    {form.errors.province}
                  </div>
                )}
            </div>

            <Input
              form={form}
              label={"Postal Code"}
              name={"postal_code"}
              placeholder={"Enter postal code (e.g., 12345, K1A 0B1)"}
              className="col-span-2"
            ></Input>

            <div className="text-center col-span-6">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserDetails;
