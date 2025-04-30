export const userQueryKeys = {
  default: ['users'] as const,
  all: () => [...userQueryKeys.default] as const,
  detail: (id: number) => [...userQueryKeys.default, 'detail', id] as const,
} as const;