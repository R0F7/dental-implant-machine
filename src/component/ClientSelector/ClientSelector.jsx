import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const ClientSelector = ({
  open,
  clients,
  selectedClients = [],
  setSelectedClients,
}) => {
  const [search, setSearch] = useState("");

  // safe selectedClients array
  const safeSelected = Array.isArray(selectedClients) ? selectedClients : [];

  // filter clients by search
  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  // select / deselect all
  const handleSelectAll = () => {
    if (safeSelected.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(
        clients.map((c) => ({ id: c.id, name: c.name, email: c.email,userID:c.userID ,booking_pipelines: c.booking_pipelines,})),
      );
    }
  };

  // select / deselect single client
  const handleSelect = (client) => {
    const exists = safeSelected.some((item) => item.id === client.id);

    if (exists) {
      setSelectedClients(safeSelected.filter((item) => item.id !== client.id));
    } else {
      setSelectedClients([
        ...safeSelected,
        { id: client.id, name: client.name,email: client.email,userID:client.userID,booking_pipelines: client.booking_pipelines, },
      ]);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.25 }}
            style={{ originY: 0 }}
            className="md:w-[575px] h-[300px] overflow-y-auto bg-white shadow-xl border rounded-lg p-2 z-50"
          >
            {/* Search */}
            <div className="relative mb-2 m-1">
              <input
                type="search"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-8 border rounded-md pt-2 pb-3 pl-8 text-sm outline-none placeholder:text-[13px] focus:ring-1 focus:border-transparent focus:ring-[#1677FF]"
              />
              <HiOutlineSearch
                size={15}
                className="absolute top-1/2 -translate-y-1/2 left-2.5"
              />
            </div>

            {/* Select All */}
            <div className="flex items-center justify-between gap-2 border-b pb-2 mb-2">
              <div className="w-full">
                <CustomCheckbox
                  checked={safeSelected.length === clients.length}
                  onChange={handleSelectAll}
                  label={"Select All"}
                />
              </div>
              <span className="text-xs text-gray-500">
                {safeSelected.length}/{clients.length}
              </span>
            </div>

            {/* Client list */}
            <div className="space-y-1">
              {/* selected clients on top */}
              {safeSelected.length > 0 && (
                <>
                  <p className="text-xs text-gray-500 mb-1">Selected Clients</p>
                  {filteredClients
                    .filter((c) =>
                      safeSelected.some((item) => item.id === c.id),
                    )
                    .map((client) => (
                      <CustomCheckbox
                        key={client.id}
                        checked={safeSelected.some(
                          (item) => item.id === client.id,
                        )}
                        onChange={() => handleSelect(client)}
                        label={client.name}
                      />
                    ))}
                  <hr className="my-2" />
                </>
              )}

              {/* remaining unselected clients */}
              {filteredClients
                .filter((c) => !safeSelected.some((item) => item.id === c.id))
                .map((client) => (
                  <CustomCheckbox
                    key={client.id}
                    checked={safeSelected.some((item) => item.id === client.id)}
                    onChange={() => handleSelect(client)}
                    label={client.name}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientSelector;
