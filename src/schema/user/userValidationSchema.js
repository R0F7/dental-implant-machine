import { subYears } from "date-fns";
import * as Yup from "yup";

const userValidationSchema = {
  1: Yup.object({
    first_name: Yup.string()
      .trim()
      .required("First name is required")
      .matches(
        /^[A-Za-z](?:[A-Za-z\s'-]*[A-Za-z])?$/,
        "Only letters (A–Z), spaces, hyphens (-), and apostrophes (') allowed, and must start and end with a letter"
      ),

    last_name: Yup.string()
      .trim()
      .required("Last name is required")
      .matches(
        /^[A-Za-z](?:[A-Za-z\s'-]*[A-Za-z])?$/,
        "Only letters (A–Z), spaces, hyphens (-), and apostrophes (') allowed, and must start and end with a letter"
      ),

    email: Yup.string()
      .trim()
      .required("Email is required")
      .email("Please enter a valid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address."
      ),

    date_of_birth: Yup.date()
      .nullable()
      .notRequired()
      .typeError("Invalid date")
      .max(subYears(new Date(), 18), "You must be at least 18 years old")
      .min(new Date("1900-01-01"), "Date is too far in the past"),
  }),

  2: Yup.object({
    city: Yup.string()
      .min(2, "City name must be at least 2 characters long")
      .matches(
        /^[A-Za-z][A-Za-z\s\-']*[A-Za-z]$/,
        "City name can only contain letters, spaces, hyphens, and apostrophes. Must start and end with a letter."
      ),

    postal_code: Yup.string().test(
      "postal_code",
      "Please enter a valid postal code (US: 12345 or 12345-6789, Canada: K1A 0B1)",
      (value) => {
        if (!value || value.trim() === "") return true;

        const usPattern = /^\d{5}(-\d{4})?$/;
        const canadaPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

        return usPattern.test(value) || canadaPattern.test(value);
      }
    ),
  }),

  3: Yup.object({
    role: Yup.string().required("Role is required"),
    permissions: Yup.object()
      .test(
        "at-least-one",
        "At least one permission must be selected",
        (permissions) => {
          if (!permissions) return false;

          // Check top-level permissions
          const topLevel = [
            "dashboard",
            "admin",
            "amberAlerts",
            "masterReport",
          ];
          const topSelected = topLevel.some((key) => permissions[key]);

          // Check sub-permissions
          const dashboardSubsSelected = Object.values(
            permissions.dashboardSubs || {}
          ).some(Boolean);
          const adminSubsSelected = Object.values(
            permissions.adminSubs || {}
          ).some(Boolean);

          return topSelected || dashboardSubsSelected || adminSubsSelected;
        }
      )
      .required("Permissions are required"),
  }),

  4: Yup.object({}),
};

export default userValidationSchema;
