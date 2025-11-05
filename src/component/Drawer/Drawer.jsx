import { RxCross2 } from "react-icons/rx";

const Drawer = ({ open, onClose, children, name }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>
      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full bg-[#F5F5F5] w-full md:w-[63%] shadow-xl transform transition-transform duration-300 ${
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
              {name}
            </h4>
          </div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
