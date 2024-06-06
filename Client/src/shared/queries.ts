import {
  useQuery as useReactQuery,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";

export const useQuery = <T>(
  key: QueryKey,
  queryFunction: QueryFunction<T>,
  options = {}
) => {
  return useReactQuery<T>({
    queryKey: key,
    queryFn: queryFunction,
    ...options,
  });
};

export const useShopQuery = <T>(
  queryKey: QueryKey,
  path: string,
  enabled: boolean,
  options = {}
) => {
  const { data, isLoading, error } = useQuery<T>(
    queryKey,
    () => apiClient.get(path).then((res) => res.data),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 mins
      cacheTime: 15 * 60 * 1000, // 15 mins
      ...options,
    }
  );

  const isUnauthorized = (error as AxiosError)?.response?.status === 401;

  if (isUnauthorized) {
    global.isAuthorized = false;
  }

  return { data, isLoading, error };
};

// Define the mutation function
const mutationFn =
  <T, Payload>(path: string) =>
  async (payload: Payload): Promise<T> => {
    const res = await apiClient.post<T>(path, payload);
    return res.data;
  };

export const useShopMutation = <T, Payload>(path: string) => {
  const mutation = useMutation<T, AxiosError, Payload>({
    mutationFn: mutationFn<T, Payload>(path),
  });

  return mutation;
};
