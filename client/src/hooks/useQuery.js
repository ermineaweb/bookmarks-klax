import { useCallback, useEffect, useState } from "react";

const API_PATH = process.env.REACT_APP_API_PATH;

function useQuery(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    fetch(API_PATH + url)
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

export default useQuery;
