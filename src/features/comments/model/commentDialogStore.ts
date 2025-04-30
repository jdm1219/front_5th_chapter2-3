import { create } from "zustand/index"

interface DialogStoreState {
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
}

interface DialogStoreAction {
  setShowAddCommentDialog: (showAddDialog: boolean) => void
  setShowEditCommentDialog: (showEditDialog: boolean) => void
}

export const useCommentDialogStore = create<DialogStoreState & DialogStoreAction>((set) => ({
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  setShowAddCommentDialog: (showAddCommentDialog) => set({ showAddCommentDialog }),
  setShowEditCommentDialog: (showEditCommentDialog) => set({ showEditCommentDialog }),
}))
