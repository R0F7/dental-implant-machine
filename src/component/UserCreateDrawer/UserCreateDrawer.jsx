import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import userValidationSchema from "../../schema/user/userValidationSchema";
import BasicInfo from "./BasicInfo/BasicInfo";
import AddressInfo from "./AddressInfo/AddressInfo";
import { GiCheckMark } from "react-icons/gi";
import RolesAndPermissions from "./RolesAndPermissions/RolesAndPermissions";
import ClientAssignment from "./ClientAssignment/ClientAssignment";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Drawer from "../Drawer/Drawer";

const UserCreateDrawer = ({ open, onClose, initialValues, refetch_users }) => {
  const [step, setStep] = useState(1);
  const [selectedClients, setSelectedClients] = useState([]);
  const { loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync: create_user } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post("/user/onboard", info);
      return data;
    },
    onSuccess: () => {
      refetch_users();
      onClose();
      toast.success("user created successfully");
    },
  });

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

  const handleNext = async (form) => {
    const valid = await form.validateForm();

    if (Object.keys(valid).length === 0) {
      setStep((prev) => prev + 1);
    } else {
      form.setTouched(
        Object.keys(valid).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
    }
  };

  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleSubmit = async (values) => {
    const full_name = values.first_name + " " + values.last_name;

    const formData = {
      ...values,
      name: full_name,
    };

    try {
      await create_user(formData);
      // resetForm();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  const navOptions = [
    "Basic Information",
    "Address Information",
    "Roles & Permissions",
    "Client Assignment",
  ];

  if (loading) return "Loading...";

  return (
    <Drawer onClose={onClose} open={open} name={"Add User"}>
      <div className="bg-white m-6 p-6 rounded-md shadow-md verflow-y-auto">
        <ul className="flex items-center justify-between md:flex-wrap md:gap-4 lg:flex-nowrap">
          {navOptions.map((option, idx) => (
            <li key={idx} className="flex items-center w-full">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center ${
                    idx + 1 < step
                      ? "bg-[#E6F4FF] text-[rgb(38,102,192)]"
                      : idx + 1 === step
                      ? "bg-blue-500 text-white"
                      : "bg-[#F0F0F0]"
                  } rounded-full text-primary`}
                >
                  {idx + 1 < step ? <GiCheckMark /> : idx + 1}
                </div>
                <h4 className="text-primary font-medium">{option}</h4>
              </div>
              <div
                className={`h-px flex-1 ${
                  idx + 1 < step ? "bg-blue-500" : "bg-gray-200"
                } mx-3`}
              ></div>
            </li>
          ))}
        </ul>
        <Formik
          initialValues={initialValues}
          validationSchema={userValidationSchema[step] || null}
          validateOnChange={true}
          enableReinitialize={true}
          onSubmit={(values, formikHelpers) => {
            if (step < 4) {
              handleNext(formikHelpers);
            } else {
              handleSubmit(values);
              formikHelpers.resetForm();
            }
          }}
        >
          {(form) => (
            <Form className="space-y-3 mt-6 in-h-[572px] flex flex-col justify-between">
              {step === 1 && <BasicInfo form={form} />}
              {step === 2 && <AddressInfo form={form} />}
              {step === 3 && <RolesAndPermissions form={form} />}
              {step === 4 && (
                <ClientAssignment
                  form={form}
                  selectedClients={selectedClients}
                  setSelectedClients={setSelectedClients}
                />
              )}

              <div className="flex items-center justify-between pt-10">
                <div className="space-x-2.5">
                  <button
                    type="button"
                    disabled={step === 1}
                    onClick={handlePrevious}
                    className="h-9 px-4 border rounded-md bg-black/5 text-sm text-[rgb(89,89,89)] font-medium hover:text-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="h-9 px-4 border rounded-md bg-black/5 text-sm text-[rgb(89,89,89)] font-medium hover:text-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm"
                  >
                    Cancel
                  </button>
                </div>

                {step < 4 ? (
                  <button
                    type="submit"
                    className="h-9 px-4 border rounded-md bg-[#52C31A] text-sm text-white font-medium hover:bg-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="h-9 px-4 border rounded-md bg-[#52C31A] text-sm text-white font-medium hover:bg-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm"
                  >
                    Submit
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Drawer>
  );
};

export default UserCreateDrawer;
