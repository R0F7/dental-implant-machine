import { cn } from "@/lib/utils";
import React from "react";
import { PiAsterisk } from "react-icons/pi";

const Input = ({
  label,
  name,
  type,
  placeholder,
  form,
  required,
  className,
}) => {
  const { handleChange, handleBlur, values, errors, touched } = form;

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <label htmlFor={name} className="label-inline">
        {required && (
          <span className="text-red-500">
            <PiAsterisk size={10} />
          </span>
        )}
        {label}
      </label>

      <input
        id={name}
        type={type || "text"}
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
      />

      {errors[name] && (touched[name] || values[name]) && (
        <div className="text-sm text-red-500">{errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
