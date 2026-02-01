import { Field, FieldArray } from "formik";
import React from "react";
import { PiAsterisk } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CalendarID = ({ form }) => {
  return (
    <FieldArray name="calendarID">
      {(helpers) => (
        <div className="space-y-1">
          <label htmlFor="calendarID" className="label-inline">
            <span className="text-red-500">
              <PiAsterisk size={10} />
            </span>
            Calendar ID
          </label>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => helpers.push("")}
          >
            + Add Calendar ID
          </Button>

          {form?.values?.calendarID.map((_, i) => {
            const fieldTouched = form.touched.calendarID?.[i];
            const fieldError = form.errors.calendarID?.[i];

            return (
              <div key={i} className="space-y-1">
                <div className="flex gap-2">
                  <Field
                    as={Input}
                    name={`calendarID.${i}`}
                    placeholder={`Calendar ID #${i + 1}`}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => helpers.remove(i)}
                  >
                    X
                  </Button>
                </div>

                {/* Error directly under input */}
                {fieldTouched && fieldError && (
                  <p className="text-red-500 text-sm">{fieldError}</p>
                )}
              </div>
            );
          })}

          {/* Array-level error (when no role added) */}
          {typeof form.errors.calendarID === "string" && (
            <p className="text-red-500 text-sm">{form.errors.calendarID}</p>
          )}
        </div>
      )}
    </FieldArray>
  );
};

export default CalendarID;
