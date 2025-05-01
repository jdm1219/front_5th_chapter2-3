import React, { useEffect } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../../shared/ui"
import { usePostsStore } from "../../model/postsStore.ts"
import { usePostDialogStore } from "../../model/postDialogStore.ts"
import { useAddPostMutation } from "../../api/queries.ts"

export const PostAddDialog: React.FC = () => {
  const newPost = usePostsStore((state) => state.newPost)
  const posts = usePostsStore((state) => state.posts)
  const { setNewPost, setPosts } = usePostsStore()

  const showPostAddDialog = usePostDialogStore((state) => state.showPostAddDialog)
  const { setShowPostAddDialog } = usePostDialogStore()

  const { mutate } = useAddPostMutation()

  // 게시물 추가
  const addPost = async () => {
    mutate(newPost, {
      onSuccess: (data) => {
        setShowPostAddDialog(false)
        setPosts([data, ...posts])
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  useEffect(() => {
    if(showPostAddDialog) {
      setNewPost({ title: "", body: "", userId: 1 })
    }
  }, [showPostAddDialog])

  return (
    <Dialog open={showPostAddDialog} onOpenChange={setShowPostAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
