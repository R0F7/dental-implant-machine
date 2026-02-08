import MenuItem from "../menuItem/MenuItem";
import { dashboardRoutes } from "../../routes/dashboardRoutes";
import useAuth from "../../hooks/useAuth";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useRef } from "react";

const Sidebar = ({ toggle, setToggle }) => {
  const dropdownRef = useRef(null);
  const {
    open: { open, id },
    setOpen,
    db_user,
    loading,
    isLoading,
  } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isSmallScreen = window.innerWidth < 1024;

      if (
        isSmallScreen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setToggle(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setToggle]);

  if (loading || isLoading) return;

  const perms = db_user?.permissions || {};

  return (
    <div>
      <div
        ref={dropdownRef}
        className={`fixed ${
          toggle
            ? "w-0 md:w-20 overflow-hidden md:overflow-visible"
            : "w-64 overflow-hidden absolute"
        } h-screen flex flex-col justify-between bg-white shadow-lg transition-all duration-300 ease-in-out`}
      >
        <nav>
          <ul className="space-y-1">
            {dashboardRoutes.map((rout, idx) => {
              const canRender =
                (rout.label === "Dashboard" &&
                  (perms.dashboardSubs?.goalAchievement ||
                    perms.dashboardSubs?.masterReportOverview ||
                    perms.dashboardSubs?.leadsOverTime)) ||
                (rout.label === "Master Report" && perms.masterReport) ||
                (rout.label === "Amber Alerts" && perms.amberAlerts) ||
                (rout.label === "Master Dashboard" && perms.masterDashboard) ||
                (rout.label === "KPIs Report" && perms.KPIsReport) ||
                (rout.label === "QC Report" && perms.QCReport) ||
                (rout.label === "CDR Report" && perms.CDRReport) ||
                (rout.label === "Admin" && perms.admin);

              if (!canRender) return null;

              return (
                <li key={idx}>
                  {rout?.children ? (
                    <div className="flex flex-col w-full relative group">
                      <button
                        onClick={() =>
                          setOpen((prev) => ({
                            open: !(prev.open && prev.id === idx),
                            id: idx,
                          }))
                        }
                        className={`text-[#000000E0] flex items-center justify-between px-6 py-2.5 mx-1 mb-1 rounded-lg hover:bg-gray-200 transition duration-300 ${
                          toggle && "justify-center"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <rout.icon />
                          {!toggle && (
                            <span className="text-sm">{rout.label}</span>
                          )}
                        </div>

                        {!toggle && (
                          <IoIosArrowUp
                            className={`${
                              open && id === idx ? "rotate-180" : "rotate-0"
                            } transition duration-300`}
                          />
                        )}
                      </button>

                      {toggle && (
                        <ul className="absolute left-full top-0 ml-2 w-44 py-1 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                          {rout?.children?.map((c, cIdx) => {
                            const canRenderChild =
                              (c.label === "Users" && perms.adminSubs?.users) ||
                              c.label === "Add clinic" ||
                              c.label === "Add url" ||
                              (c.label === "Roles" && perms.adminSubs?.roles) ||
                              (rout.label === "Master Dashboard" &&
                                perms.masterDashboard) ||
                              (c.label === "Row Level Settings" &&
                                perms.adminSubs?.rowLevelSettings);
                            if (!canRenderChild) return null;

                            return (
                              <li key={cIdx}>
                                <MenuItem
                                  address={c.path}
                                  label={c.label}
                                  icon={c.icon}
                                  children={"none"}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {!toggle && (
                        <ul
                          className={`bg-gray-50 overflow-hidden transition-all duration-300 origin-top ${
                            open && id === idx
                              ? "max-h-96 opacity-100 scale-y-100"
                              : "max-h-0 opacity-0 scale-y-95"
                          }`}
                        >
                          {rout?.children?.map((c, cIdx) => {
                            const canRenderChild =
                              (c.label === "Users" && perms.adminSubs?.users) ||
                              c.label === "Add clinic" ||
                              c.label === "Add url" ||
                              (c.label === "Roles" && perms.adminSubs?.roles) ||
                              (c.label === "Row Level Settings" &&
                                perms.adminSubs?.rowLevelSettings);

                            if (!canRenderChild) return null;

                            return (
                              <li key={cIdx}>
                                <MenuItem
                                  address={c.path}
                                  label={c.label}
                                  icon={c.icon}
                                  children={true}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <MenuItem
                      key={idx}
                      address={rout.path}
                      label={rout.label}
                      icon={rout.icon}
                      toggle={toggle}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
