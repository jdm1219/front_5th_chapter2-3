import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CommentsResponse, NewComment } from "../../../entities/comments/model/types.ts"
import { commentQueryKeys } from "./queryKeys.ts"
import { commentApi } from "../../../entities/comments/api"
import { CustomUseQueryOptions } from "../../../shared/model/types.ts"

export const useCommentsQuery = (
  postId: number,
  options?: CustomUseQueryOptions<CommentsResponse>
) => {
  return useQuery({
    queryKey: commentQueryKeys.byPost(postId),
    queryFn: () => commentApi.getComments(postId),
    ...options,
  });
};

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: NewComment) => commentApi.addComment(newComment),
    onSuccess: (addedComment) => {
      // 해당 게시물의 댓글 목록 무효화
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.byPost(addedComment.postId)
      });
    },
  });
};

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: Comment) => commentApi.updateComment(comment),
    onSuccess: (updatedComment) => {
      // 개별 댓글 캐시 업데이트
      queryClient.setQueryData(
        commentQueryKeys.detail(updatedComment.id),
        updatedComment
      );

      // 해당 게시물의 댓글 목록 무효화
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.byPost(updatedComment.postId)
      });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: { id: number; postId: number }) => {
      return commentApi.deleteComment(comment.id).then(() => comment);
    },
    onSuccess: (deletedComment) => {
      // 개별 댓글 캐시 제거
      queryClient.removeQueries({
        queryKey: commentQueryKeys.detail(deletedComment.id)
      });

      // 해당 게시물의 댓글 목록 무효화
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.byPost(deletedComment.postId)
      });
    },
  });
};

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; likes: number; postId: number }) => {
      return commentApi.likeComment(params.id, params.likes).then(() => params);
    },
    onSuccess: (params) => {
      // 개별 댓글 캐시 업데이트
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.detail(params.id)
      });

      // 해당 게시물의 댓글 목록 무효화
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.byPost(params.postId)
      });
    },
  });
};