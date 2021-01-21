import { useState } from "react";

const API_PATH = process.env.REACT_APP_API_PATH;

function useMutation(url, method, refetch) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mutate = async ({ variables }) => {
    const options = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    };

    setLoading(true);
    fetch(API_PATH + url, options)
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(() => setLoading(false))
      .then(refetch)
      .catch((err) => setError(err));
  };

  return [mutate, { data, loading, error }];
}

export default useMutation;
