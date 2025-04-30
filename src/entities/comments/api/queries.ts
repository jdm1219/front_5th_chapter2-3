import { Comment, CommentsResponse, NewComment } from "../model/types.ts"

export const commentApi = {
  getComments: async (postId: number): Promise<CommentsResponse> => {
    const response = await fetch(`/api/comments/post/${postId}`)
    return response.json()
  },

  addComment: async (newComment: NewComment): Promise<Comment> => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    return response.json()
  },

  updateComment: async (comment: Comment): Promise<Comment> => {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: comment.body }),
    })
    return response.json()
  },

  deleteComment: async (id: number): Promise<void> => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  likeComment: async (id: number, likes: number): Promise<void> => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    return response.json()
  }
}