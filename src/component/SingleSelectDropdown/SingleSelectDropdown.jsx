import { useState } from "react";

const options = [
  "Option One",
  "Option Two",
  "Option Three",
  "Option Four",
  "Option Five",
];

const SingleSelectDropdown = ({options,isOpen,setIsOpen}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative w-64">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left border rounded-md bg-white shadow-sm flex justify-between items-center"
      >
        <span>{selected || "Select an option"}</span>
        <span>▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="dropdown"
                value={option}
                checked={selected === option}
                onChange={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className="accent-blue-600"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelectDropdown;
