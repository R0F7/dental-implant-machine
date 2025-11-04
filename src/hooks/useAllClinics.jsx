import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const useAllClinics = (clinics) => {
     console.log(clinics)
  const queries = clinics
    .filter(
      (clinic) =>
        clinic.location_id &&
        (clinic.version || clinic.Version) &&
        (clinic.Authorization || clinic.authorization)
    )
    .map((clinic) => ({
      queryKey: ["clinic", clinic.location_id],
      queryFn: async () => {
        const res = await axios.get(
          `https://services.leadconnectorhq.com/opportunities/search?location_id=${clinic.location_id}&limit=100&page=1`,
          {
            headers: {
              Accept: "application/json",
              Version: clinic.Version || clinic.version,
              Authorization: `Bearer ${clinic.Authorization || clinic.authorization}`,
            },
          }
        );
        return res.data.opportunities;
      },
      staleTime: 5000,
    }));

  const results = useQueries({ queries });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const mergedData = results.flatMap((r) => r.data || []);

  return { mergedData, isLoading, isError };
};

export default useAllClinics;
