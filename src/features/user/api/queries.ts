import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { userQueryKeys } from "./queryKeys.ts"
import { userApi } from "../../../entities/users/api"
import { User, UsersResponse } from "../../../entities/users/model/types.ts"

export const useUsersQuery = (
  options?: UseQueryOptions<UsersResponse>
) => {
  return useQuery({
    queryKey: userQueryKeys.all(),
    queryFn: () => userApi.getUsers(),
    ...options,
  });
};

export const useUserQuery = (
  userId: number,
  options?: UseQueryOptions<User>
) => {
  return useQuery({
    queryKey: userQueryKeys.detail(userId),
    queryFn: () => userApi.getUser(userId),
    ...options,
  });
};