import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui"
import { usePostsStore } from "../../model/postsStore.ts"
import { usePostDialogStore } from "../../model/postDialogStore.ts"
import { Highlight } from "../../../../shared/ui/Highlight.tsx"
import { useQueryParamsStore } from "../../model/queryParamsStore.ts"
import { CommentsList } from "../../../comments/ui/CommentsList.tsx"

export const PostDetailDialog: React.FC = () => {
  const selectedPost = usePostsStore((state) => state.selectedPost)
  const searchQuery = useQueryParamsStore((state) => state.searchQuery)

  const showPostDetailDialog = usePostDialogStore((state) => state.showPostDetailDialog)
  const { setShowPostDetailDialog } = usePostDialogStore()

  if (!selectedPost) return null

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <Highlight text={selectedPost.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <Highlight text={selectedPost.body} highlight={searchQuery} />
          </p>
          <CommentsList postId={selectedPost.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
