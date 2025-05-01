import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../../shared/ui"
import { useCommentsStore } from "../../model/commentStore"
import { useCommentDialogStore } from "../../model/commentDialogStore"
import { useUpdateCommentMutation } from "../../api/queries.ts"

export const CommentEditDialog: React.FC = () => {
  const selectedComment = useCommentsStore((state) => state.selectedComment)
  const { setSelectedComment, setComments } = useCommentsStore()

  const showEditCommentDialog = useCommentDialogStore((state) => state.showEditCommentDialog)
  const { setShowEditCommentDialog } = useCommentDialogStore()

  const { mutate } = useUpdateCommentMutation()

  if (!selectedComment) return null

  // 댓글 업데이트
  const updateComment = () => {
    mutate(selectedComment, {
      onSuccess: (data) => {
        setComments((prev) => ({
          ...prev,
          [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
        }))
        setShowEditCommentDialog(false)
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
