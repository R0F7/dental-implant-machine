import { Field, FieldArray, useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiAsterisk } from "react-icons/pi";

const PipelineFieldArray = ({
  name,
  label,
  required = false,
  addButtonText = "Add Pipeline",
}) => {
  const { values, errors, touched } = useFormikContext();

  return (
    <FieldArray name={name}>
      {(helpers) => (
        <div className="space-y-2">
          <label className="label-inline">
            {required && (
              <span className="text-red-500">
                <PiAsterisk size={10} />
              </span>
            )}
            {label}
          </label>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => helpers.push({ name: "", id: "" })}
          >
            + {addButtonText}
          </Button>

          {values[name]?.map((_, i) => {
            const rowTouched = touched?.[name]?.[i];
            const rowError = errors?.[name]?.[i];

            return (
              <div key={i} className="space-y-1">
                <div className="grid grid-cols-12 gap-2">
                  {/* Name */}
                  <div className="col-span-4 space-y-1">
                    <Field
                      as={Input}
                      name={`${name}.${i}.name`}
                      className="h-8 px-2 text-sm"
                      placeholder={`Name #${i + 1}`}
                    />
                    {rowTouched?.name && rowError?.name && (
                      <p className="text-red-500 text-sm">
                        {rowError.name}
                      </p>
                    )}
                  </div>

                  {/* ID */}
                  <div className="col-span-7 space-y-1">
                    <Field
                      as={Input}
                      name={`${name}.${i}.id`}
                      className="h-8 px-2 text-sm "
                      placeholder={`ID #${i + 1}`}
                    />
                    {rowTouched?.id && rowError?.id && (
                      <p className="text-red-500 text-sm">
                        {rowError.id}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => helpers.remove(i)}
                    className="col-span-1"
                  >
                    X
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Array-level error */}
          {typeof errors?.[name] === "string" && (
            <p className="text-red-500 text-sm">
              {errors[name]}
            </p>
          )}
        </div>
      )}
    </FieldArray>
  );
};

export default PipelineFieldArray;
