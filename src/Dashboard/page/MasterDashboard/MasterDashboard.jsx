import useGetSecureData from "@/hooks/useGetSecureData";
import React, { useState } from "react";
import Loading from "../Loading/Loading";

const MasterDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { data, isLoading } = useGetSecureData("all-url", "all-url");

  if (isLoading || !data || data.length === 0) {
    return <Loading />;
  }

  return (
    <div className="h-screen">
      {loading && <Loading />}

      {/* url 2 */}
      <iframe
        width="100%"
        height="100%"
        src={data[0].url_2}
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
};

export default MasterDashboard;
