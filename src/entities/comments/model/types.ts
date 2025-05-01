export interface Comment {
  id: number
  title: string
  body: string
  postId?: number
  userId: number
  likes: number
  user?: {
    username: string
  }
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
}

export type NewComment = Omit<Comment, "id" | "likes">
