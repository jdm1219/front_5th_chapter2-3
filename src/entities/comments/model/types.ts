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

export type NewComment = Pick<Comment, "body" | "postId" | "userId">

export interface AddCommentResponse {
  body: string
  id: number
  postId: number
  user: { id: number; username: string; fullName: string }
}
