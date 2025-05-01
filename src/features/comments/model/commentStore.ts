import { create } from "zustand"
import { Comment, NewComment } from "../../../entities/comments/model/types.ts"


interface CommentsStoreState {
  comments: {
    [postId: string]: Comment[]
  }
  newComment: NewComment
  selectedComment: Comment | null
}

interface CommentsStoreAction {
  setComments: (comments: (currentComment: CommentsStoreState["comments"]) => CommentsStoreState["comments"]) => void
  setNewComment: (comments: (NewComment: CommentsStoreState["newComment"]) => CommentsStoreState["newComment"]) => void
  setSelectedComment: (selectedComment: Comment) => void
}

export const useCommentsStore = create<CommentsStoreState & CommentsStoreAction>((set) => ({
  comments: {},
  newComment: { title: " ", body: "", userId: 1 },
  selectedComment: null,
  setComments: (comments) => {
    set((state) => ({
      comments: typeof comments === "function" ? comments(state.comments) : comments,
    }))
  },
  setNewComment: (newComment) => {
    set((state) => ({
      newComment: typeof newComment === "function" ? newComment(state.newComment) : newComment,
    }))
  },
  setSelectedComment: (selectedComment) => set({ selectedComment }),
}))
