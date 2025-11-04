import PageLocation from "@/component/PageLocation/PageLocation";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import UserDetails from "./UserDetails/UserDetails";
import ChangePassword from "./ChangePassword/ChangePassword";
import { useState } from "react";

const Profile = () => {
  const { db_user, changePassword } = useAuth();
  const [field, setField] = useState("user_details");
  const axiosSecure = useAxiosSecure();
  const { mutateAsync: update_info } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post("/user/onboard", info);
      return data;
    },
    onSuccess: () => toast.success("update successful"),
    onError: () => toast.error("try again"),
  });

  const handleSubmit = (values) => {
    delete values._id;

    update_info(values);
  };

  const handleChangePassword = async (values, { resetForm }) => {
    const { c_p, n_p } = values;
    const result = await changePassword(c_p, n_p);

    if (result.success) {
      toast.success(result.message);
      resetForm();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className=" min-h-screen">
      <PageLocation addresses={["Profile"]}></PageLocation>

      <div className="p-6 w-full bg-[#F9FAFB]">
        <div className="w-3/5 mx-auto rounded-md">
          <h3 className="text-3xl font-semibold mb-1.5">Profile Settings</h3>
          <p className="font-normal">
            Manage your personal information and account settings.
          </p>

          <div className="mt-6 space-x-4">
            <button
              onClick={() => setField("user_details")}
              className={`py-2 border-b-2 ${field === "user_details" ? "border-blue-500" :"border-none"} cursor-pointer`}
            >
              User Details
            </button>
            <button
              onClick={() => setField("change_password")}
              className={`py-2 border-b-2 ${field !== "user_details" ? "border-blue-500" :"border-none"} cursor-pointer`}
            >
              Change Password
            </button>
          </div>

          {field === "user_details" ? (
            <UserDetails
              db_user={db_user}
              handleSubmit={handleSubmit}
            ></UserDetails>
          ) : (
            <ChangePassword
              handleChangePassword={handleChangePassword}
            ></ChangePassword>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
