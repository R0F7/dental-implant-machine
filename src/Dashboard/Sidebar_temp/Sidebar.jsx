import MenuItem from "../menuItem/MenuItem";
import { dashboardRoutes } from "../../routes/dashboardRoutes";
import useAuth from "../../hooks/useAuth";
import { IoIosArrowUp } from "react-icons/io";

const Sidebar = ({ toggle }) => {
  const {
    open: { open, id },
    setOpen,
  } = useAuth();

  return (
    <div>
      <div
        className={`fixed ${
          toggle ? "w-20" : "w-64 overflow-hidden"
        } min-h-screen flex flex-col justify-between bg-white shadow-lg transition-all duration-300 ease-in-out `}
      >
        <nav>
          <ul className="space-y-1">
            {dashboardRoutes.map((rout, idx) => (
              <li>
                {rout?.children ? (
                  <div className="flex flex-col w-full relative">
                    <button
                      onClick={() =>
                        setOpen((prev) => ({
                          open: !(prev.open && prev.id === idx),
                          id: idx,
                        }))
                      }
                      className={`text-[#000000E0] flex items-center justify-between px-6 py-2.5 mx-1 mb-1 rounded-lg hover:bg-gray-200 hover:border-white transition duration-300 ${
                        toggle && "group"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <rout.icon></rout.icon>
                        <span
                          className={`text-sm ${
                            toggle ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          {rout.label}
                        </span>
                      </div>
                      <IoIosArrowUp
                        className={`${
                          open && id === idx ? "rotate-180" : "rotate-0"
                        } transition duration-300`}
                      />

                      <ul className="bg-white invisible group-hover:visible absolute z-50 top-0 left-[85px] rounded-md py-2">
                        <li className="">
                          {rout?.children?.map((c, idx) => (
                            <MenuItem
                              key={idx}
                              address={c.path}
                              label={c.label}
                              icon={c.icon}
                              children={"none"}
                            ></MenuItem>
                          ))}
                        </li>
                      </ul>
                    </button>
                    <ul
                      className={`bg-gray-50 overflow-hidden transition-all duration-300 origin-top ${
                        open && id === idx
                          ? "max-h-96 opacity-100 scale-y-100"
                          : "max-h-0 opacity-0 scale-y-95"
                      }`}
                    >
                      {rout?.children?.map((c, idx) => (
                        <li
                          className={`${toggle ? "opacity-0" : "opacity-100"}`}
                        >
                          <MenuItem
                            key={idx}
                            address={c.path}
                            label={c.label}
                            icon={c.icon}
                            children={true}
                          ></MenuItem>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <MenuItem
                    key={idx}
                    address={rout.path}
                    label={rout.label}
                    icon={rout.icon}
                    toggle={toggle}
                  ></MenuItem>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
