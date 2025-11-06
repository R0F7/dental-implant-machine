import React, { useState } from "react";
import bg from "../assets/log-in-bg.jpg";
import logo from "../assets/dental-image-removebg-preview.png";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AiOutlineUser } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import loginValidationSchema from "@/schema/login/loginValidationSchema";
import toast from "react-hot-toast";

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { signIn, sendPassMail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";

  const loginInitialValues = {
    email: "",
    password: null,
  };

  const handleSubmit = async ({ email, password }) => {
    console.log(email, password);
    setErrMsg("");

    try {
      await signIn(email, password);
      navigate(from);
    } catch (error) {
      setErrMsg(error.message.split("/")[1].replace(")", ""));
    }
  };

  const handleForgotPass = async () => {
    const email = document.getElementById("email").value;

    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      await sendPassMail(email);
      toast.success("Password reset link sent! Check your email inbox.");
    } catch (error) {
      console.error("Error sending reset email:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with that email.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white rounded-lg shadow-xl w-[350px] lg:w-[512px]">
        <div className="flex flex-col items-center mb- border-b pt-6 pb-3">
          <img
            src={logo}
            alt="Dental Implant Machine Logo"
            className="h-20 w mb-3"
          />
        </div>

        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          validateOnChange={true}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form className="p-6 space-y-7">
              <h2 className="text-gray-600 text-center mb-6">
                Please login to your account
              </h2>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                  className={`lg:py-6 pl-7 ${
                    errors.email && (touched.email || values.email)
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <AiOutlineUser className="absolute top-1/2 -translate-y-1/2 ml-2.5" />

                {errors.email && (touched.email || values.email) && (
                  <div className="text-sm text-red-500 absolute">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  type={toggle ? "text" : "password"}
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                  className={`lg:py-6 pl-7 ${
                    errors.password && (touched.password || values.password)
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <MdLockOutline className="absolute top-1/2 -translate-y-1/2 ml-2.5" />

                <button
                  type="button"
                  onClick={() => setToggle(!toggle)}
                  className="absolute top-1/2 -translate-y-1/2 right-0 mr-2.5"
                >
                  {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>

                {errors.password && (touched.password || values.password) && (
                  <div className="text-sm text-red-500 absolute">
                    {errors.password}
                  </div>
                )}
              </div>

              {errMsg && (
                <p className="bg-red-100 text-red-600 text-xs font-medium p-3 rounded-sm shadow">
                  {errMsg}
                </p>
              )}

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <Checkbox id="remember" defaultChecked />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={handleForgotPass}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 scale-100 active:scale-95 transition duration-300"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
