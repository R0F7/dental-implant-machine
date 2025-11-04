import * as Yup from "yup";

const clinicValidationSchema = Yup.object({
  name: Yup.string().required("name required"),
  owner: Yup.string().required("owner required"),
  timezone: Yup.string().required("owner required"),
  location_id: Yup.string().required("location id required"),
  Authorization: Yup.string().required("Authorization token required"),
  Version: Yup.string().required("Version date required"),
  avgTxValue: Yup.string().required("avgTxValue required"),
  mgmtFee: Yup.string().required("mgmtFee required"),
  adSpend: Yup.string().required("adSpend required"),
});

export default clinicValidationSchema;
