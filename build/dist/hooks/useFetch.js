import {useState, useEffect} from "../pkg/react.js";
export default function useFetch(options) {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    (async () => {
      try {
        if (options.url) {
          const request = await fetch(options.url, options);
          const data = await request.json();
          setResponse(data);
        }
      } catch (error2) {
        setError(error2);
      }
    })();
  }, [options.url]);
  return {
    response,
    error
  };
}
