import React from "react";
import { PiAsterisk } from "react-icons/pi";

const Textarea = ({ label, name, rows, cols, placeholder, form, required }) => {
  const { handleChange, handleBlur, values, errors, touched } = form;

  return (
    <div className="w-full space-y-1.5">
      <label htmlFor={name} className="label-inline">
        {required && (
          <span className="text-red-500">
            <PiAsterisk size={10} />
          </span>
        )}
        {label}
      </label>

      <textarea
        id={name}
        rows={rows || "4"}
        cols={cols || "50"}
        name={name}
        placeholder={placeholder || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name] || ""}
        className={`input ${
          errors[name] && (touched[name] || values[name])
            ? "border-red-500"
            : ""
        }`}
      ></textarea>

      {errors[name] && (touched[name] || values[name]) && (
        <div className="text-sm text-red-500">{errors[name]}</div>
      )}
    </div>
  );
};

export default Textarea;
