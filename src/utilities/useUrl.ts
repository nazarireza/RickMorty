import { useCallback } from 'react';

export const useUrl = () => {
  const getLastRoute = useCallback((url: string) => {
    const { length, [length - 1]: last } = url.split('/');
    return last;
  }, []);

  return {
    getLastRoute,
  };
};
