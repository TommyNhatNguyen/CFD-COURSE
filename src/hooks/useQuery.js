import { useEffect, useState } from "react";

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, dependencies);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await promise();
      setData(res?.data?.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, refetch: fetchData };
};

export default useQuery;
