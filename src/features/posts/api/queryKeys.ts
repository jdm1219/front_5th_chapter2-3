import { PostsParams } from "../../../entities/posts/model/types.ts"

export const postQueryKeys = {
  default: ['posts'] as const,
  lists: () => [...postQueryKeys.default, 'list'] as const,
  list: (params: PostsParams) => [...postQueryKeys.lists(), params] as const,
  tags: () => [...postQueryKeys.default, 'tags'] as const,
  search: (query: string) => [...postQueryKeys.default, 'search', query] as const,
  byTag: (tag: string) => [...postQueryKeys.default, 'tag', tag] as const,
  detail: (id: number) => [...postQueryKeys.default, 'detail', id] as const,
} as const;
