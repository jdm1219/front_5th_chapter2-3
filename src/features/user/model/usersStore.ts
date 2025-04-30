import { create } from "zustand"
import { User } from "../../../entities/users/model/types.ts"

interface UsersStoreState {
  selectedUser: User | null
}

interface UsersStoreAction {
  setSelectedUser: (users: User) => void
}

export const useUsersStore = create<UsersStoreState & UsersStoreAction>((set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
