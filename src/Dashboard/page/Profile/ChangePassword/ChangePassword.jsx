import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import * as Yup from "yup";

const ChangePassword = ({ handleChangePassword }) => {
  const [toggle, setToggle] = useState({ id: null, value: false });
  const initialValues = {
    c_p: "",
    n_p: "",
    c_n_p: "",
  };

  const validationSchema = Yup.object({
    c_p: Yup.string().trim().required("Please enter your current password"),
    n_p: Yup.string()
      .trim()
      .required("Please enter a new password")
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    c_n_p: Yup.string()
      .trim()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("n_p"), null], "Passwords must match"),
  });

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form className="space-y-8">
            <div className="relative">
              <Input
                type={toggle.id === 1 && toggle.value ? "text" : "password"}
                id="c_p"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.c_p}
                placeholder="Enter your current password"
                className={`py-4 pl-7 outline-blue-500 ${
                  errors.c_p && (touched.c_p || values.c_p)
                    ? "border-red-500"
                    : ""
                }`}
              />
              <MdLockOutline className="absolute top-1/2 -translate-y-1/2 ml-2.5" />

              <button
                type="button"
                onClick={() => setToggle({ id: 1, value: !toggle.value })}
                className="absolute top-1/2 -translate-y-1/2 right-0 mr-2.5"
              >
                {toggle.id === 1 && toggle.value ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>

              {errors.c_p && (touched.c_p || values.c_p) && (
                <div className="text-sm text-red-500 absolute mt-0.5">
                  {errors.c_p}
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                type={toggle.id === 2 && toggle.value ? "text" : "password"}
                id="n_p"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.n_p}
                placeholder="Enter New Password"
                className={`py-4 pl-7 outline-blue-500 ${
                  errors.n_p && (touched.n_p || values.n_p)
                    ? "border-red-500"
                    : ""
                }`}
              />
              <MdLockOutline className="absolute top-1/2 -translate-y-1/2 ml-2.5" />

              <button
                type="button"
                onClick={() => setToggle({ id: 2, value: !toggle.value })}
                className="absolute top-1/2 -translate-y-1/2 right-0 mr-2.5"
              >
                {toggle.id === 2 && toggle.value ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>

              {errors.n_p && (touched.n_p || values.n_p) && (
                <div className="text-sm text-red-500 absolute mt-0.5">
                  {errors.n_p}
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                type={toggle.id === 3 && toggle.value ? "text" : "password"}
                id="c_n_p"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.c_n_p}
                placeholder="Confirm your new Password"
                className={`py-4 pl-7 outline-blue-500 ${
                  errors.c_n_p && (touched.c_n_p || values.c_n_p)
                    ? "border-red-500"
                    : ""
                }`}
              />
              <MdLockOutline className="absolute top-1/2 -translate-y-1/2 ml-2.5" />

              <button
                type="button"
                onClick={() => setToggle({ id: 3, value: !toggle.value })}
                className="absolute top-1/2 -translate-y-1/2 right-0 mr-2.5"
              >
                {toggle.id === 3 && toggle.value ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>

              {errors.c_n_p && (touched.c_n_p || values.c_n_p) && (
                <div className="text-sm text-red-500 absolute mt-0.5">
                  {errors.c_n_p}
                </div>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="text-white bg-red-500 text-sm font-semibold py-2 px-3 rounded-md shadow">
                Change Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
