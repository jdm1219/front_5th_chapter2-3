import { create } from "zustand"

interface Post {
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

interface PostsStoreState {
  posts: Post[]
  total: number
  selectedPost: Post | null
}

interface PostsStoreAction {
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSelectedPost: (selectedPost: Post) => void
}

export const usePostsStore = create<PostsStoreState & PostsStoreAction>((set) => ({
  posts: [],
  total: 0,
  selectedPost: null,
  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
}))
