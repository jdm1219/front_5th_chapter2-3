export interface Comment {
  title: string
  body: string
  postId?: number
  userId: number
}

export interface CommentsResponse {
  body: string
  postId: number
  userId: number
}

export interface NewComment {
  body: string
  postId: number
  userId: number
}
