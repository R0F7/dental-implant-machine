import CustomSelect from "@/component/CustomSelect/CustomSelect";
import { usStates } from "../../../data/state";
import Input from "../../Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddressInfo = ({ form }) => {
  return (
    <div className="form">
      <Input
        form={form}
        label={"Address Line 1"}
        name={"address_line_1"}
        placeholder={"Enter address line 1"}
      ></Input>

      <Input
        form={form}
        label={"Address Line 2"}
        name={"address_line_2"}
        placeholder={"Enter address line 2"}
      ></Input>

      <Input
        form={form}
        label={"City"}
        name={"city"}
        placeholder={"Enter City"}
      ></Input>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="state" className="label-inline">
          State/Province
        </label>

        <Select
          onValueChange={(value) => {
            form.setFieldValue("province", value);
          }}
          value={form.values.province}
        >
          <SelectTrigger id="province" className="w-full">
            <SelectValue placeholder={"Select state/province"} />
          </SelectTrigger>
          <SelectContent>
            {usStates.map((d, idx) => (
              <SelectItem key={idx} value={d.code}>
                {d.name}({d.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {form.errors.province &&
          (form.touched.province || form.values.province) && (
            <div className="text-sm text-red-500 mt-1.5">
              {form.errors.province}
            </div>
          )}
      </div>

      <Input
        form={form}
        label={"Postal Code"}
        name={"postal_code"}
        placeholder={"Enter postal code (e.g., 12345, K1A 0B1)"}
      ></Input>
    </div>
  );
};

export default AddressInfo;
