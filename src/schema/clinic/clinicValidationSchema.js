import * as Yup from "yup";

const clinicValidationSchema = Yup.object({
  name: Yup.string().required("name required"),
  owner: Yup.string().required("owner required"),
  email: Yup.string().required("email required"),
  timezone: Yup.string().required("owner required"),
  location_id: Yup.string().required("location ID required"),
  pipeline_id: Yup.string().required("pipeline ID required"),
  authorization: Yup.string().required("Authorization token required"),
  userID: Yup.string().required("User ID required"),
  Version: Yup.string().required("Version date required"),

  conversion_pipelines: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Pipeline name is required"),
        id: Yup.string().required("Pipeline ID is required"),
      }),
    )
    .min(1, "At least one pipeline is required"),

  booking_pipelines: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Pipeline name is required"),
        id: Yup.string().required("Pipeline ID is required"),
      }),
    )
    .min(1, "At least one pipeline is required"),

  showing_pipelines: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Pipeline name is required"),
        id: Yup.string().required("Pipeline ID is required"),
      }),
    )
    .min(1, "At least one pipeline is required"),

  close_pipelines: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Pipeline name is required"),
        id: Yup.string().required("Pipeline ID is required"),
      }),
    )
    .min(1, "At least one pipeline is required"),
});

export default clinicValidationSchema;
