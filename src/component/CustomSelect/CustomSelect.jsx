import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelect = ({
  id: name,
  data,
  placeholder,
  form,
  handleRoleChange,
}) => {
  const { values, errors, touched, setFieldValue } = form;
  console.log(values[name]);

  return (
    <>
      <Select
        onValueChange={(value) => {
          setFieldValue(name, value);
          handleRoleChange(value);
          setTimeout(() => form.setFieldTouched(name, true), 0);
        }}
        value={values[name]}
      >
        <SelectTrigger id={name} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map((d, idx) => (
            <SelectItem key={idx} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errors[name] && touched[name] && (
        <div className="text-sm text-red-500 mt-1.5">{errors[name]}</div>
      )}
    </>
  );
};

export default CustomSelect;
