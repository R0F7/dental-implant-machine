import React, { useEffect, useRef, useState } from "react";
import Input from "../../Input/Input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const BasicInfo = ({ form }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close calendar if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="form">
      <Input
        name={"first_name"}
        label={"First Name"}
        form={form}
        placeholder={"Enter first name"}
        required={true}
      ></Input>

      <Input
        name={"last_name"}
        label={"Last Name"}
        form={form}
        placeholder={"Enter last name"}
        required={true}
      ></Input>

      <Input
        name={"email"}
        label={"Email"}
        form={form}
        placeholder={"Enter email address"}
        required={true}
      ></Input>

      <Input
        name={"phone"}
        label={"Phone"}
        form={form}
        placeholder={"(555)-555-5555"}
      ></Input>

      {/* <Input
        label={"Date of Birth"}
        name={"date_of_birth"}
        type={"date"}
        form={form}
        placeholder={"Select date"}
      ></Input> */}

      <div className="relative space-y-1.5" ref={containerRef}>
        <label htmlFor="date_of_birth" className="label-inline">Date of Birth</label>
        <div className="flex items-center rounded-md overflow-hidden">
          <input
            type="text"
            id="date_of_birth"
            className="flex-1 px-3 py-2 outline-none"
            placeholder="Pick a date"
            value={
              form.values.date_of_birth
                ? format(new Date(form.values.date_of_birth), "PPP")
                : ""
            }
            onFocus={() => setOpen(true)}
            readOnly
          />
          <CalendarIcon
            className="absolute right-0 h-5 w-5 text-gray-500 mr-2 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        {open && (
          <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md">
            <Calendar
              mode="single"
              selected={
                form.values.date_of_birth
                  ? new Date(form.values.date_of_birth)
                  : null
              }
              onSelect={(date) => {
                form.setFieldValue("date_of_birth", date); // Formik state updated
                setOpen(false); // close calendar
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              captionLayout="dropdown"
            />
          </div>
        )}
        {form.errors.date_of_birth &&
          (form.touched.date_of_birth || form.values.date_of_birth) && (
            <div className="text-sm text-red-500 mt-1.5">
              {form.errors.date_of_birth}
            </div>
          )}
      </div>

      <div className="flex flex-col justify-between mb-1 h-full">
        <label htmlFor="active" className="label-inline">
          Is Active
        </label>
        <button
          disabled
          className="bg-blue-500 rounded-full text-white text-sm w-fit y-0.5 pl-2 mb-1.5 flex items-center disabled:bg-[#67A6FF] disabled:cursor-not-allowed"
        >
          <span className="px-1">Active</span>{" "}
          <div className="w-4 h-4 rounded-full bg-white m-1"></div>
        </button>
      </div>

      <p className="bg-[rgb(239,246,255)] text-[#1E40AF] text-sm col-span-2 p-3 rounded-md">
        <strong>Note:</strong> A temporary password will be automatically
        generated for this user. The password will be displayed after user
        creation and should be shared with the user securely.
      </p>
    </div>
  );
};

export default BasicInfo;
