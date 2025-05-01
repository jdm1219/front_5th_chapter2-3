import { create } from "zustand"

interface QueryParamsStoreState {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
}

interface QueryParamsStoreAction {
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (searchQuery: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
  setSelectedTag: (selectedTag: string) => void
  resetParams: () => void
  setFromURL: (params: URLSearchParams) => void
}

export const useQueryParamsStore = create<QueryParamsStoreState & QueryParamsStoreAction>((set) => ({
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  selectedTag: "",
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
  resetParams: () =>
    set({
      skip: 0,
      limit: 10,
      searchQuery: "",
      sortBy: "",
      sortOrder: "asc",
      selectedTag: "",
    }),
  setFromURL: (params) =>
    set({
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: (params.get("sortOrder") || "asc"),
      selectedTag: params.get("tag") || "",
    }),
}))
