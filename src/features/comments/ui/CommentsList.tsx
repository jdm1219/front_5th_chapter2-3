import React from "react"
import { Plus, Edit2, Trash2, ThumbsUp } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Highlight } from "../../../shared/ui/Highlight.tsx"
import { useQueryParamsStore } from "../../posts/model/queryParamsStore.ts"
import { useCommentDialogStore } from "../model/commentDialogStore.ts"
import { useCommentsStore } from "../model/commentStore.ts"
import { useDeleteCommentMutation, useLikeCommentMutation } from "../api/queries.ts"

interface CommentsListProps {
  postId: number
}

export const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const comments = useCommentsStore((state) => state.comments[postId])
  const { setNewComment, setSelectedComment, setComments } = useCommentsStore()

  const { setShowAddCommentDialog, setShowEditCommentDialog } = useCommentDialogStore()
  const searchQuery = useQueryParamsStore((state) => state.searchQuery)

  const { mutate: deleteCommentMutate } = useDeleteCommentMutation()
  const { mutate: likeCommentMutate } = useLikeCommentMutation()

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    deleteCommentMutate(
      { id, postId },
      {
        onSuccess: () => {
          setComments((prev) => ({
            ...prev,
            [postId]: prev[postId].filter((comment) => comment.id !== id),
          }))
        },
        onError: (error) => {
          console.error(error)
        },
      },
    )
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    likeCommentMutate(
      {
        id,
        postId,
        likes: comments.find((comment) => comment.id === id)!.likes + 1,
      },
      {
        onSuccess: (data) => {
          setComments((prev) => ({
            ...prev,
            [postId]: prev[postId].map((comment) =>
              comment.id === data.id
                ? {
                    ...comment,
                    likes: comment.likes + 1,
                  }
                : comment,
            ),
          }))
        },
        onError: (error) => {
          console.error(error)
        },
      },
    )
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">
                <Highlight text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
