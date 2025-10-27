import * as Yup from "yup";

const rolesValidationSchema = Yup.object({
  name: Yup.string()
    .required("Please enter role name")
    .min(2, "Role name must be at least 2 characters"),
});
export default rolesValidationSchema;
