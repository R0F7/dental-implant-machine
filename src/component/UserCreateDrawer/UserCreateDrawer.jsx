import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import userValidationSchema from "../../schema/user/userValidationSchema";
import { userInitialValues } from "../../schema/user/userInitialValues";
import { PiAsterisk } from "react-icons/pi";
import Input from "../Input/Input";
import BasicInfo from "./BasicInfo/BasicInfo";

const UserCreateDrawer = ({ open, onClose }) => {
  // Disable body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values, setSubmitting);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Overlay (40% transparent) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Drawer content (60% width) */}
      <div
        className={`absolute right-0 top-0 h-full bg-[#F5F5F5] w-[63%] shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="">
          <div className="flex items-center gap-2 p-6 bg-white">
            <button onClick={onClose} className="p-0.5 hover:bg-gray-200">
              <RxCross2 ize={21} className="w-6 h-6" />
            </button>{" "}
            <h4
              className="text-[rgb(38,38,38)]
             text-lg font-medium"
            >
              Add User
            </h4>
          </div>

          <div></div>
        </div>

        {/* drawer nav  */}
        <div className="bg-white m-6 p-6 rounded-md shadow-md min-h- verflow-y-auto">
          <ul className="flex items-center justify-between md:flex-wrap md:gap-4 lg:flex-nowrap">
            <li className="flex items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-white">
                  1
                </div>
                <h4 className="text-primary font-medium">Basic Information</h4>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-3"></div>
            </li>

            <li className="flex items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-white">
                  2
                </div>
                <h4 className="text-primary font-medium">
                  Address Information
                </h4>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-3"></div>
            </li>

            <li className="flex items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-white">
                  3
                </div>
                <h4 className="text-primary font-medium">
                  Roles & Permissions
                </h4>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-3"></div>
            </li>

            <li className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-white">
                  4
                </div>
                <h4 className="text-primary font-medium text-nowrap">
                  Client Assignment
                </h4>
              </div>
            </li>
          </ul>

          <Formik
            initialValues={userInitialValues}
            validationSchema={userValidationSchema}
            onSubmit={handleSubmit}
          >
            {(form) => (
              <Form className="space-y-3 mt-6">
                <BasicInfo form={form}></BasicInfo>

                <div className="flex items-center justify-between pt-10">
                  <div className="space-x-2.5">
                    <button className="h-9 px-4 border rounded-md bg-black/5 text-sm text-[rgb(89,89,89)] font-medium hover:text-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm">
                      Previous
                    </button>
                    <button className="h-9 px-4 border rounded-md g-black/5 text-sm text-[rgb(89,89,89)] font-medium hover:text-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm">
                      Cancel
                    </button>
                  </div>

                  <button className="h-9 px-4 border rounded-md bg-[#52C31A] text-sm text-white font-medium hover:bg-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm">
                    Previous
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserCreateDrawer;
