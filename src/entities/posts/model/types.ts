export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export type NewPost = Pick<Post, "title" | "body" | "userId">

export interface PostsResponse {
  posts: Post[]
  total: number
}

export interface PostsParams {
  limit: number
  skip: number
}
