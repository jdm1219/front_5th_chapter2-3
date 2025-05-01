import { create } from "zustand"
import { Comment } from "../../../entities/comments/model/types.ts"

interface CommentsStoreState {
  comments: {
    [postId: string]: Comment[]
  }
  newComment: Comment
  selectedComment: Comment | null
}

interface CommentsStoreAction {
  setComments: (comments: (currentComment: CommentsStoreState["comments"]) => CommentsStoreState["comments"]) => void
  setNewComment: (comments: Comment) => void
  setSelectedComment: (selectedComment: Comment) => void
}

export const useCommentsStore = create<CommentsStoreState & CommentsStoreAction>((set) => ({
  comments: {},
  newComment: { title: " ", body: "", userId: 1 },
  selectedComment: null,
  setComments: (comments) => {
    set((state) => ({
      comments:
        typeof comments === 'function'
          ? comments(state.comments)
          : comments,
    }))
  },
  setNewComment: (newComment) => set({ newComment }),
  setSelectedComment: (selectedComment) => set({ selectedComment }),
}))
