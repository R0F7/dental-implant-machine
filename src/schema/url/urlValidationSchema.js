import * as Yup from "yup";

export const urlValidationSchema = Yup.object({
  name: Yup.string().required("name required"),
  email: Yup.string().required("email required"),
  url_1: Yup.string().required("url 1 required"),
  url_2: Yup.string().required("url 2 required"),
});
