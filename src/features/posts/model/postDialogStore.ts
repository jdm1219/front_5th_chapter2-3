import { create } from "zustand/index"

interface DialogStoreState {
  showPostAddDialog: boolean
  showPostEditDialog: boolean
  showPostDetailDialog: boolean
}

interface DialogStoreAction {
  setShowPostAddDialog: (showAddDialog: boolean) => void
  setShowPostEditDialog: (showEditDialog: boolean) => void
  setShowPostDetailDialog: (showEditDialog: boolean) => void
}

export const usePostDialogStore = create<DialogStoreState & DialogStoreAction>((set) => ({
  showPostAddDialog: false,
  showPostEditDialog: false,
  showPostDetailDialog: false,
  setShowPostAddDialog: (showPostAddDialog) => set({ showPostAddDialog }),
  setShowPostEditDialog: (showPostEditDialog) => set({ showPostEditDialog }),
  setShowPostDetailDialog: (showPostDetailDialog) => set({ showPostDetailDialog }),
}))
