import { Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar/Sidebar"; //
import Header from "../Dashboard/Header/Header";
import { useState } from "react";;
// import useAuth from "../hooks/useAuth";
 
const DashboardLayout = () => {
  const [toggle, setToggle] = useState(false);
  // const { testAuth, createUser } = useAuth();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;

  //   createUser(email, "123456")
  //     .then(() => {
  //       testAuth(email)
  //         .then(() => {
  //           alert("check your email");
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="min-h-screen flex relative">
      {/* header */}
      <Header toggle={toggle} setToggle={setToggle}></Header>

      {/* sidebar */}
      <div className="mt-[70px]">
        <Sidebar toggle={toggle}></Sidebar>
      </div>

      {/* outlet */}
      <div
        className={`flex-1 p-6 ${
          toggle ? "ml-20" : "ml-64"
        } transition-all duration-300 mt-[65px] bg-[#EEF1F3]`}
      >
        <Outlet></Outlet>

        {/* <form onSubmit={handleSubmit}>
          <input type="email" name="email" id="email" />
          <button type="submit">submit</button>
        </form> */}
      </div>
    </div>
  );
};

export default DashboardLayout;
