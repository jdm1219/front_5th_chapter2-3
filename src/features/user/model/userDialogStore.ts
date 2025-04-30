import { create } from "zustand/index"

interface DialogStoreState {
  showUserDialog: boolean
}

interface DialogStoreAction {
  setShowUserDialog: (showAddDialog: boolean) => void
}

export const useUserDialogStore = create<DialogStoreState & DialogStoreAction>((set) => ({
  showUserDialog: false,
  setShowUserDialog: (showUserDialog) => set({ showUserDialog }),
}))
