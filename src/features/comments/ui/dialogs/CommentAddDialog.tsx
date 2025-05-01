import React, { useEffect } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../../shared/ui"
import { useCommentsStore } from "../../model/commentStore"
import { useCommentDialogStore } from "../../model/commentDialogStore"
import { useAddCommentMutation } from "../../api/queries.ts"

export const CommentAddDialog: React.FC = () => {
  const newComment = useCommentsStore((state) => state.newComment)
  const { setNewComment, setComments } = useCommentsStore()

  const showAddCommentDialog = useCommentDialogStore((state) => state.showAddCommentDialog)
  const { setShowAddCommentDialog } = useCommentDialogStore()

  const { mutate } = useAddCommentMutation()
  // 댓글 추가
  const addComment = () => {
    mutate(newComment, {
      onSuccess: (data) => {
        setComments((prev) => ({
          ...prev,
          [data.postId]: [...(prev[data.postId] || []), data],
        }))
        setNewComment({ body: "", postId: undefined, userId: 1 })
        setShowAddCommentDialog(false)
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
