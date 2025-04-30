export const commentQueryKeys = {
  default: ['comments'] as const,
  all: () => [...commentQueryKeys.default] as const,
  byPost: (postId: number) => [...commentQueryKeys.default, 'post', postId] as const,
  detail: (id: number) => [...commentQueryKeys.default, 'detail', id] as const,
} as const;