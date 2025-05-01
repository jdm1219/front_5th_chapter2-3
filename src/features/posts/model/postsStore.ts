import { create } from "zustand"
import { NewPost, Post, Tag } from "../../../entities/posts/model/types.ts"

interface PostsStoreState {
  posts: Post[]
  total: number
  selectedPost: Post | null
  newPost: NewPost
  tags: Tag[]
}

interface PostsStoreAction {
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSelectedPost: (selectedPost: Post) => void
  setNewPost: (newPost: NewPost) => void
  setTags: (tags: Tag[]) => void
}

export const usePostsStore = create<PostsStoreState & PostsStoreAction>((set) => ({
  posts: [],
  total: 0,
  selectedPost: null,
  newPost: { title: " ", body: "", userId: 1 },
  tags: [],
  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setNewPost: (newPost) => set({ newPost }),
  setTags: (tags) => set({ tags }),
}))
