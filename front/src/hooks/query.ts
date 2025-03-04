import { useEffect, useState } from 'react';

type IUseQuery<T> = { request: () => Promise<Axios.AxiosXHR<T>>; enabled?: boolean };

const useQuery = <T>({ request, enabled = true }: IUseQuery<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = () => {
    request().then((rq) => {
      if (rq.status >= 400) {
        setError(rq.data.message);
      }
      setData(rq.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (enabled) fetch();
    return;
  }, []);

  return { res: data, isLoading, error, fetch };
};

export { useQuery };
