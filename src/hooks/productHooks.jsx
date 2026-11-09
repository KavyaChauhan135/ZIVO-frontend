import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/productApi";

export const useProductHooks = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: getProductsApi,
  });

  return {
    data,
    isPending,
    error,
  };
};
