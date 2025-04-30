import { Button, TableCell, TableRow } from "../../../shared/ui"
import { Highlight } from "../../../shared/ui/Highlight.tsx"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import React from "react"
import { Post } from "../../../entities/posts/model/types.ts"
import { usePostsStore } from "../model/postsStore.ts"
import { usePostDialogStore } from "../model/postDialogStore.ts"
import { User } from "../../../entities/users/model/types.ts"
import { useQueryParams } from "../model/useQueryParams.ts"
import { useCommentsStore } from "../../comments/model/commentStore.ts"
import { useUsersStore } from "../../user/model/usersStore.ts"
import { useUserDialogStore } from "../../user/model/userDialogStore.ts"

interface PostsTableRowProps {
  post: Post
}

export const PostsTableRow: React.FC<PostsTableRowProps> = ({ post }) => {
  const { searchQuery, selectedTag, setSelectedTag, updateURL } = useQueryParams()
  const posts = usePostsStore((state) => state.posts)
  const { setPosts, setSelectedPost } = usePostsStore()

  const comments = useCommentsStore((state) => state.comments)
  const { setComments } = useCommentsStore()

  const { setShowPostEditDialog, setShowPostDetailDialog } = usePostDialogStore()

  const { setSelectedUser } = useUsersStore()
  const { setShowUserDialog } = useUserDialogStore()

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }
  // 사용자 모달 열기
  const openUserModal = async (user?: User) => {
    if (!user) return
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserDialog(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <Highlight text={post.title} highlight={searchQuery} />
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => {
                  setSelectedTag(tag)
                  updateURL()
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post?.author)}>
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
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
    </TableRow>
  )
}
