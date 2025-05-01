import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../../../entities/posts/api';
import { NewPost, Post, PostsParams, PostsResponse } from "../../../entities/posts/model/types"
import { postQueryKeys } from './queryKeys';
import { CustomUseQueryOptions } from "../../../shared/model/types.ts"

export const usePostsQuery = (
  params: PostsParams,
  options?: CustomUseQueryOptions<PostsResponse>
) => {
  return useQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: () => postApi.getPosts(params),
    ...options,
  });
};

export const useTagsQuery = (options?: CustomUseQueryOptions<string[]>) => {
  return useQuery({
    queryKey: postQueryKeys.tags(),
    queryFn: () => postApi.getTags(),
    ...options,
  });
};

export const usePostsByTagQuery = (
  tag: string,
  options?: CustomUseQueryOptions<PostsResponse>
) => {
  return useQuery({
    queryKey: postQueryKeys.byTag(tag),
    queryFn: () => postApi.getPostsByTag(tag),
    ...options,
  });
};

export const useSearchPostsQuery = (
  searchQuery: string,
  options?: CustomUseQueryOptions<PostsResponse>
) => {
  return useQuery({
    queryKey: postQueryKeys.search(searchQuery),
    queryFn: () => postApi.searchPosts({ searchQuery }),
    enabled: !!searchQuery,
    ...options,
  });
};

export const useAddPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: NewPost) => postApi.addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Post) => postApi.updatePost(post),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(
        postQueryKeys.detail(updatedPost.id),
        updatedPost
      );

      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: (_data, deletedId) => {
      queryClient.removeQueries({ queryKey: postQueryKeys.detail(deletedId) });

      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};