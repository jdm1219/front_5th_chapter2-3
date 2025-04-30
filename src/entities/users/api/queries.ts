import { User, UsersResponse } from "../model/types.ts"

export const userApi = {
  getUsers: async (): Promise<UsersResponse> => {
    const response = await fetch("/api/users?limit=0&select=username,image")
    if (!response.ok) throw new Error("Failed to fetch comments")
    return response.json()
  },

  getUser: async (userId: number): Promise<User> => {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) throw new Error("Failed to fetch comments")
    return response.json()
  },
}
