import { NewPost, Post, PostsParams, PostsResponse } from "../model/types.ts"

export const postApi = {
  getPosts: async ({ limit, skip }: PostsParams): Promise<PostsResponse> => {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    return response.json()
  },

  getPostsByTag: async (tag: string): Promise<PostsResponse> => {
    const response = await fetch(`/api/posts/tag/${tag}`)
    return response.json()
  },

  getTags: async (): Promise<string[]> => {
    const response = await fetch("/api/posts/tags")
    return response.json()
  },

  searchPosts: async ({ searchQuery }: { searchQuery: string }): Promise<PostsResponse> => {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    return response.json()
  },

  addPost: async (newPost: NewPost): Promise<Post> => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    return response.json()
  },

  updatePost: async (post: Post): Promise<Post> => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },

  deletePost: async (id: number): Promise<void> => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },
}
