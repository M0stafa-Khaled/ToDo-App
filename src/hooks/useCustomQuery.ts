import { useQuery } from "@tanstack/react-query";
import axiosInstanceAPI from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}
const useCustomQuery = ({
  queryKey,
  url,
  config,
}: IAuthenticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstanceAPI.get(url, config);
      return data.todos;
    },
  });
};

export default useCustomQuery;
