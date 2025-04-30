import { create } from "zustand"
import { Post } from "../../../entities/posts/model/types.ts"

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
