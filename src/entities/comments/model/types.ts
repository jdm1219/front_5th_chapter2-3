export interface Comment {
  title: string
  body: string
  postId?: number
  userId: number
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
}

export interface NewComment {
  body: string
  postId: number
  userId: number
}
