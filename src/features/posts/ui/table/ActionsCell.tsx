import { Button, TableCell } from "../../../../shared/ui"
import React from "react"
import { Post } from "../../../../entities/posts/model/types.ts"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { usePostsStore } from "../../model/postsStore.ts"
import { usePostDialogStore } from "../../model/postDialogStore.ts"
import { useDeletePostMutation } from "../../api/queries.ts"
import { useCommentsStore } from "../../../comments/model/commentStore.ts"
import { useCommentsQuery } from "../../../comments/api/queries.ts"

interface ActionsCellProps {
  post: Post
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ post }) => {
  const posts = usePostsStore((state) => state.posts)
  const { setPosts, setSelectedPost } = usePostsStore()
  const { setShowPostEditDialog, setShowPostDetailDialog } = usePostDialogStore()
  const { comments, setComments } = useCommentsStore()
  const { mutate: deletePostMutation } = useDeletePostMutation()

  const postId = post.id

  const { isFetching, refetch } = useCommentsQuery(postId, {
    enabled: false,
  })

  const fetchComments = async () => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    const { data } = await refetch()
    if (!data?.comments) return
    setComments((prev) => ({ ...prev, [postId]: data?.comments }))
  }

  // 게시물 상세 보기
  const handleClickPostDetail = async () => {
    if (isFetching) return
    setSelectedPost(post)
    await fetchComments()
    setShowPostDetailDialog(true)
  }

  const deletePost = async (id: number) => {
    deletePostMutation(id, {
      onSuccess: () => {
        setPosts(posts.filter((post) => post.id !== id))
      },
    })
  }

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleClickPostDetail}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedPost(post)
            setShowPostEditDialog(true)
          }}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  )
}
