import { useState, useEffect } from 'react';

const useGetApiData = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (url) {
      const getApiData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
          const response = await fetch(url);

          if(!response.ok) {
            throw new Error();
          }

          const data = await response.json();
          setData(data);
        } catch (error) {
          setIsError(true);
        }

        setIsLoading(false);
      };

      getApiData();
    }          
  }, [url]);

  return [data, isLoading, isError, setUrl];
};

export default useGetApiData;