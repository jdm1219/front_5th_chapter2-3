import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../../shared/ui"
import { usePostsStore } from "../../model/postsStore.ts"
import { usePostDialogStore } from "../../model/postDialogStore.ts"
import { useUpdatePostMutation } from "../../api/queries.ts"

export const PostEditDialog: React.FC = () => {
  const selectedPost = usePostsStore((state) => state.selectedPost)
  const posts = usePostsStore((state) => state.posts)
  const { setSelectedPost, setPosts } = usePostsStore()

  const showPostEditDialog = usePostDialogStore((state) => state.showPostEditDialog)
  const { setShowPostEditDialog } = usePostDialogStore()

  const { mutate } = useUpdatePostMutation()

  if (!selectedPost) return null

  // 게시물 업데이트
  const updatePost = async () => {
    mutate(selectedPost, {
      onSuccess: (data) => {
        setPosts(posts.map((post) => (post.id === data.id ? data : post)))
        setShowPostEditDialog(false)
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <Dialog open={showPostEditDialog} onOpenChange={setShowPostEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
